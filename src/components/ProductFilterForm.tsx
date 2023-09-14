import { IonLabel, IonRange, IonItem, IonCheckbox } from '@ionic/react';
import { NAIRA } from '../constants/unicode';

const ProductFilterForm = () => {
  return (
    <form className='px-10 mt-auto mb-20'>
      <div className='my-5'>
        <IonLabel className='font-medium'>Price range</IonLabel>
        <IonRange
          aria-label='Price range'
          labelPlacement='fixed'
          value={{
            lower: 2000,
            upper: 80000,
          }}
          pinFormatter={(percentage: number) => {
            const value = 2000 + (percentage / 100) * (80000 - 2000);
            return `${NAIRA}${Math.round(value)}`;
          }}
          pin
          dualKnobs
        />
        <ul className='flex justify-between text-gray-500'>
          <li>2000</li>
          <li>80000</li>
        </ul>
      </div>
      <div className='my-5'>
        <IonCheckbox justify='start'>
          <span className='font-medium'>Show only disounted product</span>s
        </IonCheckbox>
      </div>
    </form>
  );
};

export default ProductFilterForm;
