import { IonSkeletonText } from '@ionic/react';
import OrderAddress from './OrderAddress';
import {
  CheckoutAddress,
  CheckoutContact,
} from '../constants/schemas/checkout';

interface Props {
  email: string;
  contact: CheckoutContact;
  address: CheckoutAddress;
  loading?: boolean;
}

const OrderInfo = ({ contact, email, address, loading = false }: Props) => {
  const { firstName, lastName, phoneNumber } = contact || {};
  const fullName = `${firstName} ${lastName}`;

  return (
    <>
      <div className='flex'>
        <div className='flex-1'>
          <h5 className='font-medium mb-1 text-[var(--ion-color-medium)]'>
            {loading ? (
              <IonSkeletonText
                animated={true}
                className='block h-full w-1/3 mb-2 ion-no-padding ion-no-margin rounded-md'
              ></IonSkeletonText>
            ) : (
              'Full Name'
            )}
          </h5>
          <span>
            {loading ? (
              <IonSkeletonText
                animated={true}
                className='block w-2/3 ion-no-padding ion-no-margin rounded-md'
              ></IonSkeletonText>
            ) : (
              fullName
            )}
          </span>
        </div>
        <div className='flex-1'>
          <h5 className='font-medium mb-1 text-[var(--ion-color-medium)]'>
            {loading ? (
              <IonSkeletonText
                animated={true}
                className='block h-full w-1/3 mb-2 ion-no-padding ion-no-margin rounded-md'
              ></IonSkeletonText>
            ) : (
              'Phone Number'
            )}
          </h5>
          <span>
            {loading ? (
              <IonSkeletonText
                animated={true}
                className='block w-5/6 ion-no-padding ion-no-margin rounded-md'
              ></IonSkeletonText>
            ) : (
              `+${phoneNumber}`
            )}
          </span>
        </div>
      </div>
      <div className='mt-5'>
        <h5 className='font-medium mb-1 text-[var(--ion-color-medium)]'>
          {loading ? (
            <IonSkeletonText
              animated={true}
              className='block h-full w-1/3 mb-2 ion-no-padding ion-no-margin rounded-md'
            ></IonSkeletonText>
          ) : (
            'Email'
          )}
        </h5>
        <span>
          {loading ? (
            <IonSkeletonText
              animated={true}
              className='block h-full w-1/2 ion-no-padding ion-no-margin rounded-md'
            ></IonSkeletonText>
          ) : (
            email
          )}
        </span>
      </div>
      <div className='mt-5 mb-16'>
        <h5 className='font-medium mb-1 text-[var(--ion-color-medium)]'>
          {loading ? (
            <IonSkeletonText
              animated={true}
              className='block h-full w-1/3 mb-2 ion-no-padding ion-no-margin rounded-md'
            ></IonSkeletonText>
          ) : (
            'Address'
          )}
        </h5>
        <OrderAddress address={address} loading={loading} />
      </div>
    </>
  );
};

export default OrderInfo;
