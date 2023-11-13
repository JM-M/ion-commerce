import PageHeader from '../components/PageHeader';
import AccountPasswordForm from '../components/AccountPasswordForm';

const EditAccountPassword = () => {
  return (
    <div className='min-h-screen flex flex-col'>
      <PageHeader backHref='/account'>Edit password</PageHeader>
      <div className='container my-auto'>
        <AccountPasswordForm />
      </div>
    </div>
  );
};

export default EditAccountPassword;
