import useFirestoreDocumentQuery from "./useFirestoreDocumentQuery";

interface About {
  text: string;
}

const collectionName = "about";
const documentId = "about";
const useAbout = () => {
  const aboutQuery = useFirestoreDocumentQuery({
    collectionName,
    documentId,
  });
  const about = aboutQuery?.data;

  return { about, aboutQuery };
};

export default useAbout;
