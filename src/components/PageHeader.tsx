import { ReactElement } from 'react';
import {
  IonHeader,
  IonToolbar,
  IonTitle,
  IonBackButton,
  IonButtons,
} from '@ionic/react';

const PageHeader: React.FC<{ children: ReactElement | string }> = ({
  children,
}) => {
  return (
    <IonHeader className='container ion-no-border'>
      <IonToolbar>
        <IonButtons slot='start'>
          <IonBackButton
            defaultHref='/'
            className='ion-no-padding h-[20px] w-[20px]'
          />
        </IonButtons>
        <IonTitle slot='start'>{children}</IonTitle>
      </IonToolbar>
    </IonHeader>
  );
};

export default PageHeader;
