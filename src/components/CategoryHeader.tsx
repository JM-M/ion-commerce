import { useIonRouter, IonHeader, IonButton, IonIcon } from '@ionic/react';
import { arrowBackOutline } from 'ionicons/icons';
import PageHeader from './PageHeader';
import SubCategorySelector from './SubCategorySelector';
import QueryController from './QueryController';
import useCategories, { Category } from '../hooks/useCategories';

export const CategoryHeader = () => {
  const ionRouter = useIonRouter();
  const {
    canGoBack,
    goBack,
    push,
    routeInfo: { pathname },
  } = ionRouter;

  const baseUrlPath = '/store/category';
  const activeCategoryValue = pathname.replace(baseUrlPath, '');
  const isRootCategory = !activeCategoryValue.replaceAll('/', '');

  const { getChildCategories, getCategoryFromValue } = useCategories();
  const categories = getChildCategories(activeCategoryValue);
  const activeCategory = getCategoryFromValue(activeCategoryValue);

  const parentCategory = activeCategoryValue.split('/').slice(0, -1).join('/');
  const backUrl = `/store/category/${parentCategory}`;

  return (
    <div>
      <PageHeader backHref={baseUrlPath}>
        {!isRootCategory ? activeCategory?.name : 'All products'}
      </PageHeader>
      <IonHeader className='ion-no-border'>
        {' '}
        <div className='w-screen overflow-x-auto pb-3'>
          <ul className='flex gap-3'>
            {categories.map((category: Category, index: number) => {
              const { name, value } = category;
              const active = activeCategoryValue === value;
              return (
                <IonButton
                  key={index}
                  routerLink={`${baseUrlPath}${value}`}
                  color={active ? 'primary' : 'secondary'}
                  className='!h-[30px] font-medium'
                >
                  {name}
                </IonButton>
              );
            })}
          </ul>
          <div className='flex justify-end items-center py-3 px-5'>
            <QueryController />
          </div>
        </div>
      </IonHeader>
    </div>
  );
};
