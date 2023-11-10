import { useState, useEffect } from 'react';
import {
  IonModal,
  IonHeader,
  IonToolbar,
  IonIcon,
  IonContent,
} from '@ionic/react';
import { arrowBackOutline } from 'ionicons/icons';
import algoliasearch from 'algoliasearch/lite';
import { InstantSearch, SearchBox, Hits } from 'react-instantsearch';
import ProductSearchHit from './ProductSearchHit';

const searchClient = algoliasearch(
  import.meta.env.VITE_ALGOLIA_APPLICATION_ID,
  import.meta.env.VITE_ALGOLIA_SEARCH_ONLY_API_KEY
);

const TopHeaderSearchbar: React.FC<{ close: Function }> = ({ close }) => {
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [focused, setFocused] = useState<boolean>();

  useEffect(() => {
    setTimeout(() => {
      const inputElement: HTMLInputElement | null | undefined = document
        .querySelector('#algolia-searchbar-container')
        ?.querySelector('INPUT');
      if (inputElement) inputElement.focus();
    }, 200);
  }, []);

  return (
    <InstantSearch searchClient={searchClient} indexName='products'>
      <IonModal
        isOpen={true}
        className='product-search-modal'
        onWillDismiss={() => close()}
      >
        <IonHeader className='container ion-no-border'>
          <IonToolbar>
            <div className='flex items-center' id='searchbox-container'>
              <IonIcon
                icon={arrowBackOutline}
                color='dark'
                className='h-[20px] w-[20px]'
                onClick={() => close()}
              />
              <SearchBox
                onChangeCapture={(e) => setSearchTerm((e.target as any)?.value)}
                onFocus={() => setFocused(true)}
                onBlur={() => setFocused(false)}
                placeholder='Search products'
                id='algolia-searchbar-container'
                autoFocus
              />
            </div>
          </IonToolbar>
        </IonHeader>
        <IonContent>
          {searchTerm && (
            <Hits
              hitComponent={({ hit }) => (
                <ProductSearchHit hit={hit} close={close} />
              )}
            />
          )}
        </IonContent>
      </IonModal>
    </InstantSearch>
  );
};

export default TopHeaderSearchbar;
