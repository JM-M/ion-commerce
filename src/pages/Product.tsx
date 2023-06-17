// import { Link } from 'react-router-dom';
import { IonContent, IonIcon, useIonRouter } from '@ionic/react';
import { arrowBackOutline } from 'ionicons/icons';
import ProductCarousel from '../components/ProductCarousel';
import ProductInfo from '../components/ProductInfo';
import ProductVariants from '../components/ProductVariants';
import AddToCartButton from '../components/AddToCartButton';
import ProductDescription from '../components/ProductDescription';
import ProductReviews from '../components/ProductReviews';

const Product: React.FC = () => {
  const ionRouter = useIonRouter();
  const { canGoBack, goBack, push } = ionRouter;

  return (
    <IonContent>
      <div className='block container mb-3'>
        <IonIcon
          icon={arrowBackOutline}
          color='dark'
          className='h-[20px] w-[20px]'
          onClick={() => (canGoBack() ? goBack() : push('/store', 'back'))}
        />
      </div>
      <ProductCarousel />
      <ProductInfo />
      <ProductVariants />
      <AddToCartButton />
      <ProductDescription />
      <ProductReviews />
    </IonContent>
  );
};

export default Product;
