import { Dispatch, SetStateAction, createContext } from 'react';

type AuthModal = { isOpen: boolean; form: string };

interface ContextInterface {
  authModal: AuthModal;
  setAuthModal: Dispatch<SetStateAction<AuthModal>> | Function;
}
const AuthModalContext = createContext<ContextInterface>({
  authModal: { isOpen: false, form: 'login' },
  setAuthModal: () => null,
});

export default AuthModalContext;
