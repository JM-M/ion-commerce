import { useState } from 'react';
import OrderSummary from '../components/OrderSummary';
import CheckoutSteps from '../components/CheckoutSteps';
import CheckoutForm from '../components/CheckoutForm';
import { IonContent } from '@ionic/react';
import CHECKOUT_STEPS from '../constants/checkoutSteps';
import { CheckoutStep } from '../hooks/useCheckout';

const Checkout: React.FC = () => {
  const [step, setStep] = useState<CheckoutStep>(CHECKOUT_STEPS[0]);
  return (
    <IonContent className='flex flex-col min-h-full'>
      <OrderSummary />
      <div className='flex flex-col mt-auto py-14'>
        <CheckoutSteps steps={CHECKOUT_STEPS} step={step} setStep={setStep} />
        <CheckoutForm step={step} setStep={setStep} />
      </div>
    </IonContent>
  );
};

export default Checkout;
