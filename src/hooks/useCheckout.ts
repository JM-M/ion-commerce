import useAuth from './useAuth';
import useAuthModal from './useAuthModal';
import useCart, { Cart } from './useCart';
import useFirestoreDocumentMutation from './useFirestoreDocumentMutation';
import {
  CheckoutAddress,
  CheckoutContact,
  CheckoutDelivery,
} from '../constants/schemas/checkout';
import CHECKOUT_STEPS from '../constants/checkoutSteps';

export type CheckoutStep = 'contact' | 'address' | 'delivery';

interface Props {
  step: CheckoutStep;
  setStep: Function;
}

const useCheckout = ({ step = 'contact', setStep = () => null }: Props) => {
  const { uid, isLoggedIn } = useAuth();
  const { openAuthModal } = useAuthModal();
  const { rawCartValue, onCartChange } = useCart();

  const goToNextCheckoutStep = () => {
    // if this isnt the last step, goes to the next checkout step
    // else does nothing
    const currentStep = CHECKOUT_STEPS.indexOf(step);
    const isLastStep = currentStep === CHECKOUT_STEPS.length - 1;
    if (isLastStep) return;
    const nextCheckoutStep = CHECKOUT_STEPS[currentStep + 1];
    setStep(nextCheckoutStep);
  };

  const onSubmissionSuccess = (cart: Cart) => {
    onCartChange(cart);
    goToNextCheckoutStep();
  };

  const { firestoreDocumentMutation: checkoutSubmissionMutation } =
    useFirestoreDocumentMutation({
      collectionName: 'carts',
      onSuccess: onSubmissionSuccess,
      invalidateCollectionQuery: false,
      invalidateDocumentQuery: false,
    });

  const submitCheckoutStep = (step: any) => {
    if (!isLoggedIn) openAuthModal('login');
    const newCart = {
      ...rawCartValue,
      checkout: { ...(rawCartValue?.checkout || {}), ...step },
    };
    checkoutSubmissionMutation.mutate({
      document: newCart,
      documentId: uid,
    });
  };

  const submitCheckoutContact = (contact: CheckoutContact) => {
    submitCheckoutStep({ contact });
  };

  const submitCheckoutAddress = (address: CheckoutAddress) => {
    submitCheckoutStep({ address });
  };

  const submitting = checkoutSubmissionMutation.isLoading;

  return {
    submitCheckoutContact,
    submitCheckoutAddress,
    checkoutSubmissionMutation,
    submitting,
    // submitCheckoutAddress,
    // submitCheckoutDelivery,
  };
};

export default useCheckout;
