import { IonItem, IonLabel, IonInput, IonButton } from '@ionic/react';
import { FcGoogle } from 'react-icons/fc';

import useAuthModal from '../hooks/useAuthModal';

const LoginForm = () => {
  const { openAuthModal } = useAuthModal();
  return (
    <div className='container flex flex-col justify-center min-h-[calc(100vh_-_56px)] py-10'>
      <form onSubmit={(e) => e.preventDefault()}>
        <h2 className='mb-10 font-medium text-lg text-center'>
          Login to CubeJKiddies
        </h2>
        <IonButton fill='outline' color='medium' className='block h-10 mb-5'>
          <span className='flex items-center justify-center gap-[10px]'>
            <FcGoogle size={24} /> Log in with Google
          </span>
        </IonButton>
        <div className='text-xs text-[var(--ion-color-medium)] text-center'>
          Or with email and password
        </div>
        <IonItem>
          <IonLabel position='floating'>Email</IonLabel>
          <IonInput type='email' aria-label='Email' />
        </IonItem>
        <IonItem>
          <IonLabel position='floating'>Password</IonLabel>
          <IonInput aria-label='First name' type='password' />
        </IonItem>
        <div className='flex justify-end mt-1'>
          <span className='font-medium text-[var(--ion-color-medium)]'>
            Forgot password?
          </span>
        </div>
        <IonButton
          id='checkoutFormButton'
          className='h-[50px] mt-[30px]'
          type='submit'
          expand='block'
        >
          Log in
        </IonButton>
      </form>
      <div className='mt-10 text-center text-[var(--ion-color-medium)]'>
        New to CubeJKiddies?{' '}
        <span
          className='text-[var(--ion-color-primary)] font-medium'
          onClick={() => openAuthModal('sign-up')}
        >
          Create account
        </span>
      </div>
    </div>
  );
};

export default LoginForm;
