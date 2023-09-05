import ProductGrid from "./ProductGrid";
import useProducts from "../hooks/useProducts";

interface Props {
  category: string;
}

const ProductCategoryDisplay: React.FC<Props> = ({ category }) => {
  const { productsQuery } = useProducts({
    category: category === "/" ? "" : category,
  });

  return (
    <div className="p-5">
      <ProductGrid
        products={productsQuery.data}
        initialLoading={productsQuery.isLoading}
      />
    </div>
  );
};

export default ProductCategoryDisplay;
