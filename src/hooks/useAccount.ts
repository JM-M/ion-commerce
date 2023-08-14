import { useIonRouter } from "@ionic/react";
import { useMutation } from "@tanstack/react-query";
import { updateEmail } from "@firebase/auth";
import { auth } from "../../firebase";
import { AccountEmail, AccountName } from "../constants/schemas/account";
import useFirestoreDocumentMutation from "./useFirestoreDocumentMutation";
import useAuth from "./useAuth";

const useAccount = () => {
  const ionRouter = useIonRouter();

  const { user, isLoggedIn, saveUserRecordToAlgolia } = useAuth();
  const { uid } = user || {};

  const { firestoreDocumentMutation: userDocMutation } =
    useFirestoreDocumentMutation({
      collectionName: "users",
      invalidateCollectionQuery: true,
      invalidateDocumentQuery: true,
    });

  const updateNameFn = async (name: AccountName) => {
    if (!isLoggedIn) return;
    const userDoc = { ...user, ...name };
    const response = await userDocMutation.mutateAsync({
      document: userDoc,
      documentId: uid,
      addTimestamp: true,
    });
    return response;
  };

  const nameUpdateMutation = useMutation({
    mutationKey: ["update-account-name"],
    mutationFn: updateNameFn,
    onSuccess: () => ionRouter.push("/account"),
  });

  const updateFirebaseUserEmail = async (email: string) => {
    if (!isLoggedIn) return;
    const response = await updateEmail(auth.currentUser!, email);
    return response;
  };

  const updateEmailFn = async (values: AccountEmail) => {
    if (!isLoggedIn) return;
    const { email } = values;
    await updateFirebaseUserEmail(email);
    const userDoc = { ...user, email };
    const response = await userDocMutation.mutateAsync({
      document: userDoc,
      documentId: uid,
      addTimestamp: true,
    });
    await saveUserRecordToAlgolia(userDoc);
    return response;
  };

  const emailUpdateMutation = useMutation({
    mutationKey: ["update-account-email"],
    mutationFn: updateEmailFn,
  });

  return {
    updateAccountName: nameUpdateMutation.mutate,
    nameUpdateMutation,
    updateAccountEmail: emailUpdateMutation.mutate,
    emailUpdateMutation,
  };
};

export default useAccount;
