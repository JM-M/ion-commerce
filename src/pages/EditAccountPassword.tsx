import PageHeader from "../components/PageHeader";
import AccountPasswordForm from "../components/AccountPasswordForm";

const EditAccountPassword = () => {
  return (
    <div className="h-full flex flex-col">
      <PageHeader>Edit password</PageHeader>
      <div className="container my-auto">
        <AccountPasswordForm />
      </div>
    </div>
  );
};

export default EditAccountPassword;
