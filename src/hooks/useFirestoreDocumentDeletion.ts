import { useQueryClient, useMutation } from "@tanstack/react-query";
import { doc, deleteDoc } from "firebase/firestore";
import { db } from "../../firebase";

const useFirestoreDocumentDeletion = ({
  collectionName,
  documentIds = [],
  onSuccess = () => null,
}: {
  collectionName: string;
  documentIds: string[];
  onSuccess?: Function;
}) => {
  // const queryClient = useQueryClient();

  const deleteFromFirestore = async () => {
    for (let i = 0; i < documentIds.length; i++) {
      const id = documentIds[i];
      const docRef = doc(db, collectionName, id);
      await deleteDoc(docRef);
    }
    return null;
  };

  const firestoreDocumentDeletion = useMutation({
    mutationKey: ["delete-from-collection", collectionName],
    mutationFn: deleteFromFirestore,
    onSuccess: (data) => {
      onSuccess(data);
    },
  });

  return { firestoreDocumentDeletion };
};

export default useFirestoreDocumentDeletion;
