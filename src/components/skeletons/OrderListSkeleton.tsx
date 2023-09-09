import { IonSkeletonText } from '@ionic/react';

const OrderListSkeleton = () => {
  return (
    <ul className='container'>
      {[...Array(6)].map((_, i) => {
        return (
          <li
            key={i}
            className='w-full h-[87px] mb-5 rounded-2xl overflow-hidden'
          >
            <IonSkeletonText
              animated={true}
              className='block h-full w-full ion-no-padding ion-no-margin'
            ></IonSkeletonText>
          </li>
        );
      })}
    </ul>
  );
};

export default OrderListSkeleton;
