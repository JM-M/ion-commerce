import { IonSkeletonText } from '@ionic/react';
import ProductGridSkeleton from './ProductGridSkeleton';

const HomeProductSectionSkeleton = () => {
  return (
    <>
      {[...Array(4)].map((_, i) => {
        return (
          <div key={i} className='container py-[30px]'>
            <div className='flex justify-between items-start pb-5'>
              <IonSkeletonText
                animated={true}
                className='w-1/3 rounded-md'
              ></IonSkeletonText>
              <IonSkeletonText
                animated={true}
                className='w-1/6 rounded-md'
              ></IonSkeletonText>
            </div>
            <ProductGridSkeleton />
          </div>
        );
      })}
    </>
  );
};

export default HomeProductSectionSkeleton;
