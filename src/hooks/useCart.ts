import { useState, useEffect, useContext } from 'react';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { doc, getDoc } from 'firebase/firestore';
import useFirestoreDocumentMutation from './useFirestoreDocumentMutation';
import useFirestoreDocumentQuery from './useFirestoreDocumentQuery';
import { db } from '../../firebase';
import CartProduct from '../components/CartProduct';
import { Product } from '../constants/schemas/product';
import { Checkout } from '../constants/schemas/checkout';
import useAuth from './useAuth';
import useAuthModal from './useAuthModal';
import CartProductsContext from '../contexts/cartProducts';

export interface CartProduct {
  id: string;
  qty: number;
  variant: any;
}

export interface CartProductSearchOptions {
  id: string;
  variant: any;
}

export type ProductWithCartOptions = Product & {
  id: string;
  qty: number;
  variant: any;
  variantStock?: any;
  error?: boolean | string;
};

export interface Cart {
  uid: string;
  products: ProductWithCartOptions[];
  checkout?: Checkout;
}

const collectionName = 'carts';

const useCart = () => {
  // const [_cartProducts, _setCartProducts] = useState<ProductWithCartOptions[]>(
  //   []
  // );
  const { cartProducts, setCartProducts } = useContext(CartProductsContext);
  const queryClient = useQueryClient();

  const { uid = '', isLoggedIn } = useAuth();
  const { openAuthModal } = useAuthModal();

  const cartQuery = useFirestoreDocumentQuery({
    collectionName,
    documentId: uid,
  });
  const { data: cart = { products: [] } } = cartQuery;

  const sortedCartProducts =
    cart?.products?.sort((a: CartProduct, b: CartProduct) => {
      if (a.id > b.id) return 1;
      if (a.id < b.id) return -1;
      return 0;
    }) || [];

  const variantsMatch = (variant1: any, variant2: any) => {
    if (!variant1 || !variant2) return false;
    const variants1Length = Object.keys(variant1).length;
    const variants2Length = Object.keys(variant2).length;
    if (variants1Length !== variants2Length) return false;
    let match = true;
    for (const key in variant1) {
      if (Object.prototype.hasOwnProperty.call(variant1, key)) {
        if (variant1[key] !== variant2[key]) {
          match = false;
          break;
        }
      }
    }
    return match;
  };

  const getVariantStock = ({
    product,
    variant,
  }: {
    product: Product;
    variant: any;
  }) => {
    if (!product.stocks) return undefined;
    return product.stocks.find((stock) =>
      variantsMatch(variant, stock.variationCombination)
    );
  };

  const cartProductsQuery = useQuery({
    queryKey: ['cart-products', sortedCartProducts],
    queryFn: async ({ queryKey = {} }: any) => {
      const [_key, cartProducts] = queryKey;
      const products: ProductWithCartOptions[] = [];
      for (let index = 0; index < cartProducts.length; index++) {
        const { id: productId, ...rest } = cartProducts[index];
        const docRef = doc(db, 'products', productId);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          const doc = docSnap.data() as Product;
          let variantStock = getVariantStock({
            product: doc,
            variant: rest.variant,
          });
          let error: string | boolean = false;
          const quantityAvailable = variantStock?.quantity;
          const quantityInCart = rest.qty;
          if (!variantStock) {
            error = 'This variant is no longer available';
          } else if (quantityAvailable === 0) {
            error = 'Unfortunately, this variant is out of stock';
          } else if (quantityAvailable! < quantityInCart) {
            error = `Only ${quantityAvailable} available`;
          }
          products.push({
            ...doc,
            id: productId,
            variantStock,
            error,
            ...rest,
          });
        }
      }
      return products;
    },
    staleTime: 1000 * 60, // update cart every minute
  });
  const fetchedCartProducts: ProductWithCartOptions[] =
    cartProductsQuery.data || [];

  useEffect(() => {
    if (!fetchedCartProducts?.length) return;
    setCartProducts(fetchedCartProducts);
  }, [fetchedCartProducts]);

  const onCartChange = (cart: Cart) => {
    queryClient.setQueriesData(
      ['document', { collectionName, documentId: uid }],
      cart
    );
    if (!cart.products?.length) return;
    setCartProducts(
      cart.products.map((product) => {
        const fullProduct = cartProducts.find((p) => p.id === product.id);
        return { ...fullProduct, ...product };
      })
    );
  };

  const { firestoreDocumentMutation: addProductMutation } =
    useFirestoreDocumentMutation({
      collectionName,
      onSuccess: onCartChange,
      invalidateCollectionQuery: false,
      invalidateDocumentQuery: false,
    });

  const { firestoreDocumentMutation: removeProductMutation } =
    useFirestoreDocumentMutation({
      collectionName,
      onSuccess: onCartChange,
      invalidateCollectionQuery: false,
    });

  const { firestoreDocumentMutation: clearCartMutation } =
    useFirestoreDocumentMutation({
      collectionName,
      onSuccess: () => {
        queryClient.setQueryData(['cart-products', sortedCartProducts], []);
      },
      invalidateCollectionQuery: true,
    });

  const clearCart = async () => {
    clearCartMutation.mutateAsync({
      document: { uid, products: [], checkout: {} },
      documentId: uid,
    });
  };

  const findProductInCart = ({
    id: productId,
    variant,
  }: CartProductSearchOptions) => {
    if (!cartQuery?.data?.products?.length) return false;
    return cartQuery?.data?.products?.find((product: CartProduct) => {
      if (product.id === productId) {
        // check if variants match
        const match = variantsMatch(product.variant, variant);
        return match;
      }
    });
  };

  const findCartProductQty = (options: CartProductSearchOptions) => {
    const cartProduct = findProductInCart(options);
    if (!cartProduct) return null;
    return cartProduct.qty;
  };

  const canEditCart = () => {
    const cartNotCreated =
      (cartQuery.failureReason as any)?.message === 'Document does not exist!';
    const editingCart =
      addProductMutation.isLoading || removeProductMutation.isLoading;
    if ((cartQuery.isLoading && !cartNotCreated) || editingCart) {
      return false;
    }
    return true;
  };

  const addProductToCart = (options: CartProductSearchOptions) => {
    const { id: productId } = options;
    if (!canEditCart() || !productId) return;
    if (!isLoggedIn) openAuthModal('login');

    const isInCart = !!findProductInCart(options);

    const updatedCartProducts = isInCart
      ? cart.products.map((product: CartProduct) => {
          if (
            product.id === productId &&
            variantsMatch(product.variant, options.variant)
          )
            return { ...product, qty: product.qty + 1 };
          return product;
        })
      : [...(cart?.products || []), { ...options, qty: 1 }];

    const newCart: Cart = {
      ...cart,
      products: updatedCartProducts,
      uid,
    };

    addProductMutation.mutate({ document: newCart, documentId: uid });
  };

  const removeProductFromCart = (options: CartProductSearchOptions) => {
    const { id: productId } = options;
    if (!canEditCart() || !productId) return;
    if (!isLoggedIn) openAuthModal('login');

    const cartProduct = findProductInCart(options);
    if (!cartProduct) return;

    const updatedCartProducts =
      cartProduct.qty > 1
        ? cart.products.map((product: CartProduct) => {
            if (
              product.id === productId &&
              variantsMatch(product.variant, options.variant)
            )
              return { ...product, qty: product.qty - 1 };
            return product;
          })
        : cart.products.filter(
            ({ id, variant }: any) =>
              id !== productId || !variantsMatch(variant, options.variant)
          );

    const newCart: Cart = {
      ...cart,
      products: updatedCartProducts,
      uid,
    };

    removeProductMutation.mutate({ document: newCart, documentId: uid });
  };

  const measureCart = (cartProducts: ProductWithCartOptions[]) => {
    return cartProducts?.length
      ? cartProducts.reduce(
          (
            prev: {
              cartSize: number;
              totalCartValue: number;
              hasError: boolean;
            },
            curr: ProductWithCartOptions
          ) => {
            const { qty, discount = 0, error } = curr;
            const discountedPrice = curr.price * ((discount || 0) / 100);
            const price = curr.price - discountedPrice;
            return {
              cartSize: curr.qty + prev.cartSize,
              totalCartValue: qty * price + prev.totalCartValue,
              hasError: !prev.hasError ? !!error : prev.hasError,
            };
          },
          { cartSize: 0, totalCartValue: 0, hasError: false }
        )
      : { cartSize: 0, totalCartValue: 0, hasError: false };
  };

  const { cartSize, totalCartValue, hasError } = measureCart(cartProducts);

  const adding = addProductMutation.isLoading;
  const removing = removeProductMutation.isLoading;
  const editingCart = adding || removing;

  return {
    rawCartValue: cart,
    cart: { ...cart, products: cartProducts as ProductWithCartOptions[] },
    cartProductsQuery,
    cartSize,
    cartHasError: hasError,
    totalCartValue,
    cartQuery,
    addProductMutation: {
      ...addProductMutation,
      isLoading: addProductMutation.isLoading || cartProductsQuery.isLoading,
    },
    adding,
    addProductToCart,
    removeProductMutation: {
      ...removeProductMutation,
      isLoading: removeProductMutation.isLoading || cartProductsQuery.isLoading,
    },
    removing,
    editingCart,
    getVariantStock,
    removeProductFromCart,
    findProductInCart,
    findCartProductQty,
    onCartChange,
    measureCart,
    clearCart,
    clearCartMutation,
  };
};

export default useCart;
