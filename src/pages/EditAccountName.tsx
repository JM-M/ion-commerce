import PageHeader from '../components/PageHeader';
import AccountNameForm from '../components/AccountNameForm';

const EditAccountName = () => {
  return (
    <div className='min-h-screen flex flex-col'>
      <PageHeader backHref='/account'>Edit name</PageHeader>
      <div className='container my-auto'>
        <AccountNameForm />
      </div>
    </div>
  );
};

export default EditAccountName;
