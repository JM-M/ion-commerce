import { IonContent } from '@ionic/react';
import ProductSection from '../components/ProductSection';
import QueryController from '../components/QueryController';

const Search = () => {
  return (
    <>
      <div className='container pt-3'>
        <span className='text-gray-500'>Search results for</span>
        <span className='text-gray-900 font-medium'>'product name'</span>
      </div>
      {/* <div className='container flex justify-end items-center py-3'>
        <QueryController />
      </div> */}
      <IonContent>{/* <ProductSection numProducts={8} /> */}</IonContent>
    </>
  );
};

export default Search;
