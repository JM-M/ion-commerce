import Footer from '../components/Footer';
import PageHeader from '../components/PageHeader';
import WishlistItems from '../components/WishlistItems';

const Wishlist = () => {
  return (
    <div className='flex flex-col'>
      <PageHeader>Wishlist</PageHeader>
      <div className='container flex flex-col pb-10 min-h-screen'>
        <WishlistItems />
      </div>
      <Footer />
    </div>
  );
};

export default Wishlist;
