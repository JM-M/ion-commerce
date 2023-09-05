import { Link } from "react-router-dom";
import ProductGrid from "./ProductGrid";
import Button from "./Button";
import { DatabaseProductSection } from "../hooks/useProductSections";
import useProductSection from "../hooks/useProductSection";

interface Props {
  section: DatabaseProductSection;
  noHeader?: boolean;
}

const ProductSection = ({ section, noHeader = false }: Props) => {
  const { title, id } = section;
  const fullPageHref = `/store/sections/${id}`;
  const { productsQuery } = useProductSection(section);
  const {
    hasNextPage,
    fetchNextPage,
    isLoading,
    isFetching,
    data: products,
  } = productsQuery;

  return (
    <div className="container py-[30px]">
      {(title || fullPageHref) && !noHeader && (
        <div className="flex justify-between items-start pb-5">
          <h2 className="text-xl font-medium text-gray-500">{title}</h2>
          {fullPageHref && (
            <Link to={fullPageHref} className="text-blue-500">
              See all
            </Link>
          )}
        </div>
      )}
      <ProductGrid
        products={products}
        initialLoading={isLoading}
        loadingMore={isFetching}
        hasMore={hasNextPage}
        onLoadMore={fetchNextPage}
      />
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
