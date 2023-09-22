import PageHeader from '../components/PageHeader';
import WishlistItems from '../components/WishlistItems';

const Wishlist = () => {
  return (
    <div className='h-full flex flex-col'>
      <PageHeader>Wishlist</PageHeader>
      <div className='container flex flex-col pb-10'>
        <WishlistItems />
      </div>
    </div>
  );
};

export default Wishlist;
