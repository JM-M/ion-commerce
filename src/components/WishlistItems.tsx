import PageLoader from './PageLoader';
import WishlistItem from './WishlistItem';
import Button from './Button';
import useWishlist, {
  WishlistItem as WishlistItemType,
} from '../hooks/useWishlist';

const WishlistItems = () => {
  const { wishlist, wishlistQuery } = useWishlist();
  const { isLoading, hasNextPage, isFetching, fetchNextPage } = wishlistQuery;

  if (isLoading) return <PageLoader />;

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
      {hasNextPage && (
        <Button
          color='secondary'
          className='block !h-30 w-fit mx-auto mt-5 font-medium rounded-[8px]'
          onClick={fetchNextPage}
          loading={isFetching}
        >
          Load more
        </Button>
      )}
    </>
  );
};

export default WishlistItems;
