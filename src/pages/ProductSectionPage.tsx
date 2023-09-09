import { RouteComponentProps } from 'react-router';
import { useIonRouter } from '@ionic/react';
import PageHeader from '../components/PageHeader';
import useProductSections from '../hooks/useProductSections';
import PageLoader from '../components/PageLoader';
import ProductSection from '../components/ProductSection';

interface Props
  extends RouteComponentProps<{
    sectionId: string;
  }> {}

const ProductSectionPage: React.FC<Props> = ({ match }) => {
  const ionRouter = useIonRouter();
  const { canGoBack, goBack, push } = ionRouter;

  const { sectionId } = match.params;

  const { productSectionQuery } = useProductSections({
    productSectionId: sectionId,
  });
  const { isLoading, data } = productSectionQuery;
  // if (isLoading) return <PageLoader />;
  // const { title } = data;

  return (
    <>
      <PageHeader loading={isLoading}>{data?.title}</PageHeader>
      <div className='-mt-5'>
        <ProductSection section={data} loading={isLoading} noHeader />
      </div>
    </>
  );
};

export default ProductSectionPage;
