import DefaultProductVariants from './DefaultProductVariants';
import CustomProductVariants from './CustomProductVariants';

const ProductVariants = () => {
    return (
        <div className="container pt-[30px]">
            <DefaultProductVariants />
            <CustomProductVariants />
        </div>
    );
};

export default ProductVariants;
