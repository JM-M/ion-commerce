import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import Input from './Input';
import Button from './Button';
import useAuth from '../hooks/useAuth';
import { UserLogin, userLoginSchema } from '../constants/schemas/auth';
import { useEffect } from 'react';
import useAuthModal from '../hooks/useAuthModal';

const ReAuthenticationForm = () => {
  const { reAuthenticate, reAuthenticateMutation, reAuthenticated, user } =
    useAuth();
  const { closeAuthModal } = useAuthModal();

  useEffect(() => {
    if (reAuthenticated) closeAuthModal();
  }, [reAuthenticated, closeAuthModal]);

  const {
    handleSubmit,
    register,
    formState: { errors },
    setValue,
  } = useForm({ resolver: yupResolver(userLoginSchema) });

  useEffect(() => {
    if (!user) return;
    const { email } = user;
    setValue('email', email);
  }, [user]);

  const submit = (values: UserLogin) => {
    reAuthenticate(values);
  };

  const reAuthenticating = reAuthenticateMutation.isLoading;

  return (
    <div className='container flex flex-col justify-center'>
      <h2 className='font-medium text-lg text-center'></h2>
      <h2 className='mb-10 font-medium text-lg text-center'>
        Confirm your account
      </h2>
      <form onSubmit={handleSubmit(submit)}>
        <Input
          type='email'
          label='Email'
          labelPlacement='floating'
          {...register('email')}
          errorText={errors.email?.message}
        />
        <Input
          type='password'
          label='Password'
          labelPlacement='floating'
          {...register('password')}
          errorText={errors.password?.message}
        />
        <Button
          id='checkoutFormButton'
          className='h-[50px] mt-[30px]'
          type='submit'
          expand='block'
          loading={reAuthenticating}
        >
          Confirm
        </Button>
      </form>
    </div>
  );
};

export default ReAuthenticationForm;
