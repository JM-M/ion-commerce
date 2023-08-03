import CheckoutContactForm from "./CheckoutContactForm";
import CheckoutAddressForm from "./CheckoutAddressForm";
import CheckoutDeliveryForm from "./CheckoutDeliveryForm";
import PageLoader from "./PageLoader";
import useCheckout, { CheckoutStep } from "../hooks/useCheckout";
import useCart from "../hooks/useCart";

const CheckoutForm: React.FC<{ step: string; setStep: Function }> = ({
  step,
  setStep = () => null,
}) => {
  const { cartQuery } = useCart();
  const { submitCheckoutContact, submitCheckoutAddress, submitting } =
    useCheckout({
      step: step as CheckoutStep,
      setStep,
    });

  if (cartQuery.isLoading) return <PageLoader />;

  let form = null;
  if (step === "contact")
    form = (
      <CheckoutContactForm
        submit={submitCheckoutContact}
        submitting={submitting}
      />
    );

  if (step === "address")
    form = (
      <CheckoutAddressForm
        submit={submitCheckoutAddress}
        submitting={submitting}
      />
    );

  if (step === "delivery") form = <CheckoutDeliveryForm />;

  return form;
};

export default CheckoutForm;
