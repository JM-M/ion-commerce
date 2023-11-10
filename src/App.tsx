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
  storefront,
  time,
  person,
} from 'ionicons/icons';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import Store from './pages/Store';
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
// import AppLoading from './components/AppLoading';

import AuthModalContext from './contexts/authModal';
import CartProductsContext from './contexts/cartProducts';
import ScreenSizeContext from './contexts/screenSize';

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

/* react-loading-skeleton styles */
import 'react-loading-skeleton/dist/skeleton.css';
import useEruda from './hooks/useEruda';

setupIonicReact({ mode: 'md' });

const queryClient = new QueryClient();

const App: React.FC = () => {
  const [authModal, setAuthModal] = useState({ isOpen: false, form: 'login' });
  const [cartProducts, setCartProducts] = useState([]);
  const [screenSize, setScreenSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });

  useEffect(() => {
    localStorage.theme = 'light';
  }, []);

  useEffect(() => {
    const handleResize = () => {
      setScreenSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  useEruda();

  const { width } = screenSize;

  return (
    <QueryClientProvider client={queryClient}>
      <ScreenSizeContext.Provider value={screenSize}>
        <AuthModalContext.Provider value={{ authModal, setAuthModal }}>
          <CartProductsContext.Provider
            value={{ cartProducts, setCartProducts }}
          >
            <IonApp>
              <IonReactRouter>
                <SideMenu />
                <IonPage id='main-content'>
                  <TopHeader />
                  <AuthForm
                    isOpen={authModal.isOpen}
                    close={() => setAuthModal({ isOpen: false, form: 'login' })}
                  />
                  <IonTabs>
                    <IonRouterOutlet className='pt-[60px] flex flex-col'>
                      <IonContent className='scrollbar-hide'>
                        <div className='flex flex-col min-h-[100%] mb-10'>
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
                          <Route
                            path='/:tab(orders)'
                            component={Orders}
                            exact
                          />
                          <Route path='/:tab(store)' component={Store} />
                          <Route
                            path='/'
                            render={() => <Redirect to='/store' />}
                            exact
                          />
                        </div>
                      </IonContent>
                    </IonRouterOutlet>
                    <IonTabBar slot='bottom' hidden={width > 768}>
                      <IonTabButton tab='store' href='/store'>
                        <IonIcon
                          icon={storefrontOutline}
                          className='unselected'
                        />
                        <IonIcon icon={storefront} className='selected' />
                        <IonLabel>Store</IonLabel>
                      </IonTabButton>
                      <IonTabButton tab='orders' href='/orders'>
                        <IonIcon icon={timeOutline} className='unselected' />
                        <IonIcon icon={time} className='selected' />
                        <IonLabel>Orders</IonLabel>
                      </IonTabButton>
                      <IonTabButton tab='account' href='/account'>
                        <IonIcon icon={personOutline} className='unselected' />
                        <IonIcon icon={person} className='selected' />
                        <IonLabel>Account</IonLabel>
                      </IonTabButton>
                    </IonTabBar>
                  </IonTabs>
                </IonPage>
              </IonReactRouter>
            </IonApp>
          </CartProductsContext.Provider>
        </AuthModalContext.Provider>
      </ScreenSizeContext.Provider>
    </QueryClientProvider>
  );
};

export default App;
