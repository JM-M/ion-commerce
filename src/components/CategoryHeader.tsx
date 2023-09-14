import { useIonRouter, IonHeader, IonButton } from '@ionic/react';
import PageHeader from './PageHeader';
import QueryController from './QueryController';
import useCategories, { Category } from '../hooks/useCategories';
import { SortOption } from '../hooks/useProducts';

interface Props {
  sortOptions: { [option: string]: SortOption };
  setSortOption: Function;
  productFilters: {};
  setProductFilters: Function;
}

export const CategoryHeader = ({
  sortOptions,
  setSortOption,
  productFilters = {},
  setProductFilters = () => null,
}: Props) => {
  const ionRouter = useIonRouter();
  const {
    routeInfo: { pathname },
  } = ionRouter;

  const baseUrlPath = '/store/category';
  const activeCategoryValue = pathname.replace(baseUrlPath, '');
  const isRootCategory = !activeCategoryValue.replaceAll('/', '');

  const { getChildCategories, getCategoryFromValue } = useCategories();
  const categories = getChildCategories(activeCategoryValue);
  const activeCategory = getCategoryFromValue(activeCategoryValue);

  return (
    <div>
      <PageHeader backHref={baseUrlPath} noBackButton={isRootCategory}>
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
          <div className='container flex justify-end'>
            <QueryController
              onSort={(v) => setSortOption(v)}
              sortOptions={Object.keys(sortOptions)}
              productFilters={productFilters}
              setProductFilters={setProductFilters}
            />
          </div>
        </div>
      </IonHeader>
    </div>
  );
};
