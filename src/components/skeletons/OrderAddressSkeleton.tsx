import { IonSkeletonText } from '@ionic/react';

const OrderAddressSkeleton = () => {
  return (
    <div>
      <div className='mb-2'>
        <IonSkeletonText
          animated={true}
          className='block h-full w-2/3 ion-no-padding ion-no-margin rounded-md'
        ></IonSkeletonText>
      </div>
      <div className='mb-2'>
        <IonSkeletonText
          animated={true}
          className='block h-full w-1/2 ion-no-padding ion-no-margin rounded-md'
        ></IonSkeletonText>
      </div>
      <div className='mb-2'>
        <IonSkeletonText
          animated={true}
          className='block h-full w-1/3 ion-no-padding ion-no-margin rounded-md'
        ></IonSkeletonText>
      </div>
    </div>
  );
};

export default OrderAddressSkeleton;
