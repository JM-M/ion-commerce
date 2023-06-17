import { IonButton, IonIcon } from '@ionic/react';
import { addOutline } from 'ionicons/icons';

const AddToCartButton = () => {
  return (
    <div className='container pt-10'>
      <IonButton className='flex items-center justify-center gap-[10px] h-[50px] w-full text-white font-medium rounded-[8px]'>
        <IonIcon icon={addOutline} slot='start' className='h-[24px] w-[24px]' />
        Add to Cart
      </IonButton>
    </div>
  );
};

export default AddToCartButton;
