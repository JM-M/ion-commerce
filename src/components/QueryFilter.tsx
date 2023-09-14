import { useState, useRef } from 'react';
import {
  IonButton,
  IonHeader,
  IonModal,
  IonToolbar,
  IonButtons,
  IonIcon,
  IonContent,
  IonTitle,
} from '@ionic/react';
import { closeOutline } from 'ionicons/icons';
import { CiFilter } from 'react-icons/ci';
import ProductFilterForm from './ProductFilterForm';

interface Props {
  productFilters: {};
  setProductFilters: Function;
}

const QueryFilter: React.FC<Props> = ({
  productFilters,
  setProductFilters,
}) => {
  const [open, setOpen] = useState<boolean>(false);

  const filterModal = useRef<HTMLIonModalElement>(null);

  const closeModal = () => {
    filterModal.current?.dismiss();
  };

  return (
    <>
      <IonButton
        color='dark'
        fill='clear'
        className='ion-no-padding'
        id='filter-open-button'
      >
        <span className='px-2'>
          <CiFilter size={20} className='inline-block mr-1' />
          filter
        </span>
      </IonButton>
      <IonModal ref={filterModal} trigger='filter-open-button'>
        <IonHeader className='ion-no-border'>
          <IonToolbar>
            <IonButtons slot='start'>
              <IonButton onClick={closeModal}>
                <IonIcon icon={closeOutline} className='h-[24px] w-[24px]' />
              </IonButton>
            </IonButtons>
            <IonTitle>Filter products</IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonContent>
          <div className='h-full flex flex-col'><ProductFilterForm /></div>
        </IonContent>
      </IonModal>
    </>
  );
};

export default QueryFilter;
