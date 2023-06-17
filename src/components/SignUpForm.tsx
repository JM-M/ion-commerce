import { IonItem, IonLabel, IonInput, IonButton } from '@ionic/react';
import { FcGoogle } from 'react-icons/fc';

import useAuthModal from '../hooks/useAuthModal';

const SignUpForm = () => {
  const { openAuthModal } = useAuthModal();
  return (
    <div className='container flex flex-col justify-center min-h-[calc(100vh_-_56px)] py-10'>
      <form onSubmit={(e) => e.preventDefault()}>
        <h2 className='font-medium text-lg text-center'></h2>
        <h2 className='mb-10 font-medium text-lg text-center'>
          Create CubeJKiddies account
        </h2>
        <IonButton fill='outline' color='medium' className='block h-10 mb-5'>
          <span className='flex items-center justify-center gap-[10px]'>
            <FcGoogle size={24} /> Create account with Google
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
          <IonLabel position='floating'>First name</IonLabel>
          <IonInput aria-label='First name' />
        </IonItem>
        <IonItem>
          <IonLabel position='floating'>Last name</IonLabel>
          <IonInput aria-label='Last name' />
        </IonItem>
        <IonItem>
          <IonLabel position='floating'>Password</IonLabel>
          <IonInput type='password' aria-label='Password' />
        </IonItem>
        <IonItem>
          <IonLabel position='floating'>Confirm Password</IonLabel>
          <IonInput type='password' aria-label='Confirm Password' />
        </IonItem>
        <IonButton
          id='checkoutFormButton'
          className='h-[50px] mt-[30px]'
          type='submit'
          expand='block'
        >
          Create account
        </IonButton>
      </form>
      <div className='mt-10 text-center text-[var(--ion-color-medium)]'>
        Already on CubeJKiddies?{' '}
        <span
          className='text-[var(--ion-color-primary)] font-medium'
          onClick={() => openAuthModal('login')}
        >
          Log in
        </span>
      </div>
    </div>
  );
};

export default SignUpForm;
