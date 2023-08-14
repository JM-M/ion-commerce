import { useIonRouter } from "@ionic/react";
import useFirestoreDocumentQuery from "./useFirestoreDocumentQuery";
import { ContactMessage } from "../constants/schemas/contactMessage";
import useAuth from "./useAuth";
import useFirestoreDocumentMutation from "./useFirestoreDocumentMutation";
import { v4 as uuidv4 } from "uuid";

const collectionName = "contactMessages";
const documentId = "contactMessages";
const useContact = () => {
  const ionRouter = useIonRouter();

  const { isLoggedIn } = useAuth();

  const contactQuery = useFirestoreDocumentQuery({
    collectionName,
    documentId,
  });
  const contact = contactQuery?.data;

  const { firestoreDocumentMutation: sendMessageMutation } =
    useFirestoreDocumentMutation({
      collectionName,
      onSuccess: () => ionRouter.push("/store"),
    });

  const sendMessage = (contactMessage: ContactMessage) => {
    if (!isLoggedIn) return;
    return sendMessageMutation.mutate({
      document: contactMessage,
      documentId: uuidv4(),
    });
  };

  return { contact, contactQuery, sendMessage, sendMessageMutation };
};

export default useContact;
