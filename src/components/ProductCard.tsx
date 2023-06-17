import { Link } from 'react-router-dom';
import { add } from 'ionicons/icons';
import { NAIRA } from '../constants/unicode';
import { IonIcon } from '@ionic/react';

const ProductCard = () => {
  return (
    <div>
      <Link to='/store/products/1' className='block'>
        <div className='w-full aspect-[5/6] mb-[10px] bg-gray-100 rounded-lg'></div>
      </Link>
      <div className='flex justify-between'>
        <div className='flex flex-col'>
          <span className='block font-medium'>Boy's shoes</span>
          <span className='text-xs text-gray-500'>Adidas</span>
        </div>
        <span className='text-base'>{NAIRA} 6,000</span>
      </div>
      <span className='flex items-center justify-center h-[30px] w-[30px] ml-auto !px-0 rounded-[8px] bg-blue-500'>
        <IonIcon icon={add} className='text-white h-[20px] w-[20px]' />
      </span>
    </div>
  );
};

export default ProductCard;
