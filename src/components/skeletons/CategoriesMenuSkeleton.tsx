import { IonSkeletonText } from '@ionic/react';

const CategoriesMenuSkeleton = () => {
  return (
    <ul>
      {[...Array(3)].map((_, i) => {
        return (
          <li key={i} className='flex items-center h-10'>
            <div className='pl-5 mr-5 mb-1'>
              <IonSkeletonText
                animated={true}
                className='block w-[100px] ion-no-padding ion-no-margin rounded-md'
              ></IonSkeletonText>
            </div>
          </li>
        );
      })}
    </ul>
  );
};

export default CategoriesMenuSkeleton;
