import { useContext } from 'react';
import AuthModalContext from '../contexts/authModal';

const useAuthModal = () => {
  const { authModal, setAuthModal } = useContext(AuthModalContext);

  const openAuthModal = (form: string) => {
    setAuthModal({ form, isOpen: true });
  };

  const closeAuthModal = () => {
    setAuthModal({ isOpen: false, form: 'login' });
  };

  return { openAuthModal, authModal, closeAuthModal };
};

export default useAuthModal;
