import { useState } from 'react';
import { IonContent } from '@ionic/react';
import OrderSummary from '../components/OrderSummary';
import CheckoutSteps from '../components/CheckoutSteps';
import CheckoutForm from '../components/CheckoutForm';

const STEPS = ['contact', 'address', 'delivery'];

const Checkout: React.FC = () => {
  const [step, setStep] = useState(STEPS[0]);
  return (
    <IonContent className='py-[50px]'>
      <OrderSummary numItems={8} />
      <CheckoutSteps steps={STEPS} step={step} setStep={setStep} />
      <CheckoutForm step={step} />
    </IonContent>
  );
};

export default Checkout;
