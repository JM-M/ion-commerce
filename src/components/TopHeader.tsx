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
import { searchOutline } from 'ionicons/icons';

import TopHeaderSearchbar from './TopHeaderSearchbar';
import useCart from '../hooks/useCart';
import CartIcon from './CartIcon';
import UserIcon from './UserIcon';

const TopHeader = () => {
  const [showSearchbar, setShowSearchbar] = useState(false);
  const openSearchbar = () => setShowSearchbar(true);
  const closeSearchbar = () => setShowSearchbar(false);

  const { cartSize } = useCart();

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
            <IonTitle className='ion-no-padding'>
              <Link to='/store' className='ml-3'>
                {import.meta.env.VITE_APP_NAME}
              </Link>
            </IonTitle>
            <IonIcon
              icon={searchOutline}
              slot='end'
              onClick={openSearchbar}
              className='inline-block h-[24px] w-[24px] mr-2'
            />
          </>
        )}
        <CartIcon cartSize={cartSize} />
        <UserIcon />
      </IonToolbar>
    </IonHeader>
  );
};

export default TopHeader;
