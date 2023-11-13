type Props = {};

const Footer = (props: Props) => {
  return (
    <footer className='py-16 mt-10 bg-gray-200'>
      <div className='container !px-0 text-center text-gray-700'>
        Ion Ecommerce &copy; {new Date().getFullYear()}
      </div>
    </footer>
  );
};

export default Footer;
