import PageHeader from '../components/PageHeader';
import AccountEmailForm from '../components/AccountEmailForm';

const EditAccountEmail = () => {
  return (
    <div className='min-h-screen flex flex-col'>
      <PageHeader backHref='/account'>Edit email</PageHeader>
      <div className='container min-h-screen my-auto'>
        <AccountEmailForm />
      </div>
    </div>
  );
};

export default EditAccountEmail;
