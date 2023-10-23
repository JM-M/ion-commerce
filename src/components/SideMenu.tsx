import {
  IonMenu,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  useIonRouter,
} from '@ionic/react';
import CategoriesMenu from './CategoriesMenu';
import SideMenuLinks from './SideMenuLinks';

const SideMenu = () => {
  const {
    routeInfo: { pathname },
  } = useIonRouter();

  return (
    <IonMenu
      type='push'
      contentId='main-content'
      className='dark:text-neutral-300'
    >
      <IonHeader className='container ion-no-border bg-gray-200 dark:bg-neutral-900'>
        <IonToolbar color='transparent'>
          <IonTitle className='bg-transparent'>
            {import.meta.env.VITE_APP_NAME}
          </IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <div className='container !pr-0 h-full flex flex-col gap-10 py-10 bg-gray-200 dark:bg-neutral-900'>
          <div>
            <h2 className='mt-5 mb-3 pl-5 font-medium text-lg'>Categories</h2>
            <CategoriesMenu />
          </div>
          <div>
            <h2 className='mt-5 mb-3 pl-5 font-medium text-lg'>Links</h2>
            <SideMenuLinks pathname={pathname} />
          </div>
        </div>
      </IonContent>
    </IonMenu>
  );
};

export default SideMenu;
