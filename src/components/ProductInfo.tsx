import { string } from 'yup';
import { NAIRA } from '../constants/unicode';
import ProductStars from './ProductStars';

interface Props {
  name: string;
  price: number;
}

const ProductInfo = ({ name, price }: Props) => {
  return (
    <div className='container pt-4 flex flex-col gap-[10px]'>
      <h3 className='font-medium'>{name}</h3>
      <span>
        {NAIRA} {price}
      </span>
      <ProductStars />
    </div>
  );
};

export default ProductInfo;
