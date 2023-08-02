import { useIonRouter, IonContent } from "@ionic/react";
import { CategoryHeader } from "../components/CategoryHeader";
import ProductSection from "../components/ProductSection";

const Category = () => {
  const ionRouter = useIonRouter();
  const {
    routeInfo: { pathname },
  } = ionRouter;
  const baseUrlPath = "/store/category";
  let category = pathname.replace(baseUrlPath, "");
  if (category === "/") category = "";

  return (
    <>
      <CategoryHeader />
      <IonContent>
        <ProductSection productIds={[]} category={category} />
      </IonContent>
    </>
  );
};

export default Category;
