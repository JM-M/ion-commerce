import LoginForm from './LoginForm';
import SignUpForm from './SignUpForm';

import useAuthModal from '../hooks/useAuthModal';

const AuthForm: React.FC = () => {
  const { authModal } = useAuthModal();

  switch (authModal.form) {
    case 'sign-up':
      return <SignUpForm />;
    default:
      return <LoginForm />;
  }
};

export default AuthForm;
