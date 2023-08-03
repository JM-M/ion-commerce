import useAuth from "./useAuth";
import useAuthModal from "./useAuthModal";
import useCart, { Cart } from "./useCart";
import useFirestoreDocumentMutation from "./useFirestoreDocumentMutation";
import checkoutSchema, {
  CheckoutAddress,
  CheckoutContact,
  CheckoutDelivery,
  addressSchema,
  contactSchema,
  deliverySchema,
} from "../constants/schemas/checkout";
import CHECKOUT_STEPS from "../constants/checkoutSteps";

export type CheckoutStep = "contact" | "address" | "delivery";

interface Props {
  step: CheckoutStep;
  setStep: Function;
}

const useCheckout = (
  props: Props = { step: "contact", setStep: () => null }
) => {
  const { step, setStep } = props;
  const { uid, isLoggedIn } = useAuth();
  const { openAuthModal } = useAuthModal();
  const { rawCartValue, onCartChange, cart = {} } = useCart();
  const { checkout } = cart;

  const validateStep = async (step: CheckoutStep) => {
    let schema;
    if (step === "contact") schema = contactSchema;
    if (step === "address") schema = addressSchema;
    if (step === "delivery") schema = deliverySchema;
    const valid = await schema?.validate(checkout[step]);
    console.log(valid);
    return valid;
  };

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
      collectionName: "carts",
      onSuccess: onSubmissionSuccess,
      invalidateCollectionQuery: false,
      invalidateDocumentQuery: false,
    });

  const submitCheckoutStep = (step: any) => {
    if (!isLoggedIn) openAuthModal("login");
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

  const submitCheckoutAddress = (address: CheckoutAddress) => {
    submitCheckoutStep({ address });
  };

  const submitting = checkoutSubmissionMutation.isLoading;

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
