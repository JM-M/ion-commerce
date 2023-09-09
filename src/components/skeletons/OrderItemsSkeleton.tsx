import { IonThumbnail, IonSkeletonText, IonLabel } from '@ionic/react';

const OrderItemsSkeleton = () => {
  return (
    <div className='flex items-stretch gap-4 mb-5'>
      <div className='h-[75px] w-[72px] rounded-xl overflow-hidden'>
        <IonSkeletonText
          animated={true}
          className='block h-full w-full ion-no-padding ion-no-margin'
        ></IonSkeletonText>
      </div>
      <div className='flex-1 flex flex-col justify-between w-full'>
        <h4 className='w-full '>
          <IonSkeletonText
            animated={true}
            className='block h-full w-1/2 ion-no-padding ion-no-margin rounded-md'
          ></IonSkeletonText>
        </h4>
        <div className='flex gap-[10px]'>
          <IonSkeletonText
            animated={true}
            className='block h-full w-1/2 ion-no-padding ion-no-margin rounded-md'
          ></IonSkeletonText>
        </div>
        <span>
          <IonSkeletonText
            animated={true}
            className='block h-full w-2/3 ion-no-padding ion-no-margin rounded-md'
          ></IonSkeletonText>
        </span>
      </div>
      <div className='flex-[0.5] flex flex-col justify-between ml-auto'>
        <span className=' text-right'>
          <IonSkeletonText
            animated={true}
            className='block h-full w-full ion-no-padding ion-no-margin'
          ></IonSkeletonText>
        </span>
      </div>
    </div>
  );
  return (
    <div>
      <IonThumbnail slot='start'>
        <IonSkeletonText animated={true}></IonSkeletonText>
      </IonThumbnail>
      <IonLabel>
        <h3>
          <IonSkeletonText
            animated={true}
            style={{ width: '80%' }}
          ></IonSkeletonText>
        </h3>
        <p>
          <IonSkeletonText
            animated={true}
            style={{ width: '60%' }}
          ></IonSkeletonText>
        </p>
        <p>
          <IonSkeletonText
            animated={true}
            style={{ width: '30%' }}
          ></IonSkeletonText>
        </p>
      </IonLabel>
    </div>
  );
};

export default OrderItemsSkeleton;
