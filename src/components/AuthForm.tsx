import {
  IonModal,
  IonHeader,
  IonToolbar,
  IonIcon,
  IonContent,
} from '@ionic/react';
import { arrowBackOutline } from 'ionicons/icons';
import LoginForm from './LoginForm';
import SignUpForm from './SignUpForm';
import ReAuthenticationForm from './ReAuthenticationForm';

import useAuthModal from '../hooks/useAuthModal';

interface Props {
  isOpen: boolean;
  close: Function;
}

const AuthForm: React.FC<Props> = ({ isOpen, close }) => {
  const { authModal } = useAuthModal();

  let form = null;

  switch (authModal.form) {
    case 'sign-up':
      form = <SignUpForm />;
    case 're-authenticate':
      form = <ReAuthenticationForm />;
    case 'login':
      form = <LoginForm />;
    default:
      form = <LoginForm />;
  }
  return (
    <IonModal isOpen={isOpen} onWillDismiss={() => close()}>
      <IonHeader className='container ion-no-border'>
        <IonToolbar>
          <IonIcon
            icon={arrowBackOutline}
            color='dark'
            className='h-[20px] w-[20px]'
            onClick={() => close()}
          />
        </IonToolbar>
      </IonHeader>
      <IonContent>{form}</IonContent>
    </IonModal>
  );
};

export default AuthForm;
