import { IonContent, IonModal } from '@ionic/react';
import Logo from './Logo';
import useProductSections from '../hooks/useProductSections';

const AppLoading: React.FC = () => {
  const { productSectionsQuery } = useProductSections();
  return (
    <IonModal isOpen={productSectionsQuery.isLoading}>
      <IonContent>
        <div className='animate-pulse h-screen w-screen flex flex-col items-center justify-center'>
          <Logo size={80} />
          <h1 className='mt-5 font-medium text-xl'>Cube J Empire</h1>
        </div>
      </IonContent>
    </IonModal>
  );
};

export default AppLoading;
