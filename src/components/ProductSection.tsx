import { Link } from 'react-router-dom';
import { IonButton } from '@ionic/react';
import ProductGrid from './ProductGrid';

const ProductSection = ({ title = '', fullPageHref = '', numProducts = 4 }) => {
  return (
    <div className='container py-[30px]'>
      {(title || fullPageHref) && (
        <div className='flex justify-between items-start pb-5'>
          <h2 className='text-xl font-medium text-gray-500'>{title}</h2>
          {fullPageHref && (
            <Link to='/store/category/category-1' className='text-blue-500'>
              See all
            </Link>
          )}
        </div>
      )}
      <ProductGrid numProducts={numProducts} />
      <IonButton
        color='secondary'
        className='block !h-30 w-fit mx-auto mt-[30px] font-medium rounded-[8px]'
      >
        Load more
      </IonButton>
    </div>
  );
};

export default ProductSection;
