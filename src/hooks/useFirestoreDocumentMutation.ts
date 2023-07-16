import { useQueryClient, useMutation } from '@tanstack/react-query';
import { doc, setDoc, Timestamp } from 'firebase/firestore';
import { db } from '../../firebase';

const useFirestoreDocumentMutation = ({
  collectionName,
  onSuccess = () => null,
  invalidateCollectionQuery = true,
  invalidateDocumentQuery = true,
}: {
  collectionName: string;
  onSuccess?: Function;
  invalidateCollectionQuery?: boolean;
  invalidateDocumentQuery?: boolean;
}) => {
  const queryClient = useQueryClient();

  const uploadToFirestore = async ({
    document,
    documentId,
    addTimestamp = false,
  }: {
    document: any;
    documentId: string;
    addTimestamp?: boolean;
  }) => {
    const docRef = doc(db, collectionName, documentId);
    let formattedDocument = document;
    if (addTimestamp && !document.createdAt) {
      const createdAt = Timestamp.fromDate(new Date());
      formattedDocument = { ...document, createdAt };
    }
    await setDoc(docRef, formattedDocument);
    return { data: formattedDocument, documentId };
  };

  const firestoreDocumentMutation = useMutation({
    mutationKey: ['upload-to-collection', collectionName],
    mutationFn: uploadToFirestore,
    onSuccess: ({ data, documentId }) => {
      onSuccess(data);
      if (invalidateCollectionQuery) {
        queryClient.invalidateQueries(['collection', collectionName]);
      }
      if (invalidateDocumentQuery) {
        queryClient.invalidateQueries([
          'document',
          { collectionName, documentId },
        ]);
      }
    },
  });

  return { firestoreDocumentMutation };
};

export default useFirestoreDocumentMutation;
