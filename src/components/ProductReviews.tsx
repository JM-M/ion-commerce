import { useRef } from 'react';
import { useParams } from 'react-router';
import { IonIcon, IonModal } from '@ionic/react';
import { addOutline, trashBinOutline } from 'ionicons/icons';
import cx from 'classnames';
import Review from './Review';
import ProductReviewEditor from './ProductReviewEditor';
import Button from './Button';
import useProducts from '../hooks/useProducts';
import { Review as ReviewInterface } from '../constants/schemas/review';
import useAuth from '../hooks/useAuth';

const ProductReviews = () => {
  const reviewModal = useRef<HTMLIonModalElement>(null);
  const params: any = useParams();
  const { productId = '' } = params;

  const { isLoggedIn } = useAuth();

  const {
    reviews = [],
    review,
    reviewsQuery,
    deleteReview,
    deleteReviewMutation,
    hasBoughtProduct,
  } = useProducts({ productId });
  const { hasNextPage, fetchNextPage } = reviewsQuery;

  return (
    <div className='container pt-[30px]'>
      {!!reviews?.length && (
        <h4 className='mb-[10px] font-medium text-gray-500 text-base'>
          Reviews
        </h4>
      )}
      <IonModal
        ref={reviewModal}
        trigger='open-review-editor'
        initialBreakpoint={0.7}
      >
        <ProductReviewEditor
          review={review}
          close={() => reviewModal.current?.dismiss()}
        />
      </IonModal>
      {!!review && (
        <div className='mb-5'>
          <Review {...review} firstName='You' lastName='' />
        </div>
      )}
      <div className={cx({ 'flex gap-2': hasBoughtProduct && isLoggedIn })}>
        {!!(hasBoughtProduct && isLoggedIn && review) && (
          <Button
            color='dark'
            fill='outline'
            className='flex items-center justify-center gap-[10px] h-10 w-full mb-5 rounded-[8px]'
            onClick={() => deleteReview()}
            loading={deleteReviewMutation.isLoading}
          >
            <IonIcon
              icon={trashBinOutline}
              slot='start'
              className='h-[24px] w-[24px]'
            />
            Delete
          </Button>
        )}
        <Button
          color='secondary'
          className={cx(
            'flex items-center justify-center gap-[10px] h-10 w-full mb-5 rounded-[8px]',
            {
              'pointer-events-none opacity-0': !isLoggedIn || !hasBoughtProduct,
            }
          )}
          id='open-review-editor'
        >
          <IonIcon
            icon={addOutline}
            slot='start'
            className='h-[24px] w-[24px]'
          />
          {!!review ? 'Edit' : 'Add'} review
        </Button>
      </div>
      <ul className='flex flex-col gap-5'>
        {reviews.map((review: ReviewInterface, i: number) => {
          return (
            <li key={i}>
              <Review {...review} />
            </li>
          );
        })}
      </ul>
      {hasNextPage && (
        <Button
          color='medium'
          className='block !h-30 w-fit mx-auto mt-[30px] font-medium rounded-[8px]'
          onClick={fetchNextPage}
        >
          Load more
        </Button>
      )}
    </div>
  );
};

export default ProductReviews;
