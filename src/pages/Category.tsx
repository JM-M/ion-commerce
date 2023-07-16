import { IonContent, IonButton } from '@ionic/react';
import SubCategorySelector from '../components/SubCategorySelector';
import QueryController from '../components/QueryController';
import ProductSection from '../components/ProductSection';

const Category = () => {
  return (
    <>
      <div className='w-screen overflow-x-auto'>
        <ul className='container py-1 flex gap-[15px]'>
          <IonButton
            // routerLink={`${url}`}
            color='primary'
            className='!h-[30px] font-medium'
          >
            Kids
          </IonButton>
          <IonButton
            // routerLink={`${url}`}
            color='secondary'
            className='!h-[30px] font-medium'
          >
            Adults
          </IonButton>
          <IonButton
            // routerLink={`${url}`}
            color='secondary'
            className='!h-[30px] font-medium'
          >
            Kitchenware
          </IonButton>
        </ul>
      </div>
      <div className='container flex justify-between items-center py-3'>
        <SubCategorySelector />
        <QueryController />
      </div>
      <IonContent>{/* <ProductSection numProducts={8} /> */}</IonContent>
    </>
  );
};

export default Category;
