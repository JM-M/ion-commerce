import ProductSection from './ProductSection';
import PageLoader from './PageLoader';
import useProductSections from '../hooks/useProductSections';
import { DatabaseProductSection } from '../hooks/useProductSections';

const HomeProductSections = () => {
  const { productSectionsQuery } = useProductSections();
  const { isLoading, isError, data: sections } = productSectionsQuery;

  if (isLoading) return <PageLoader />;
  if (isError) return <>An error occurred</>;
  if (!sections) return <>No data</>;
  if (!Array.isArray(sections)) return <>sections is not an array</>;

  return (
    <>
      {sections.map((section: DatabaseProductSection, index: number) => {
        return <ProductSection key={index} {...section} />;
      })}
    </>
  );
};

export default HomeProductSections;
