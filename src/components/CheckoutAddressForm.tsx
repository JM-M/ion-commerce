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
import Input from './Input';
import useCart from '../hooks/useCart';
import { addressSchema } from '../constants/schemas/checkout';

type FieldType =
  | 'country'
  | 'state'
  | 'city'
  | 'streetAddress'
  | 'additionalDetails'
  | 'zipCode';

interface Props {
  submit: Function;
  submitting: boolean;
}

const CheckoutAddressForm = ({ submit, submitting }: Props) => {
  const { rawCartValue } = useCart();
  const { address: defaultValues = {} } = rawCartValue?.checkout || {};

  const {
    handleSubmit,
    register,
    formState: { errors, touchedFields, isSubmitted },
    setValue,
    watch,
    trigger,
  } = useForm({ resolver: yupResolver(addressSchema) });
  const country = watch('country');
  const state = watch('state');
  const city = watch('city');

  useEffect(() => {
    if (Object.keys(touchedFields).length) return;
    for (const field in defaultValues) {
      if (Object.prototype.hasOwnProperty.call(defaultValues, field)) {
        setValue(field as FieldType, defaultValues[field]);
      }
    }
  }, [defaultValues, touchedFields]);

  return (
    <form
      onSubmit={handleSubmit((values) => submit(values))}
      onBlur={() => trigger()}
    >
      <CountrySelector
        register={register}
        name='country'
        label='Country'
        value={country}
        setValue={(country: string) => {
          setValue('country', country, { shouldTouch: true });
          setValue('state', '');
          setValue('city', '');
        }}
        error={(touchedFields.country || isSubmitted) && errors.country}
      />
      <StateSelector
        register={register}
        name='state'
        label='State'
        country={country}
        value={state}
        setValue={(state: string) => {
          setValue('state', state, { shouldTouch: true });
          setValue('city', '');
        }}
        error={(touchedFields.state || isSubmitted) && errors.state}
      />
      <CitySelector
        register={register}
        name='city'
        label='City'
        country={country}
        state={state}
        value={city}
        setValue={(city: string) => {
          setValue('city', city, { shouldTouch: true });
        }}
        error={(touchedFields.city || isSubmitted) && errors.city}
      />
      <Input
        label='Street address'
        labelPlacement='floating'
        {...register('streetAddress')}
        errorText={
          (touchedFields.streetAddress || isSubmitted) &&
          errors.streetAddress?.message
        }
      />
      <Input
        label='Zip/Postal code'
        labelPlacement='floating'
        {...register('zipCode')}
        errorText={
          (touchedFields.zipCode || isSubmitted) && errors.zipCode?.message
        }
      />
      <Input
        label='Additional details (optional)'
        labelPlacement='floating'
        {...register('additionalDetails')}
        errorText={
          (touchedFields.additionalDetails || isSubmitted) &&
          errors.additionalDetails?.message
        }
      />
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
