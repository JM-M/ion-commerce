import { IonButton } from '@ionic/react';
import { CiFilter } from 'react-icons/ci';

const QueryFilter: React.FC = () => {
  return (
    <>
      <IonButton
        color='dark'
        fill='clear'
        className='ion-no-padding'
        id='filter-open-button'
      >
        <span className='px-2'>
          <CiFilter size={20} className='inline-block mr-1' />
          filter
        </span>
      </IonButton>
    </>
  );
};

export default QueryFilter;
