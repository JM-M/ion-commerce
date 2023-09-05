import { IonButton, IonSpinner } from "@ionic/react";
import ProductCard from "./ProductCard";
import PageLoader from "./PageLoader";
import { SortOption } from "../hooks/useProducts";
import { Product } from "../constants/schemas/product";

interface Props {
  products?: Product[];
  initialLoading?: boolean;
  onLoadMore?: Function;
  loadingMore?: boolean;
  hasMore?: boolean;
}

const ProductGrid = ({
  products = [],
  initialLoading = false,
  onLoadMore = () => null,
  loadingMore = false,
  hasMore = false,
}: Props) => {
  if (initialLoading)
    return (
      <div className="flex justify-center items-center min-h-[240px]">
        <PageLoader />
      </div>
    );

  return (
    <>
      <ul className="grid grid-cols-2 gap-5">
        {products.map((product: Product, i: number) => {
          return (
            <li key={i}>
              <ProductCard product={product} />
            </li>
          );
        })}
      </ul>
      {hasMore && (
        <IonButton
          color="secondary"
          className="block w-fit mx-auto my-5"
          onClick={() => onLoadMore()}
        >
          {loadingMore ? (
            <>
              <IonSpinner name="dots" className="inline-block" /> Loading...
            </>
          ) : (
            "Load more"
          )}
        </IonButton>
      )}
    </>
  );
};

export default ProductGrid;
