import { IonText } from '@ionic/react';

interface Props {
  text?: string;
}

const ErrorText = ({ text }: Props) => {
  return (
    !!text && (
      <div className='mx-5 border-t border-[var(--ion-color-danger)]'>
        <IonText color='danger' slot='end' className='text-xs'>
          {text}
        </IonText>
      </div>
    )
  );
};

export default ErrorText;
