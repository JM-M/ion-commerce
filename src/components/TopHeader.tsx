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
import CartIcon from './CartIcon';
import WishlistIcon from './WishlistIcon';
import UserIcon from './UserIcon';

import useCart from '../hooks/useCart';
import useScreenSize from '../hooks/useScreenSize';

const TopHeader = () => {
  const [showSearchbar, setShowSearchbar] = useState(false);
  const openSearchbar = () => setShowSearchbar(true);
  const closeSearchbar = () => setShowSearchbar(false);

  const { width } = useScreenSize();
  const { cartSize } = useCart();

  return (
    <IonHeader className='ion-no-border ion-no-padding'>
      <IonToolbar className='container overflow-visible'>
        <IonButtons slot='start'>
          <IonMenuButton className='relative right-5' />
        </IonButtons>
        {showSearchbar ? (
          <TopHeaderSearchbar close={closeSearchbar} />
        ) : (
          <>
            <IonTitle className='ion-no-padding'>
              <Link to='/store' className='flex gap-3 ml-3'>
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
        <WishlistIcon />
        <CartIcon cartSize={cartSize} />
        <UserIcon />
      </IonToolbar>
    </IonHeader>
  );
};

export default TopHeader;
