import { useRef } from 'react';
import { useParams } from 'react-router';
import { IonButton, IonIcon, IonModal } from '@ionic/react';
import { addOutline } from 'ionicons/icons';
import cx from 'classnames';
import Review from './Review';
import ProductReviewEditor from './ProductReviewEditor';
import useProducts from '../hooks/useProducts';
import { Review as ReviewInterface } from '../constants/schemas/review';
import useAuth from '../hooks/useAuth';

const ProductReviews = () => {
  const reviewModal = useRef<HTMLIonModalElement>(null);
  const params: any = useParams();
  const { productId = '' } = params;

  const { isLoggedIn } = useAuth();

  const { reviews = [], review } = useProducts({ productId });

  return (
    <div className='container pt-[30px]'>
      <h4 className='mb-[10px] font-medium text-gray-500 text-base'>Reviews</h4>

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
      <IonButton
        color='secondary'
        className={cx(
          'flex items-center justify-center gap-[10px] h-10 w-full mb-5 rounded-[8px]',
          { 'pointer-events-none opacity-0': !isLoggedIn }
        )}
        id='open-review-editor'
      >
        <IonIcon icon={addOutline} slot='start' className='h-[24px] w-[24px]' />
        {!!review ? 'Edit' : 'Add'} review
      </IonButton>
      <ul className='flex flex-col gap-5'>
        {reviews.map((review: ReviewInterface, i: number) => {
          return (
            <li key={i}>
              <Review {...review} />
            </li>
          );
        })}
      </ul>
      <IonButton
        color='sec'
        className='block !h-30 w-fit mx-auto mt-[30px] font-medium rounded-[8px]'
      >
        Load more
      </IonButton>
    </div>
  );
};

export default ProductReviews;
