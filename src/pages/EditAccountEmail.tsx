import PageHeader from "../components/PageHeader";
import AccountEmailForm from "../components/AccountEmailForm";

const EditAccountEmail = () => {
  return (
    <div className="h-full flex flex-col">
      <PageHeader>Edit email</PageHeader>
      <div className="container my-auto">
        <AccountEmailForm />
      </div>
    </div>
  );
};

export default EditAccountEmail;
