import { useEffect, useState } from 'react';
import { Redirect, Route } from 'react-router-dom';
import {
  setupIonicReact,
  IonApp,
  IonIcon,
  IonLabel,
  IonPage,
  IonRouterOutlet,
  IonContent,
  IonTabBar,
  IonTabButton,
  IonTabs,
  IonModal,
  IonHeader,
  IonToolbar,
} from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import {
  storefrontOutline,
  timeOutline,
  personOutline,
  arrowBackOutline,
} from 'ionicons/icons';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import Home from './pages/Home';
import Orders from './pages/Orders';
import Order from './pages/Order';
import Account from './pages/Account';
import Contact from './pages/Contact';
import Wishlist from './pages/Wishlist';
import About from './pages/About';
import ForgotPassword from './pages/ForgotPassword';
import PasswordResetEmailSent from './pages/PasswordResetEmailSent';

import SideMenu from './components/SideMenu';
import TopHeader from './components/TopHeader';
import AuthForm from './components/AuthForm';

import AuthModalContext from './contexts/authModal';

/* Core CSS required for Ionic components to work properly */
import '@ionic/react/css/core.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';

/* Optional CSS utils that can be commented out */
import '@ionic/react/css/padding.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';

/* Theme variables */
// import "./theme/variables.css";

/* Tailwind CSS utils */
import './tailwind.css';

/* Custom CSS */
import './index.css';

setupIonicReact();

const queryClient = new QueryClient();

const App: React.FC = () => {
  const [authModal, setAuthModal] = useState({ isOpen: false, form: 'login' });

  useEffect(() => {
    localStorage.theme = 'light';
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <AuthModalContext.Provider value={{ authModal, setAuthModal }}>
        <IonApp>
          <IonReactRouter>
            <SideMenu />
            <IonPage id='main-content'>
              <TopHeader />
              <IonModal isOpen={authModal.isOpen}>
                <IonHeader className='container ion-no-border'>
                  <IonToolbar>
                    <IonIcon
                      icon={arrowBackOutline}
                      color='dark'
                      className='h-[20px] w-[20px]'
                      onClick={() =>
                        setAuthModal({ isOpen: false, form: 'login' })
                      }
                    />
                  </IonToolbar>
                </IonHeader>
                <IonContent>
                  <AuthForm />
                </IonContent>
              </IonModal>
              <IonTabs>
                <IonRouterOutlet className='pt-[60px] flex flex-col'>
                  <IonContent>
                    <div className='flex flex-col h-full mb-10'>
                      <Route
                        path='/forgot-password/sent'
                        component={PasswordResetEmailSent}
                        exact
                      />
                      <Route
                        path='/forgot-password'
                        component={ForgotPassword}
                        exact
                      />
                      <Route path='/about' component={About} />
                      <Route path='/wishlist' component={Wishlist} />
                      <Route path='/contact' component={Contact} />
                      <Route path='/:tab(account)' component={Account} />
                      <Route
                        path='/:tab(orders)/:orderId'
                        component={Order}
                        exact
                      />
                      <Route path='/:tab(orders)' component={Orders} exact />
                      <Route path='/:tab(store)' component={Home} />
                      <Route
                        path='/'
                        render={() => <Redirect to='/store' />}
                        exact
                      />
                    </div>
                  </IonContent>
                </IonRouterOutlet>
                <IonTabBar slot='bottom'>
                  <IonTabButton tab='store' href='/store'>
                    <IonIcon icon={storefrontOutline} />
                    <IonLabel>Store</IonLabel>
                  </IonTabButton>
                  <IonTabButton tab='orders' href='/orders'>
                    <IonIcon icon={timeOutline} />
                    <IonLabel>Orders</IonLabel>
                  </IonTabButton>
                  <IonTabButton tab='account' href='/account'>
                    <IonIcon icon={personOutline} />
                    <IonLabel>Account</IonLabel>
                  </IonTabButton>
                </IonTabBar>
              </IonTabs>
            </IonPage>
          </IonReactRouter>
        </IonApp>
      </AuthModalContext.Provider>
    </QueryClientProvider>
  );
};

export default App;
