import { IonSkeletonText } from '@ionic/react';

const OrderStatusSkeleton = () => {
  return (
    <ul className='flex flex-col gap-5 mt-2'>
      {[...Array(3)].map((_, i: number) => {
        return (
          <li key={i} className='flex items-center gap-5'>
            <span className='h-[30px] w-[30px] flex items-center justify-center rounded-lg'>
              <IonSkeletonText
                animated={true}
                className='block h-full w-full ion-no-padding ion-no-margin rounded-md'
              ></IonSkeletonText>
            </span>
            <div className='flex-1 flex flex-col gap-3'>
              <span>
                <IonSkeletonText
                  animated={true}
                  className='block h-full w-1/3 ion-no-padding ion-no-margin rounded-md'
                ></IonSkeletonText>
              </span>
              <span className='block text-[var(--ion-color-medium)]'>
                <IonSkeletonText
                  animated={true}
                  className='block h-full w-1/3 ion-no-padding ion-no-margin rounded-md'
                ></IonSkeletonText>
              </span>
            </div>
          </li>
        );
      })}
    </ul>
  );
};

export default OrderStatusSkeleton;
