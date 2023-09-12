import { IonLabel, IonRange, IonItem, IonCheckbox } from '@ionic/react';
import { NAIRA } from '../constants/unicode';

const ProductFilterForm = () => {
  return (
    <form className='container'>
      <h2 className='font-medium text-lg'>Filter products</h2>
      <div className='my-5'>
        <IonLabel>Price range</IonLabel>
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
        <IonItem className='ion-no-padding'>
          <IonCheckbox justify='start'>
            Show only disounted products
          </IonCheckbox>
        </IonItem>
      </div>
    </form>
  );
};

export default ProductFilterForm;
