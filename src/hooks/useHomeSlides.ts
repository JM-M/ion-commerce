import useFirestoreCollectionQuery from './useFirestoreCollectionQuery';

export interface HomeSlide {
  id: string;
  image: string;
  button: boolean;
  buttonText?: string;
  buttonHref?: string;
}

const collectionName = 'homeSlides';
const useHomeSlides = () => {
  const homeSlidesQuery = useFirestoreCollectionQuery({
    collectionName,
    options: { pageSize: 1000 },
  });
  const homeSlides = homeSlidesQuery.data?.docs;
  return { homeSlidesQuery, homeSlides };
};

export default useHomeSlides;
