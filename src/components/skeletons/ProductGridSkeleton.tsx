import { IonLabel, IonSkeletonText } from '@ionic/react';

const ProductGridSkeleton = () => {
  return (
    <ul className='grid grid-cols-2 gap-5'>
      {[...Array(4)].map((_, i) => (
        <li key={i}>
          <div className='relative w-full aspect-[5/6] mb-[10px] bg-gray-100 rounded-lg overflow-hidden'>
            <IonSkeletonText
              animated={true}
              className='block h-full w-full ion-no-padding ion-no-margin rounded-md'
            ></IonSkeletonText>
          </div>
          <IonLabel>
            <div className='flex justify-between'>
              <IonSkeletonText
                animated={true}
                className='w-1/2 rounded-md'
              ></IonSkeletonText>
              <IonSkeletonText
                animated={true}
                className='w-1/4 rounded-md'
              ></IonSkeletonText>
            </div>
            <p>
              <IonSkeletonText
                animated={true}
                className='w-1/3 rounded-md'
              ></IonSkeletonText>
            </p>
          </IonLabel>
        </li>
      ))}
    </ul>
  );
};

export default ProductGridSkeleton;
