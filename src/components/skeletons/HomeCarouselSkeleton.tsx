import { IonSkeletonText } from '@ionic/react';

const HomeCarouselSkeleton = () => {
  return (
    <div className='container pt-4'>
      <div className='w-full h-[400px] md:h-[500px] pt-4 rounded-2xl overflow-hidden'>
        <IonSkeletonText
          animated={true}
          className='block h-full w-full ion-no-padding ion-no-margin'
        ></IonSkeletonText>
      </div>
      <div className='flex justify-between my-3'>
        <IonSkeletonText
          animated={true}
          className='block w-1/3 ion-no-padding ion-no-margin rounded-md'
        ></IonSkeletonText>
        <IonSkeletonText
          animated={true}
          className='block w-1/6 ion-no-padding ion-no-margin rounded-md'
        ></IonSkeletonText>
      </div>
    </div>
  );
};

export default HomeCarouselSkeleton;
