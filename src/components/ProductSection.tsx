import { Link } from "react-router-dom";
import ProductGrid from "./ProductGrid";
import Button from "./Button";
import useProducts from "../hooks/useProducts";
import PageLoader from "./PageLoader";

interface Props {
  title?: string;
  fullPageHref?: string;
  productIds: string[];
  category?: string;
}

const ProductSection = ({
  title = "",
  fullPageHref = "",
  productIds = [],
  category,
}: Props) => {
  const { productsQuery } = useProducts({ productIds, category });
  const {
    data: products = [],
    isLoading,
    fetchNextPage,
    hasNextPage,
  } = productsQuery;

  if (isLoading)
    return (
      <div className="flex min-h-[400px]">
        <PageLoader />
      </div>
    );

  return (
    <div className="container py-[30px]">
      {(title || fullPageHref) && (
        <div className="flex justify-between items-start pb-5">
          <h2 className="text-xl font-medium text-gray-500">{title}</h2>
          {fullPageHref && (
            <Link to="/store/category/category-1" className="text-blue-500">
              See all
            </Link>
          )}
        </div>
      )}
      <ProductGrid products={products} />
      {hasNextPage && (
        <Button
          color="secondary"
          className="block !h-30 w-fit mx-auto mt-[30px] font-medium rounded-[8px]"
          onClick={fetchNextPage}
          loading={isLoading}
        >
          Load more
        </Button>
      )}
    </div>
  );
};

export default ProductSection;
