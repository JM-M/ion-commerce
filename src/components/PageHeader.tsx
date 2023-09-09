import { ReactNode } from 'react';
import {
  IonHeader,
  IonToolbar,
  IonTitle,
  IonBackButton,
  IonButtons,
  IonSkeletonText,
} from '@ionic/react';

interface Props {
  children?: ReactNode;
  backHref?: string;
  noBackButton?: boolean;
  loading?: boolean;
}

const PageHeader: React.FC<Props> = ({
  children,
  backHref = '',
  noBackButton = false,
  loading = false,
}) => {
  return (
    <IonHeader className='container ion-no-border'>
      <IonToolbar>
        {!noBackButton && (
          <IonButtons slot='start'>
            {loading ? (
              <IonSkeletonText
                animated={true}
                className='block h-full w-5 mr-5 ion-no-padding ion-no-margin rounded-md'
              ></IonSkeletonText>
            ) : (
              <IonBackButton
                defaultHref={backHref || '/'}
                className='ion-no-padding h-[20px] w-[20px]'
              />
            )}
          </IonButtons>
        )}
        <IonTitle slot='start' className='ion-no-padding'>
          {loading ? (
            <IonSkeletonText
              animated={true}
              className='block h-full w-full ion-no-padding ion-no-margin rounded-md'
            ></IonSkeletonText>
          ) : (
            children
          )}
        </IonTitle>
      </IonToolbar>
    </IonHeader>
  );
};

export default PageHeader;
