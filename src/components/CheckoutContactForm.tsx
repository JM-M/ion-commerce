import { IonButton, IonSpinner } from '@ionic/react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import Input from './Input';
import PhoneInput from './PhoneInput';
import { contactSchema } from '../constants/schemas/checkout';
import useCart from '../hooks/useCart';
import useAuth from '../hooks/useAuth';
import { useEffect } from 'react';

interface Props {
  submit: Function;
  submitting: boolean;
}

const CheckoutContactForm = ({ submit, submitting }: Props) => {
  const { rawCartValue } = useCart();
  const { user, isLoggedIn } = useAuth();

  const defaultValues = rawCartValue?.checkout?.contact;

  const {
    handleSubmit,
    register,
    formState: { errors },
    setValue,
    watch,
    control,
  } = useForm({ resolver: yupResolver(contactSchema), defaultValues });

  useEffect(() => {
    if (!defaultValues) return;
    for (const field in defaultValues) {
      if (Object.prototype.hasOwnProperty.call(defaultValues, field)) {
        const value = defaultValues[field];
        if (!watch(field)) setValue(field, value);
      }
    }
  }, [defaultValues]);

  useEffect(() => {
    if (defaultValues || !isLoggedIn) return;
    setValue('firstName', user.firstName);
    setValue('lastName', user.lastName);
  }, [user, defaultValues, isLoggedIn]);

  return (
    <form onSubmit={handleSubmit((values) => submit(values))}>
      <Input
        label='First name'
        labelPlacement='floating'
        {...register('firstName')}
        errorText={errors.firstName?.message}
      />
      <Input
        label='Last name'
        labelPlacement='floating'
        {...register('lastName')}
        errorText={errors.lastName?.message}
      />
      <PhoneInput
        label='Phone number'
        aria-label='Phone number'
        name='phoneNumber'
        control={control}
        errorText={errors.phoneNumber?.message}
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

export default CheckoutContactForm;
