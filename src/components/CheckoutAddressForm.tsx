import { useEffect } from 'react';
import {
  IonItem,
  IonInput,
  IonButton,
  IonTextarea,
  IonSpinner,
} from '@ionic/react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import cx from 'classnames';
import CountrySelector from './CountrySelector';
import StateSelector from './StateSelector';
import CitySelector from './CitySelector';
import useCart from '../hooks/useCart';
import { addressSchema } from '../constants/schemas/checkout';

type FieldType =
  | 'country'
  | 'state'
  | 'city'
  | 'streetAddress'
  | 'additionalDetails';

interface Props {
  submit: Function;
  submitting: boolean;
}

const CheckoutAddressForm = ({ submit, submitting }: Props) => {
  const { rawCartValue } = useCart();
  const defaultValues = rawCartValue?.checkout?.address || {};

  const {
    handleSubmit,
    register,
    formState: { errors, touchedFields },
    setValue,
    watch,
  } = useForm({ resolver: yupResolver(addressSchema) });

  useEffect(() => {
    for (const field in defaultValues) {
      if (Object.prototype.hasOwnProperty.call(defaultValues, field)) {
        setValue(field as FieldType, defaultValues[field]);
      }
    }
  }, [defaultValues]);

  const country = watch('country');
  const state = watch('state');
  const city = watch('city');

  return (
    <form onSubmit={handleSubmit((values) => submit(values))}>
      <CountrySelector
        register={register}
        name='country'
        label='Country'
        value={country}
        setValue={(country: string) => {
          setValue('country', country);
          setValue('state', '');
          setValue('city', '');
        }}
        error={errors.country}
      />
      <StateSelector
        register={register}
        name='state'
        label='State'
        country={country}
        value={state}
        setValue={(state: string) => {
          setValue('state', state);
          setValue('city', '');
        }}
        error={errors.state}
      />
      <CitySelector
        register={register}
        name='city'
        label='City'
        country={country}
        state={state}
        value={city}
        setValue={(city: string) => setValue('city', city)}
        error={errors.city}
      />
      <IonItem
        className={cx({
          'ion-invalid': !!errors?.streetAddress,
          'ion-valid': !errors?.streetAddress,
        })}
      >
        <IonInput
          label='Street address'
          aria-label='Street address'
          labelPlacement='floating'
          {...register('streetAddress')}
          errorText={(errors?.streetAddress?.message || '') as string}
        />
      </IonItem>
      <IonItem
        className={cx({
          'ion-invalid': !!errors?.additionalDetails,
          'ion-valid': !errors?.additionalDetails,
        })}
      >
        <IonTextarea
          label='Additional details (optional)'
          aria-label='Additional details (optional)'
          labelPlacement='floating'
          {...register('additionalDetails')}
          errorText={(errors?.additionalDetails?.message || '') as string}
          autoGrow
        />
      </IonItem>
      <IonButton
        id='checkoutFormButton'
        className='h-[50px] mt-[30px]'
        type='submit'
        expand='block'
        disabled={submitting}
      >
        {submitting && <IonSpinner name='dots' className='inline-block mr-3' />}
        Continue
      </IonButton>
    </form>
  );
};

export default CheckoutAddressForm;
