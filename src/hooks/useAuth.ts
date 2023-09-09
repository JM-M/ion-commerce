import { useState, useEffect } from 'react';
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

  const ionRouter = useIonRouter();

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      setFirebaseAuthUser(user);
      if (!user) setAutoAuthenticating(false);
    });
  }, []);

  const queryClient = useQueryClient();

  const { closeAuthModal } = useAuthModal();

  const saveUserRecordToAlgolia = async (userDoc: UserFirestoreDocument) => {
    const { uid, ...rest } = userDoc;
    const record = { ...rest, objectID: uid };
    await axios.post(
      `${import.meta.env.VITE_BACKEND_URL}/algolia/users`,
      record
    );
  };

  const { firestoreDocumentMutation: userDocMutation } =
    useFirestoreDocumentMutation({
      collectionName: 'users',
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

  const { data: user, ...rest } = useFirestoreDocumentQuery({
    collectionName: 'users',
    documentId: uid,
    onSuccess: synchronizeAuthUserWithUserDoc,
  });
  const isLoggedIn = !!uid;
  // console.log(user, rest);

  // using an effect ensures that autoAuthenticating is only turned to false when user state has been set
  useEffect(() => {
    if (user && autoAuthenticating) setAutoAuthenticating(false);
  }, [user, autoAuthenticating]);

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
    const docRef = doc(db, 'users', uid);
    const docSnap = await getDoc(docRef);
    if (!docSnap.exists()) return onLoginFail();
    const user = { ...docSnap.data(), id: uid } as any;
    queryClient.setQueryData(
      ['document', { collectionName: 'users', documentId: uid }],
      user
    );
  };

  const loginMutation = useMutation({
    mutationKey: ['user-sign-in'],
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
      [],
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
