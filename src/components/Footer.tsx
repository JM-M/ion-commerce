import useScreenSize from '../hooks/useScreenSize';

type Props = {};

const Footer = (props: Props) => {
  const { width } = useScreenSize();
  if (width < 768) return null;
  return (
    <footer className='py-16 mt-10 bg-gray-200'>
      <div className='container !px-0 text-center text-gray-900'>
        Ion Ecommerce &copy; {new Date().getFullYear()}{' '}
        <a
          href='https://github.com/JM-M'
          className='font-medium text-blue-700 hover:underline'
        >
          Michael Jola-Moses
        </a>
      </div>
    </footer>
  );
};

export default Footer;
