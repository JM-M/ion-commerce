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

export interface CartProduct {
  id: string;
  qty: number;
}

export interface Cart {
  uid: string;
  products: CartProduct[];
  checkout?: Checkout;
}

export type ProductWithId = Product & { id: string; qty: number };

const useCart = () => {
  const queryClient = useQueryClient();

  const { uid, isLoggedIn } = useAuth();
  const { openAuthModal } = useAuthModal();

  const cartQuery = useFirestoreDocumentQuery({
    collectionName: 'carts',
    documentId: uid,
  });
  const { data: cart = { products: [] } } = cartQuery;

  const sortedCartProducts =
    cart?.products?.sort((a: CartProduct, b: CartProduct) => {
      if (a.id > b.id) return 1;
      if (a.id < b.id) return -1;
      return 0;
    }) || [];

  const cartProductsQuery = useQuery({
    queryKey: ['cart-products', sortedCartProducts],
    queryFn: async ({ queryKey = {} }: any) => {
      const [_key, cartProducts] = queryKey;
      const products: ProductWithId[] = [];
      for (let index = 0; index < cartProducts.length; index++) {
        const { id: productId, qty } = cartProducts[index];
        const docRef = doc(db, 'products', productId);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          const doc = docSnap.data() as Product;
          products.push({ ...doc, id: productId, qty });
        }
      }
      return products;
    },
    staleTime: Infinity,
  });
  const cartProducts: ProductWithId[] = cartProductsQuery.data || [];

  const onCartChange = (cart: Cart) => {
    queryClient.setQueriesData(
      ['document', { collectionName: 'carts', documentId: uid }],
      cart
    );
  };

  const { firestoreDocumentMutation: addProductMutation } =
    useFirestoreDocumentMutation({
      collectionName: 'carts',
      onSuccess: onCartChange,
      invalidateCollectionQuery: false,
      invalidateDocumentQuery: false,
    });

  const { firestoreDocumentMutation: removeProductMutation } =
    useFirestoreDocumentMutation({
      collectionName: 'carts',
      onSuccess: onCartChange,
      invalidateCollectionQuery: false,
    });

  const findProductInCart = (productId: string) => {
    if (!cartQuery?.data?.products?.length) return false;
    return cartQuery?.data?.products?.find(
      (product: CartProduct) => product.id === productId
    );
  };

  const findProductQty = (productId: string) => {
    const cartProduct = cartQuery?.data?.products?.find(
      ({ id }: CartProduct) => id === productId
    );
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

  const addProductToCart = (productId: string) => {
    if (!canEditCart() || !productId) return;
    if (!isLoggedIn) openAuthModal('login');

    const isInCart = !!findProductInCart(productId);

    const updatedCartProducts = isInCart
      ? cart.products.map((product: CartProduct) => {
          if (product.id === productId)
            return { ...product, qty: product.qty + 1 };
          return product;
        })
      : [...(cart?.products || []), { id: productId, qty: 1 }];

    const newCart: Cart = {
      ...cart,
      products: updatedCartProducts,
      uid,
    };

    addProductMutation.mutate({ document: newCart, documentId: uid });
  };

  const removeProductFromCart = (productId: string) => {
    if (!canEditCart() || !productId) return;
    if (!isLoggedIn) openAuthModal('login');

    const cartProduct = findProductInCart(productId);
    if (!cartProduct) return;

    const updatedCartProducts =
      cartProduct.qty > 1
        ? cart.products.map((product: CartProduct) => {
            if (product.id === productId)
              return { ...product, qty: product.qty - 1 };
            return product;
          })
        : cart.products.filter(({ id }: any) => id !== productId);

    const newCart: Cart = {
      ...cart,
      products: updatedCartProducts,
      uid,
    };

    removeProductMutation.mutate({ document: newCart, documentId: uid });
  };

  const { cartSize, totalCartValue } = cartProducts?.length
    ? cartProducts.reduce(
        (
          prev: { cartSize: number; totalCartValue: number },
          curr: ProductWithId
        ) => ({
          cartSize: curr.qty + prev.cartSize,
          totalCartValue: curr.qty * curr.price + prev.totalCartValue,
        }),
        { cartSize: 0, totalCartValue: 0 }
      )
    : { cartSize: 0, totalCartValue: 0 };

  const adding = addProductMutation.isLoading;
  const removing = removeProductMutation.isLoading;
  const editingCart = adding || removing;

  return {
    rawCartValue: cart,
    cart: { ...cart, products: cartProducts },
    cartProductsQuery,
    cartSize,
    totalCartValue,
    cartQuery,
    addProductMutation,
    adding,
    addProductToCart,
    removeProductMutation,
    removing,
    editingCart,
    removeProductFromCart,
    findProductInCart,
    findProductQty,
    onCartChange,
  };
};

export default useCart;
