import { useEffect } from 'react';
import { Route, Redirect } from 'react-router-dom';
import { IonRouterOutlet, IonContent } from '@ionic/react';
import PageHeader from '../components/PageHeader';
import PageLoader from '../components/PageLoader';
import EditAccountName from './EditAccountName';
import EditAccountEmail from './EditAccountEmail';
import EditAccountPassword from './EditAccountPassword';
import useAuthModal from '../hooks/useAuthModal';
import useAuth from '../hooks/useAuth';
import AccountDetails from '../components/AccountDetails';
import Footer from '../components/Footer';

const Account = () => {
  const { autoAuthenticating, isLoggedIn } = useAuth();
  const { openAuthModal } = useAuthModal();

  useEffect(() => {
    if (!autoAuthenticating && !isLoggedIn) openAuthModal('login');
  }, [autoAuthenticating, isLoggedIn]);

  if (autoAuthenticating) return <PageLoader />;

  return (
    <IonRouterOutlet>
      <IonContent>
        <Route path='/:tab(account)' exact>
          <div className='container h-full flex flex-col'>
            <h2 className='font-medium mb-5 mt-3 text-lg'>Account</h2>
            <AccountDetails />
          </div>
        </Route>
        <Route
          path='/'
          render={() => {
            if (!isLoggedIn) return <Redirect to='/store' />;
            return (
              <div>
                <Route
                  path='/:tab(account)/edit/name'
                  component={EditAccountName}
                  exact
                />
                <Route
                  path='/:tab(account)/edit/email'
                  component={EditAccountEmail}
                  exact
                />
                <Route
                  path='/:tab(account)/edit/password'
                  component={EditAccountPassword}
                  exact
                />
                <Footer />
              </div>
            );
          }}
        />
      </IonContent>
    </IonRouterOutlet>
  );
};

export default Account;
