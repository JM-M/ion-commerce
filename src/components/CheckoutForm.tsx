import {
  IonItem,
  IonLabel,
  IonInput,
  IonButton,
  IonList,
  IonSelect,
  IonSelectOption,
} from '@ionic/react';

import DeliveryOptions from './DeliveryOptions';

import { NAIRA } from '../constants/unicode';

const CheckoutForm: React.FC<{ step: string }> = ({ step }) => {
  let formContent;
  if (step === 'contact')
    formContent = (
      <>
        <IonItem>
          <IonLabel position='floating'>First name</IonLabel>
          <IonInput aria-label='First name' />
        </IonItem>
        <IonItem>
          <IonLabel position='floating'>Last name</IonLabel>
          <IonInput aria-label='Last name' />
        </IonItem>
        <IonItem>
          <IonLabel position='floating'>Phone number</IonLabel>
          <IonInput label='+234' type='number' className='h-[65px]' />
        </IonItem>
        <IonButton
          id='checkoutFormButton'
          className='h-[50px] mt-[30px]'
          type='submit'
          expand='block'
        >
          Continue
        </IonButton>
      </>
    );

  if (step === 'address')
    formContent = (
      <>
        <IonList>
          <IonItem>
            <IonSelect aria-label='fruit' placeholder='State'>
              <IonSelectOption value='apples'>Apples</IonSelectOption>
              <IonSelectOption value='oranges'>Oranges</IonSelectOption>
              <IonSelectOption value='bananas'>Bananas</IonSelectOption>
            </IonSelect>
          </IonItem>
        </IonList>
        <IonList>
          <IonItem>
            <IonSelect aria-label='fruit' placeholder='City'>
              <IonSelectOption value='apples'>Apples</IonSelectOption>
              <IonSelectOption value='oranges'>Oranges</IonSelectOption>
              <IonSelectOption value='bananas'>Bananas</IonSelectOption>
            </IonSelect>
          </IonItem>
        </IonList>
        <IonItem>
          <IonLabel position='floating'>Address Line 1</IonLabel>
          <IonInput aria-label='Address Line 1' />
        </IonItem>
        <IonItem>
          <IonLabel position='floating'>Address Line 2</IonLabel>
          <IonInput aria-label='Address Line 2' />
        </IonItem>
        <IonItem>
          <IonLabel position='floating'>Nearest Landmark (optional)</IonLabel>
          <IonInput aria-label='Nearest Landmark (optional)' />
        </IonItem>
        <IonButton
          id='checkoutFormButton'
          className='h-[50px] mt-[30px]'
          type='submit'
          expand='block'
        >
          Continue
        </IonButton>
      </>
    );

  if (step === 'delivery')
    formContent = (
      <>
        <DeliveryOptions />
        <IonButton
          id='checkoutFormButton'
          className='h-[50px] mt-[30px]'
          type='submit'
          expand='block'
        >
          Pay with Paystack{'\u2800'}
          <span className='font-medium'>({NAIRA} 13,500)</span>
        </IonButton>
      </>
    );

  return (
    <form className='container pb-12' onSubmit={(e) => e.preventDefault()}>
      {formContent}
    </form>
  );
};

export default CheckoutForm;
