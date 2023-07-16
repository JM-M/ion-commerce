import { RouteComponentProps } from 'react-router';
import { IonContent, IonIcon, useIonRouter } from '@ionic/react';
import { arrowBackOutline } from 'ionicons/icons';
import ProductDetails from '../components/ProductDetails';

interface Props
  extends RouteComponentProps<{
    productId: string;
  }> {}

const Product: React.FC<Props> = ({ match }) => {
  const ionRouter = useIonRouter();
  const { canGoBack, goBack, push } = ionRouter;

  const { productId = '' } = match.params;

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
      <ProductDetails id={productId} />
    </IonContent>
  );
};

export default Product;
