import { useEffect } from 'react';
import PageHeader from '../components/PageHeader';
import useAuthModal from '../hooks/useAuthModal';

const Account = () => {
  const { openAuthModal } = useAuthModal();

  useEffect(() => {
    openAuthModal('login');
  }, []);

  return (
    <div className='container h-full flex flex-col'>
      <h2 className='font-medium mb-5 mt-3 text-lg'>Account</h2>
      <div className='container my-auto text-center'>
        <h2 className='mb-3 text-lg'>You are not logged in</h2>
        <p>
          Please{' '}
          <span
            className='text-[var(--ion-color-primary)]'
            onClick={() => openAuthModal('login')}
          >
            log in
          </span>{' '}
          or{' '}
          <span
            className='text-[var(--ion-color-primary)]'
            onClick={() => openAuthModal('sign-up')}
          >
            create an account
          </span>
        </p>
      </div>
    </div>
  );
};

export default Account;
