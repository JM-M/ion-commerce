import { Link } from 'react-router-dom';
import {
  IonMenu,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonMenuToggle,
} from '@ionic/react';

const SideMenu = () => {
  return (
    <IonMenu type='push' contentId='main-content'>
      <IonHeader className='container ion-no-border'>
        <IonToolbar>
          <IonTitle className='ion-no-padding'>CubeJKiddies</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <div className='container h-full flex flex-col justify-end pb-20'>
          <ul>
            <li className='flex items-center h-10 pl-10 mb-2'>
              <IonMenuToggle>
                <Link to='/store/checkout'>Cart</Link>
              </IonMenuToggle>
            </li>
            <li className='flex items-center h-10 pl-10 mb-2'>
              <IonMenuToggle>
                <Link to='/wishlist'>Wishlist</Link>
              </IonMenuToggle>
            </li>
            <li className='flex items-center h-10 pl-10 mb-2'>
              <IonMenuToggle>
                <Link to='/about'>About Us</Link>
              </IonMenuToggle>
            </li>
            <li className='flex items-center h-10 pl-10 mb-2'>
              <IonMenuToggle>
                <Link to='/contact'>Contact Us</Link>
              </IonMenuToggle>
            </li>
          </ul>
        </div>
      </IonContent>
    </IonMenu>
  );
};

export default SideMenu;
