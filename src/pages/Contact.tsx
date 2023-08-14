import PageHeader from "../components/PageHeader";
import ContactForm from "../components/ContactForm";

const Contact = () => {
  return (
    <div className="h-full flex flex-col">
      <PageHeader>Get in touch</PageHeader>
      <div className="container flex flex-col my-auto">
        <ContactForm />
      </div>
    </div>
  );
};

export default Contact;
