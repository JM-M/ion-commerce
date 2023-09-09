import ProductSection from './ProductSection';
import ProductSectionSkeleton from './skeletons/ProductGridSkeleton';
import HomeProductSectionSkeleton from './skeletons/HomeProductSectionSkeleton';
import PageLoader from './PageLoader';
import useProductSections from '../hooks/useProductSections';
import { DatabaseProductSection } from '../hooks/useProductSections';

const HomeProductSections = () => {
  const { productSectionsQuery } = useProductSections();
  const { isLoading, isError, data: sections } = productSectionsQuery;

  if (isLoading) return <HomeProductSectionSkeleton />;
  if (isError) return <>An error occurred</>;
  if (!sections) return <>No data</>;
  if (!Array.isArray(sections)) return <>sections is not an array</>;

  return (
    <>
      {sections.map((section: DatabaseProductSection, index: number) => {
        return <ProductSection key={index} section={section} />;
      })}
    </>
  );
};

export default HomeProductSections;
