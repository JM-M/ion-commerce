import { useState } from 'react';
import { Link } from 'react-router-dom';
import { IonContent, useIonRouter } from '@ionic/react';
import OrderSummary from '../components/OrderSummary';
import CheckoutSteps from '../components/CheckoutSteps';
import CheckoutForm from '../components/CheckoutForm';
import CHECKOUT_STEPS from '../constants/checkoutSteps';
import { CheckoutStep } from '../hooks/useCheckout';
import useCart from '../hooks/useCart';
import Button from '../components/Button';
import PageHeader from '../components/PageHeader';

const Checkout: React.FC = () => {
  const [step, setStep] = useState<CheckoutStep>(CHECKOUT_STEPS[0]);
  const ionRouter = useIonRouter();
  const { push } = ionRouter;
  const { cartSize } = useCart();

  return (
    <IonContent className='flex flex-col min-h-full'>
      <PageHeader />
      {!!cartSize ? (
        <>
          <div className='flex flex-col min-h-full'>
            <div>
              <OrderSummary />
            </div>
            <div className='container flex-1 flex flex-col py-14'>
              <CheckoutSteps
                steps={CHECKOUT_STEPS}
                step={step}
                setStep={setStep}
              />
              <CheckoutForm step={step} setStep={setStep} />
            </div>
          </div>
        </>
      ) : (
        <div className='h-full flex flex-col gap-5 justify-center items-center'>
          <div>Cart is empty</div>
          <Link to='/store'>
            <Button color='primary'>Continue browsing</Button>
          </Link>
        </div>
      )}
    </IonContent>
  );
};

export default Checkout;
