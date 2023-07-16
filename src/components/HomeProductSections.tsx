import ProductSection from './ProductSection';
import useProductSections from '../hooks/useProductSections';
import { DatabaseProductSection } from '../hooks/useProductSections';

const HomeProductSections = () => {
  const { productSectionsQuery } = useProductSections();
  const { isLoading, isError, data: sections } = productSectionsQuery;

  if (isLoading) return <>Loading...</>;
  if (isError) return <>An error occurred</>;
  if (!sections) return <>No data</>;
  if (!Array.isArray(sections)) return <>sections is not an array</>;

  return (
    <>
      {sections.map((section: DatabaseProductSection, index: number) => {
        const { title, products, id = '' } = section;
        return (
          <ProductSection
            key={index}
            title={title}
            productIds={products}
            id={id}
            fullPageHref='#'
          />
        );
      })}
    </>
  );
};

export default HomeProductSections;
