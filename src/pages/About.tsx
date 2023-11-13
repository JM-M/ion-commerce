import PageHeader from '../components/PageHeader';
import AboutDetails from '../components/AboutDetails';
import Footer from '../components/Footer';

const About = () => {
  return (
    <div className='h-full flex flex-col'>
      <PageHeader>About us</PageHeader>
      <div className='container min-h-screen flex flex-col my-auto'>
        <AboutDetails />
      </div>
      <Footer />
    </div>
  );
};

export default About;
