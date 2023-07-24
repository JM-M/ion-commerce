import { useState, useEffect } from 'react';
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
} from 'firebase/auth';
import { Timestamp } from 'firebase/firestore';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { auth } from '../../firebase';
import { UserLogin, UserSignUp } from '../constants/schemas/auth';
import useFirestoreDocumentMutation from './useFirestoreDocumentMutation';
import useFirestoreDocumentQuery from './useFirestoreDocumentQuery';
import useAuthModal from './useAuthModal';

interface UserFirestoreDocument {
  email: string;
  firstName: string;
  lastName: string;
  uid: string;
  createdAt?: Timestamp;
}

const useAuth = () => {
  const [uid, setUid] = useState<string>('');

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setUid(user.uid);
      } else {
        setUid('');
      }
    });
  }, []);

  const queryClient = useQueryClient();

  const { closeAuthModal } = useAuthModal();

  const { data: user } = useFirestoreDocumentQuery({
    collectionName: 'users',
    documentId: uid,
  });

  const { firestoreDocumentMutation: createUserDocMutation } =
    useFirestoreDocumentMutation({
      collectionName: 'users',
      invalidateCollectionQuery: false,
      invalidateDocumentQuery: false,
    });

  const saveCreatedUserToFirestore = (userDoc: UserFirestoreDocument) => {
    const { uid } = userDoc;
    return createUserDocMutation.mutateAsync({
      document: userDoc,
      documentId: uid,
      addTimestamp: true,
    });
  };

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

  const loginFn = async ({ email, password }: UserLogin) => {
    await signInWithEmailAndPassword(auth, email, password);
  };

  const loginMutation = useMutation({
    mutationKey: ['user-sign-in'],
    mutationFn: loginFn,
    onSuccess: closeAuthModal,
  });

  const logOutFn = async () => {
    await signOut(auth);
  };

  const logOutMutation = useMutation({
    mutationKey: ['user-log-out'],
    mutationFn: logOutFn,
  });

  return {
    createUser: createUserMutation.mutate,
    createUserMutation,
    user: user as UserFirestoreDocument,
    uid,
    isLoggedIn: !!uid,
    login: loginMutation.mutate,
    loginMutation,
    logOut: logOutMutation.mutate,
    logOutMutation,
  };
};

export default useAuth;
