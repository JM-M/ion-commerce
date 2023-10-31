import { useIonRouter, useIonAlert } from '@ionic/react';
import useFirestoreDocumentQuery from './useFirestoreDocumentQuery';
import { ContactMessage } from '../constants/schemas/contactMessage';
import useAuth from './useAuth';
import useFirestoreDocumentMutation from './useFirestoreDocumentMutation';
import { v4 as uuidv4 } from 'uuid';

const useContact = () => {
  const ionRouter = useIonRouter();
  const [presentAlert] = useIonAlert();

  const { isLoggedIn } = useAuth();

  const contactQuery = useFirestoreDocumentQuery({
    collectionName: 'contact',
    documentId: 'contact',
  });
  const contact = contactQuery?.data;

  const { firestoreDocumentMutation: sendMessageMutation } =
    useFirestoreDocumentMutation({
      collectionName: 'contactMessages',
      onSuccess: () => {
        ionRouter.push('/store');
        presentAlert({
          header: 'Alert',
          subHeader: 'Message sent!',
          message: 'We will respond to you shortly!',
          buttons: ['OK'],
          cssClass: 'rounded-lg',
        });
      },
    });

  const sendMessage = (contactMessage: ContactMessage) => {
    if (!isLoggedIn) return;
    return sendMessageMutation.mutate({
      document: contactMessage,
      documentId: uuidv4(),
      addTimestamp: true,
    });
  };

  return { contact, contactQuery, sendMessage, sendMessageMutation };
};

export default useContact;
