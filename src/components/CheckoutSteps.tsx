import { Fragment } from 'react';
import { IonIcon } from '@ionic/react';
import { chevronForward } from 'ionicons/icons';
import cx from 'classnames';

const CheckoutSteps: React.FC<{
  steps: string[];
  step: string;
  setStep: Function;
}> = ({ steps = [], step, setStep = () => null }) => {
  return (
    <div className='container mt-10 mb-5'>
      <div className='w-fit flex items-center gap-[10px] mx-auto'>
        {steps.map((stepOption, i) => {
          const active = stepOption === step;
          const isLastOption = i === steps.length - 1;
          return (
            <Fragment key={i}>
              <span
                className={cx('capitalize', {
                  'font-medium': active,
                  'text-[var(--ion-color-medium)]': !active,
                })}
                onClick={() => !active && setStep(stepOption)}
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
