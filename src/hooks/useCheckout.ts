import useAuth from './useAuth';
import useAuthModal from './useAuthModal';
import useCart, { Cart } from './useCart';
import useFirestoreDocumentMutation from './useFirestoreDocumentMutation';
import {
  CheckoutAddress,
  CheckoutContact,
} from '../constants/schemas/checkout';
import CHECKOUT_STEPS from '../constants/checkoutSteps';
import useUserAddress from './useUserAddress';
import useTerminal from './useTerminal';

export type CheckoutStep = 'contact' | 'address' | 'delivery';

interface Props {
  step: CheckoutStep;
  setStep: Function;
}

const useCheckout = (
  props: Props = { step: 'contact', setStep: () => null }
) => {
  const { step, setStep } = props;
  const { uid, isLoggedIn, user = {} } = useAuth();
  const { openAuthModal } = useAuthModal();
  const { rawCartValue, onCartChange, cart = {} } = useCart();
  const { checkout } = cart;

  // confirms that all previous steps have been filled
  const isStepEnabled = (step: string) => {
    const stepIndex = CHECKOUT_STEPS.indexOf(step as CheckoutStep);
    if (stepIndex < 0) return false;
    if (step === CHECKOUT_STEPS[0]) return true;
    const previousSteps = CHECKOUT_STEPS.slice(0, stepIndex);
    let enabled = true;
    for (let index = 0; index < previousSteps.length; index++) {
      const previousStep = previousSteps[index];
      const valid = checkout && !!checkout[previousStep];
      if (!valid) {
        enabled = false;
        break;
      }
    }
    return enabled;
  };

  const goToNextCheckoutStep = () => {
    // if this isnt the last step, goes to the next checkout step
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
      documentId: uid!,
    });
  };

  const submitCheckoutContact = (contact: CheckoutContact) => {
    submitCheckoutStep({ contact });
  };

  const { setUserAddressMutation } = useUserAddress();

  const { getStateFromIsoCode } = useTerminal();

  const submitCheckoutAddress = async (address: CheckoutAddress) => {
    const { streetAddress, additionalDetails, country, state, city, zipCode } =
      address;
    const { firstName, lastName, email } = user as any;
    const { phoneNumber } = checkout.contact;
    const terminalAddressData: { [key: string]: any } = {
      first_name: firstName,
      last_name: lastName,
      phone: `+${phoneNumber}`,
      email,
      line1: streetAddress,
      line2: additionalDetails,
      country,
      state: getStateFromIsoCode(state)?.name,
      city,
      zip: zipCode,
      metadata: {
        user: uid,
      },
    };

    const terminalAddress = await setUserAddressMutation.mutateAsync(
      terminalAddressData
    );

    submitCheckoutStep({
      address: { ...address, addressId: terminalAddress.address_id },
    });
  };

  const submitting =
    checkoutSubmissionMutation.isLoading || setUserAddressMutation.isLoading;

  return {
    submitCheckoutContact,
    submitCheckoutAddress,
    checkoutSubmissionMutation,
    submitting,
    checkout,
    isStepEnabled,
  };
};

export default useCheckout;
