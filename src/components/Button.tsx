import { ReactNode } from 'react';
import { IonButton, IonSpinner } from '@ionic/react';

const Button: React.FC<{
  children: ReactNode;
  loading?: boolean;
  disabled?: boolean;
  [x: string]: any;
}> = ({ children, loading, disabled, ...props }) => {
  return (
    <IonButton {...props} disabled={loading || disabled}>
      {loading && <IonSpinner name='dots' className='inline-block mr-3' />}
      {children}
    </IonButton>
  );
};

export default Button;
