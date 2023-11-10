import { Link } from 'react-router-dom';
import { IonImg } from '@ionic/react';
import { Highlight } from 'react-instantsearch';
import { NAIRA } from '../constants/unicode';
import useCategories from '../hooks/useCategories';

interface Props {
  hit: any;
  close?: Function;
}

const ProductSearchHit: React.FC<Props> = ({ hit, close = () => null }) => {
  const { getCategoryFromId } = useCategories();

  return (
    <Link
      to={`/store/products/${hit.objectID}`}
      className='block'
      onClick={() => close()}
    >
      <article className='flex gap-3 mb-5'>
        <div className='w-[80px] aspect-[5/6] rounded-md overflow-hidden'>
          <IonImg
            className='h-full w-full bg-gray-200 object-cover'
            src={hit.image}
            alt={hit.name}
          />
        </div>
        <div className='flex-[3] flex flex-col'>
          <Highlight attribute='name' hit={hit} />
          <p className='text-gray-700'>
            <span>{getCategoryFromId(hit.category).name}</span>
          </p>
          <p className='mt-auto text-lg'>
            {NAIRA}
            {hit.price}
          </p>
        </div>
        {!!hit.discount && (
          <div className='ml-auto'>
            <span className='inline-block py-1 px-3 bg-[var(--ion-color-primary)] text-white rounded-md'>
              {hit.discount}% off
            </span>
          </div>
        )}
      </article>
    </Link>
  );
};

export default ProductSearchHit;
