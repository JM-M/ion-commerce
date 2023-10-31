import { useMutation } from '@tanstack/react-query';
import { writeBatch, doc } from 'firebase/firestore';
import { db } from '../../firebase';

interface Props {
  mutationKey: any[];
}

interface Document {
  id: string;
  [x: string]: any;
}

interface Collection {
  name: string;
  documents: Document[];
}

const useMultipleFirebaseDocumentsMutation = ({ mutationKey }: Props) => {
  const setFirestoreDocuments = async ({
    collections = [],
  }: {
    collections: Collection[];
  }) => {
    const batch = writeBatch(db);
    for (const collection of collections) {
      const { name, documents = [] } = collection;
      for (const document of documents) {
        const docRef = doc(db, name, document.id);
        batch.set(docRef, document);
      }
    }
    await batch.commit();
  };

  const multipleFirestoreDocumentsMutation = useMutation({
    mutationKey,
    mutationFn: setFirestoreDocuments,
  });

  return { multipleFirestoreDocumentsMutation };
};

export default useMultipleFirebaseDocumentsMutation;
