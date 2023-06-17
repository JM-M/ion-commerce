import ProductCard from './ProductCard';

const ProductGrid = ({ numProducts = 4 }) => {
    return (
        <ul className="grid grid-cols-2 gap-5">
            {[...Array(numProducts)].map((_, i) => (
                <ProductCard key={i} />
            ))}
        </ul>
    );
};

export default ProductGrid;
