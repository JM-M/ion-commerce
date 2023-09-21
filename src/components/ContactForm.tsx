import { useEffect } from 'react';
import { IonButton, IonIcon, IonItem, IonTextarea } from '@ionic/react';
import { callOutline, logoWhatsapp, sendOutline } from 'ionicons/icons';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import cx from 'classnames';
import PageLoader from './PageLoader';
import Input from './Input';
import PhoneInput from './PhoneInput';
import Button from './Button';
import useContact from '../hooks/useContact';
import contactMessageSchema, {
  ContactMessage,
} from '../constants/schemas/contactMessage';
import useAuth from '../hooks/useAuth';
import useAuthModal from '../hooks/useAuthModal';

const ContactForm = () => {
  const { user, autoAuthenticating } = useAuth();
  const { openAuthModal } = useAuthModal();

  const { contact, contactQuery, sendMessage, sendMessageMutation } =
    useContact();

  const {
    handleSubmit,
    register,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(contactMessageSchema),
  });

  useEffect(() => {
    if (!user) {
      if (!autoAuthenticating) openAuthModal('login');
      return;
    }
    const { uid, firstName, lastName, email } = user;
    setValue('user.uid', uid);
    setValue('user.firstName', firstName);
    setValue('user.lastName', lastName);
    setValue('user.email', email);
  }, [user, autoAuthenticating]);

  const submit = (contactMessage: ContactMessage) => {
    sendMessage(contactMessage);
  };

  if (contactQuery.isLoading) return <PageLoader />;

  return (
    <>
      <div className='flex items-center gap-3'>
        {contact?.whatsapp && (
          <a
            href={`https://wa.me/+${contact.whatsapp}`}
            target='_blank'
            className='flex-1 block'
          >
            <IonButton fill='outline' color='success' className='w-full'>
              <IonIcon icon={logoWhatsapp} slot='start' />
              Whatsapp
            </IonButton>
          </a>
        )}
        {contact?.phone && (
          <a
            href={`tel:${contact.phone}`}
            target='_blank'
            className='flex-1 block'
          >
            <IonButton fill='outline' className='w-full'>
              <IonIcon icon={callOutline} slot='start' />
              Call
            </IonButton>
          </a>
        )}
      </div>
      {contact && (
        <div className='my-5 text-xs text-[var(--ion-color-medium)] text-center'>
          Or with email or phone number
        </div>
      )}
      <form onSubmit={handleSubmit(submit)}>
        <IonItem
          className={cx({
            'ion-invalid': !!errors.message,
            'ion-valid': !errors.message,
          })}
        >
          <IonTextarea
            label='Message'
            labelPlacement='floating'
            {...register('message')}
            errorText={errors.message?.message as any}
            autoGrow
          />
        </IonItem>
        <Button
          id='checkoutFormButton'
          color='primary'
          className='h-[50px] mt-[30px]'
          type='submit'
          expand='block'
          loading={sendMessageMutation.isLoading}
        >
          <span className='mr-auto'>Send</span>
          <IonIcon icon={sendOutline} slot='end' />
        </Button>
      </form>
    </>
  );
};

export default ContactForm;
