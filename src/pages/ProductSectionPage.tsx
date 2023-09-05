import { RouteComponentProps } from "react-router";
import { IonIcon, useIonRouter } from "@ionic/react";
import { arrowBackOutline } from "ionicons/icons";
import useProductSections from "../hooks/useProductSections";
import PageLoader from "../components/PageLoader";
import ProductSection from "../components/ProductSection";

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
  if (isLoading) return <PageLoader />;
  const { title } = data;

  return (
    <>
      <div className="block container mb-3">
        <IonIcon
          icon={arrowBackOutline}
          color="dark"
          className="h-[20px] w-[20px]"
          onClick={() => (canGoBack() ? goBack() : push("/store", "back"))}
        />
        <h2 className="font-medium text-lg">{title}</h2>
      </div>
      <div className="-mt-5">
        <ProductSection section={data} noHeader/>
      </div>
    </>
  );
};

export default ProductSectionPage;
