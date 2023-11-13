import PageHeader from '../components/PageHeader';
import ContactForm from '../components/ContactForm';
import Footer from '../components/Footer';

const Contact = () => {
  return (
    <div className='min-h-screen h-full flex flex-col'>
      <PageHeader>Get in touch</PageHeader>
      <div className='container flex flex-col my-auto'>
        <ContactForm />
      </div>
      <Footer />
    </div>
  );
};

export default Contact;
