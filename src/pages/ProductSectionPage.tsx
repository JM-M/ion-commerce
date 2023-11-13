import { RouteComponentProps } from 'react-router';
import PageHeader from '../components/PageHeader';
import useProductSections from '../hooks/useProductSections';
import ProductSection from '../components/ProductSection';
import Footer from '../components/Footer';

interface Props
  extends RouteComponentProps<{
    sectionId: string;
  }> {}

const ProductSectionPage: React.FC<Props> = ({ match }) => {
  const { sectionId } = match.params;

  const { productSectionQuery } = useProductSections({
    productSectionId: sectionId,
  });
  const { isLoading, data } = productSectionQuery;

  return (
    <>
      <PageHeader loading={isLoading}>{data?.title}</PageHeader>
      <div className='-mt-5'>
        <ProductSection section={data} loading={isLoading} noHeader />
      </div>
      <Footer />
    </>
  );
};

export default ProductSectionPage;
