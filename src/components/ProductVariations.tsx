import DefaultProductVariations from './DefaultProductVariations';
import CustomProductVariations from './CustomProductVariations';

const ProductVariations: React.FC<{
  variant: any;
  variations: any;
  setProductVariant: Function;
}> = ({ variant = {}, variations, setProductVariant = () => null }) => {
  const { colors, sizes, ...rest } = variations;
  return (
    <div className='grid grid-cols-2 gap-4 pt-[30px]'>
      <DefaultProductVariations
        color={variant.colors}
        colors={colors}
        size={variant.sizes}
        sizes={sizes}
        setProductVariant={setProductVariant}
      />
      <CustomProductVariations
        variant={variant}
        variations={rest}
        setProductVariant={setProductVariant}
      />
    </div>
  );
};

export default ProductVariations;
