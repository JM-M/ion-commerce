import { useState, useEffect, useMemo, useCallback } from 'react';
import { useIonRouter } from '@ionic/react';
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
  reauthenticateWithCredential,
  EmailAuthProvider,
  User,
  updatePassword,
  sendPasswordResetEmail,
  GoogleAuthProvider,
  signInWithPopup,
} from 'firebase/auth';
import { Timestamp, doc, getDoc } from 'firebase/firestore';
import axios from 'axios';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { auth, db } from '../../firebase';
import { UserLogin, UserSignUp } from '../constants/schemas/auth';
import useFirestoreDocumentMutation from './useFirestoreDocumentMutation';
import useFirestoreDocumentQuery from './useFirestoreDocumentQuery';
import useAuthModal from './useAuthModal';

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

  const provider = useMemo(() => new GoogleAuthProvider(), []);

  const ionRouter = useIonRouter();

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      setFirebaseAuthUser(user);
      if (!user) setAutoAuthenticating(false);
    });
    auth.useDeviceLanguage();
  }, []);

  const queryClient = useQueryClient();

  const { closeAuthModal } = useAuthModal();

  const saveUserRecordToAlgolia = async (userDoc: UserFirestoreDocument) => {
    const { uid, ...rest } = userDoc;
    const record = { ...rest, objectID: uid };
    await axios.post(
      `${import.meta.env.VITE_BACKEND_URL}/save-user-record`,
      record
    );
  };

  const saveUserRecordToAlgoliaMutation = useMutation({
    mutationKey: ['save-user-record-to-algolia'],
    mutationFn: saveUserRecordToAlgolia,
  });

  const { firestoreDocumentMutation: userDocMutation } =
    useFirestoreDocumentMutation({
      collectionName: 'users',
      invalidateCollectionQuery: true,
      invalidateDocumentQuery: true,
    });

  const saveCreatedUserToFirestore = useCallback(
    (userDoc: UserFirestoreDocument) => {
      const { uid } = userDoc;
      return userDocMutation.mutateAsync({
        document: userDoc,
        documentId: uid,
        addTimestamp: true,
      });
    },
    [userDocMutation]
  );

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

  const userDocQuery = useFirestoreDocumentQuery({
    collectionName: 'users',
    documentId: uid,
    onSuccess: synchronizeAuthUserWithUserDoc,
  });
  const { data: user, ...rest } = userDocQuery;
  const isLoggedIn = !!uid;

  // using an effect ensures that autoAuthenticating is only turned to false when user state has been set
  useEffect(() => {
    if (user && autoAuthenticating) setAutoAuthenticating(false);
  }, [user, autoAuthenticating]);

  // update user document if it does'nt exist
  useEffect(() => {
    const loadingUserDoc = userDocQuery.isLoading;
    let userDoc = userDocQuery.data;
    const mutatingUserDoc = userDocMutation.isLoading;
    if (loadingUserDoc || !firebaseAuthUser || userDoc || mutatingUserDoc) {
      return;
    }
    const { uid, email, displayName } = firebaseAuthUser;
    userDoc = {
      uid,
      email: email as string,
      firstName: displayName as string,
      lastName: '',
    };
    saveCreatedUserToFirestore(userDoc);
    saveUserRecordToAlgoliaMutation.mutate(userDoc);
  }, [
    firebaseAuthUser,
    userDocQuery.isLoading,
    userDocQuery.data,
    userDocMutation.isLoading,
    saveCreatedUserToFirestore,
    saveUserRecordToAlgoliaMutation,
  ]);

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
    return userCredential as any;
  };

  const onCreateUser = (user: UserFirestoreDocument) => {
    queryClient.setQueryData(
      ['document', { collectionName: 'users', documentId: user.uid }],
      user
    );
    closeAuthModal();
  };

  const createUserMutation = useMutation({
    mutationKey: ['create-user-doc'],
    mutationFn: createUserFn,
    onSuccess: onCreateUser, // set userDoc query
  });

  const onLoginFail = async (errorText = 'User not found') => {
    await signOut(auth);
    const error: any = new Error();
    error.code = errorText;
    throw error;
  };

  const loginFn = async ({ email, password }: UserLogin) => {
    const res = await signInWithEmailAndPassword(auth, email, password);
    const uid = res?.user?.uid;
    if (!uid) return onLoginFail();
  };

  const loginMutation = useMutation({
    mutationKey: ['user-sign-in'],
    mutationFn: loginFn,
    onSuccess: closeAuthModal,
  });

  const loginWithGoogle = async () => {
    try {
      await signInWithPopup(auth, provider);
      closeAuthModal();
    } catch (error) {
      const errorObject = error as any;
      const errorMessage = errorObject?.message;
      return onLoginFail(errorMessage);
    }
  };

  const loginWithGoogleMutation = useMutation({
    mutationKey: ['login-with-google'],
    mutationFn: loginWithGoogle,
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
    mutationKey: ['re-authenticate-user'],
    mutationFn: reAuthenticate,
  });

  const updatePasswordFn = async (password: string) => {
    if (!isLoggedIn) return;
    const response = await updatePassword(auth.currentUser!, password);
    return response;
  };

  const updatePasswordMutation = useMutation({
    mutationKey: ['update-user-password'],
    mutationFn: updatePasswordFn,
    onSuccess: () => ionRouter.push('/account'),
  });

  const logOutFn = async () => {
    signOut(auth);
  };

  const onLogOut = () => {
    queryClient.setQueryData(
      ['document', { collectionName: 'users', documentId: uid }],
      undefined
    );
    setFirebaseAuthUser(null);
  };

  const sendPasswordResetEmailFn = async (email: string) => {
    try {
      await sendPasswordResetEmail(auth, email);
      return email;
    } catch (error: any) {
      throw new Error(error);
    }
  };

  const sendPasswordResetEmailMutation = useMutation({
    mutationKey: ['send-password-reset-email'],
    mutationFn: sendPasswordResetEmailFn,
    onSuccess: (email) => {
      if (email) ionRouter.push(`/forgot-password/sent?email=${email}`);
    },
  });

  const logOutMutation = useMutation({
    mutationKey: ['user-log-out'],
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
    loginWithGoogle,
    loginWithGoogleMutation,
    logOut: logOutMutation.mutate,
    logOutMutation,
    autoAuthenticating,
    reAuthenticate: reAuthenticateMutation.mutate,
    reAuthenticateMutation,
    reAuthenticated: reAuthenticateMutation.status === 'success',
    updatePassword: updatePasswordMutation.mutate,
    updatePasswordMutation,
    sendPasswordResetEmail: sendPasswordResetEmailMutation.mutate,
    sendPasswordResetEmailMutation,
  };
};

export default useAuth;
