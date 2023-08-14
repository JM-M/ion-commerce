import { useState, useEffect } from "react";
import { useIonRouter } from "@ionic/react";
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
  reauthenticateWithCredential,
  EmailAuthProvider,
  User,
  updatePassword,
} from "firebase/auth";
import { Timestamp } from "firebase/firestore";
import axios from "axios";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { auth } from "../../firebase";
import { UserLogin, UserSignUp } from "../constants/schemas/auth";
import useFirestoreDocumentMutation from "./useFirestoreDocumentMutation";
import useFirestoreDocumentQuery from "./useFirestoreDocumentQuery";
import useAuthModal from "./useAuthModal";

export interface UserFirestoreDocument {
  email: string;
  firstName: string;
  lastName: string;
  uid: string;
  createdAt?: Timestamp;
}

const useAuth = () => {
  const [firebaseAuthUser, setFirebaseAuthUser] = useState<User | null>();
  const [autoAuthenticating, setAutoAuthenticating] = useState<boolean>(true);
  const { uid } = firebaseAuthUser || {};

  const ionRouter = useIonRouter();

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      setAutoAuthenticating(false);
      setFirebaseAuthUser(user);
    });
  }, []);

  const queryClient = useQueryClient();

  const { closeAuthModal } = useAuthModal();

  const saveUserRecordToAlgolia = async (userDoc: UserFirestoreDocument) => {
    const { uid, ...rest } = userDoc;
    const record = { ...rest, objectID: uid };
    await axios.post(
      `${import.meta.env.VITE_DEV_BACKEND_API_ENDPOINT}/algolia/users`,
      record
    );
  };

  const { firestoreDocumentMutation: userDocMutation } =
    useFirestoreDocumentMutation({
      collectionName: "users",
      invalidateCollectionQuery: false,
      invalidateDocumentQuery: false,
    });

  const saveCreatedUserToFirestore = (userDoc: UserFirestoreDocument) => {
    const { uid } = userDoc;
    return userDocMutation.mutateAsync({
      document: userDoc,
      documentId: uid,
      addTimestamp: true,
    });
  };

  const synchronizeAuthUserWithUserDoc = (userDoc: UserFirestoreDocument) => {
    if (!uid) return;
    const authEmail = firebaseAuthUser?.email;
    const userDocEmail = userDoc.email;
    if (userDocEmail !== authEmail) {
      userDocMutation.mutateAsync({
        document: { ...userDoc, email: authEmail },
        documentId: uid,
        addTimestamp: true,
      });
    }
  };

  const { data: user } = useFirestoreDocumentQuery({
    collectionName: "users",
    documentId: uid,
    onSuccess: synchronizeAuthUserWithUserDoc,
  });
  const isLoggedIn = !!(uid && user);

  const createUserFn = async ({
    email,
    password,
    firstName,
    lastName,
  }: UserSignUp) => {
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    const uid = userCredential.user.uid;
    const { data: userDoc } = await saveCreatedUserToFirestore({
      uid,
      email: userCredential.user.email as string,
      firstName,
      lastName,
    });
    await saveUserRecordToAlgolia(userDoc);
    return userDoc;
  };

  const onCreateUser = (user: UserFirestoreDocument) => {
    queryClient.setQueryData(
      ["document", { collectionName: "users", documentId: user.uid }],
      user
    );
    closeAuthModal();
  };

  const createUserMutation = useMutation({
    mutationKey: ["create-user-doc"],
    mutationFn: createUserFn,
    onSuccess: onCreateUser, // set userDoc query
  });

  const loginFn = async ({ email, password }: UserLogin) => {
    await signInWithEmailAndPassword(auth, email, password);
  };

  const loginMutation = useMutation({
    mutationKey: ["user-sign-in"],
    mutationFn: loginFn,
    onSuccess: closeAuthModal,
  });

  const reAuthenticate = async ({ email, password }: UserLogin) => {
    if (!isLoggedIn) return;
    const credential = EmailAuthProvider.credential(email, password);
    const response = await reauthenticateWithCredential(
      auth.currentUser!,
      credential
    );
    return response;
  };

  const reAuthenticateMutation = useMutation({
    mutationKey: ["re-authenticate-user"],
    mutationFn: reAuthenticate,
  });

  const updatePasswordFn = async (password: string) => {
    if (!isLoggedIn) return;
    const response = await updatePassword(auth.currentUser!, password);
    return response;
  };

  const updatePasswordMutation = useMutation({
    mutationKey: ["update-user-password"],
    mutationFn: updatePasswordFn,
    onSuccess: () => ionRouter.push("/account"),
  });

  const logOutFn = async () => {
    await signOut(auth);
  };

  const onLogOut = () => {
    queryClient.setQueryData(
      ["document", { collectionName: "users", documentId: uid }],
      [],
      undefined
    );
    setFirebaseAuthUser(null);
  };

  const logOutMutation = useMutation({
    mutationKey: ["user-log-out"],
    mutationFn: logOutFn,
    onSuccess: onLogOut,
  });

  return {
    createUser: createUserMutation.mutate,
    createUserMutation,
    saveUserRecordToAlgolia,
    user: user as UserFirestoreDocument,
    uid,
    isLoggedIn,
    login: loginMutation.mutate,
    loginMutation,
    logOut: logOutMutation.mutate,
    logOutMutation,
    autoAuthenticating,
    reAuthenticate: reAuthenticateMutation.mutate,
    reAuthenticateMutation,
    reAuthenticated: reAuthenticateMutation.status === "success",
    updatePassword: updatePasswordMutation.mutate,
    updatePasswordMutation,
  };
};

export default useAuth;
