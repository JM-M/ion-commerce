import { Fragment } from "react";
import { IonIcon } from "@ionic/react";
import { chevronForward } from "ionicons/icons";
import cx from "classnames";
import useCheckout from "../hooks/useCheckout";

const CheckoutSteps: React.FC<{
  steps: string[];
  step: string;
  setStep: Function;
}> = ({ steps = [], step: activeStep, setStep = () => null }) => {
  const { isStepEnabled } = useCheckout();
  return (
    <div className="container mt-10 mb-5">
      <div className="w-fit flex items-center gap-[10px] mx-auto">
        {steps.map((stepOption, i) => {
          const active = stepOption === activeStep;
          const isLastOption = i === steps.length - 1;
          const enabled = isStepEnabled(stepOption);
          return (
            <Fragment key={i}>
              <span
                className={cx("capitalize", {
                  "font-medium": active,
                  "opacity-50 pointer-events-none": !enabled,
                })}
                onClick={() => enabled && !active && setStep(stepOption)}
              >
                {stepOption}
              </span>
              {!isLastOption && <IonIcon icon={chevronForward} />}
            </Fragment>
          );
        })}
      </div>
    </div>
  );
};

export default CheckoutSteps;
