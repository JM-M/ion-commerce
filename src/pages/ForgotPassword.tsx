import PageHeader from "../components/PageHeader";
import ForgotPasswordForm from "../components/ForgotPasswordForm";

const ForgotPassword = () => {
  return (
    <div className="h-full flex flex-col">
      <PageHeader backHref="/store">Forgot password</PageHeader>
      <div className="container my-auto">
        <ForgotPasswordForm />
      </div>
    </div>
  );
};

export default ForgotPassword;
