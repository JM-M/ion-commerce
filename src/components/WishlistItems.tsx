import PageLoader from './PageLoader';
import WishlistItem from './WishlistItem';
import Button from './Button';
import useWishlist, {
  WishlistItem as WishlistItemType,
} from '../hooks/useWishlist';

const WishlistItems = () => {
  const { wishlist, wishlistQuery } = useWishlist();
  if (wishlistQuery.isLoading) return <PageLoader />;
  return (
    <>
      <ul className='mt-5'>
        {wishlist.map((wishlistItem: WishlistItemType, i: number) => {
          return (
            <li key={i}>
              <WishlistItem {...wishlistItem} />
            </li>
          );
        })}
      </ul>
      {wishlistQuery.data?.hasNextPage && (
        <Button
          color='secondary'
          className='block !h-30 w-fit mx-auto mt-[30px] font-medium rounded-[8px]'
          onClick={wishlistQuery.fetchNextPage}
        >
          Load more
        </Button>
      )}
    </>
  );
};

export default WishlistItems;
