import { useIonRouter, IonContent } from '@ionic/react';
import PageHeader from '../components/PageHeader';
import { CategoryHeader } from '../components/CategoryHeader';
import ProductCategoryDisplay from '../components/ProductCategoryDisplay';

const Category = () => {
  const ionRouter = useIonRouter();
  const {
    routeInfo: { pathname },
  } = ionRouter;
  const baseUrlPath = '/store/category';
  let category = pathname.replace(baseUrlPath, '');

  return (
    <>
      <CategoryHeader />
      <IonContent>
        <ProductCategoryDisplay category={category} />
      </IonContent>
    </>
  );
};

export default Category;
