import { IonText } from '@ionic/react';
import cx from 'classnames';

interface Props {
  text?: string;
  hideHorizontalBar?: boolean;
  className?: string;
}

const ErrorText = ({
  text,
  hideHorizontalBar = false,
  className = '',
}: Props) => {
  if (!text) return <></>;
  return (
    <div
      className={cx('mx-5', className, {
        'border-t border-[var(--ion-color-danger)]': !hideHorizontalBar,
      })}
    >
      <IonText color='danger' slot='end' className='text-xs'>
        {text}
      </IonText>
    </div>
  );
};

export default ErrorText;
