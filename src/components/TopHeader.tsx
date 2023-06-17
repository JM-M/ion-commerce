import { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  IonMenuButton,
  IonIcon,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonButtons,
} from '@ionic/react';
import { searchOutline, cartOutline } from 'ionicons/icons';

import TopHeaderSearchbar from './TopHeaderSearchbar';

const TopHeader = () => {
  const [showSearchbar, setShowSearchbar] = useState(false);
  const openSearchbar = () => setShowSearchbar(true);
  const closeSearchbar = () => setShowSearchbar(false);
  return (
    <IonHeader className='container ion-no-border'>
      <IonToolbar>
        <IonButtons slot='start'>
          <IonMenuButton />
        </IonButtons>
        {showSearchbar ? (
          <TopHeaderSearchbar close={closeSearchbar} />
        ) : (
          <>
            <IonTitle>CubeJKiddies</IonTitle>
            <IonIcon
              icon={searchOutline}
              slot='end'
              onClick={openSearchbar}
              className='h-[20px] w-[20px]'
            />
          </>
        )}
        <Link
          to='/store/checkout'
          className='relative h-[24px] w-[30px]'
          slot='end'
        >
          <IonIcon
            icon={cartOutline}
            className='relative top-[2px] right-1/4 h-[20px] w-[20px]'
          />
          <span className='absolute top-0 right-0 h-4 w-fit min-w-[16px] inline-flex items-center justify-center rounded-lg bg-[var(--ion-color-primary)] text-white text-[9px] font-medium'>
            <span className='relative -bottom-[1px] text-center'>1</span>
          </span>
        </Link>
      </IonToolbar>
    </IonHeader>
  );
};

export default TopHeader;
