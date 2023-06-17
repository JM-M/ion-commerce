import { NAIRA } from '../constants/unicode';
import ProductStars from './ProductStars';

const ProductInfo = () => {
    return (
        <div className="container pt-4 flex flex-col gap-[10px]">
            <h3 className="font-medium">Boy's Shoe</h3>
            <span>{NAIRA} 6,000</span>
            <ProductStars />
        </div>
    );
};

export default ProductInfo;
