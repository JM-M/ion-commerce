import { useQueryClient, useMutation } from '@tanstack/react-query';
import { doc, deleteDoc } from 'firebase/firestore';
import { db } from '../../firebase';

interface Props {
  collectionName: string;
  documentIds: string[];
  onSuccess?: Function;
  invalidateCollectionQuery?: boolean;
  invalidateDocumentQuery?: boolean;
}

const useFirestoreDocumentDeletion = ({
  collectionName,
  documentIds = [],
  onSuccess = () => null,
  invalidateCollectionQuery = true,
  invalidateDocumentQuery = true,
}: Props) => {
  const queryClient = useQueryClient();

  const deleteFromFirestore = async () => {
    for (let i = 0; i < documentIds.length; i++) {
      const id = documentIds[i];
      const docRef = doc(db, collectionName, id);
      await deleteDoc(docRef);
    }
    return null;
  };

  const firestoreDocumentDeletion = useMutation({
    mutationKey: ['delete-from-collection', collectionName],
    mutationFn: deleteFromFirestore,
    onSuccess: (data) => {
      onSuccess(data);
      if (invalidateCollectionQuery) {
        queryClient.invalidateQueries(['collection', collectionName]);
      }
      if (invalidateDocumentQuery) {
        for (let i = 0; i < documentIds.length; i++) {
          const documentId = documentIds[i];
          queryClient.invalidateQueries([
            'document',
            { collectionName, documentId },
          ]);
        }
      }
    },
  });

  return { firestoreDocumentDeletion };
};

export default useFirestoreDocumentDeletion;
