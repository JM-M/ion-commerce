import LoginForm from "./LoginForm";
import SignUpForm from "./SignUpForm";
import ReAuthenticationForm from "./ReAuthenticationForm";

import useAuthModal from "../hooks/useAuthModal";

const AuthForm: React.FC = () => {
  const { authModal } = useAuthModal();

  switch (authModal.form) {
    case "sign-up":
      return <SignUpForm />;
    case "re-authenticate":
      return <ReAuthenticationForm />;
    case "login":
      return <LoginForm />;
    default:
      return <LoginForm />;
  }
};

export default AuthForm;
