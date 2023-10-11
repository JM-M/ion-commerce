import { useIonRouter, IonHeader, IonButton } from '@ionic/react';
import cx from 'classnames';
import QueryController from './QueryController';
import useCategories, { Category } from '../hooks/useCategories';
import { SortOption } from '../hooks/useProducts';

interface Props {
  sortOptions: { [option: string]: SortOption };
  setSortOption: Function;
}

export const CategoryHeader = ({ sortOptions, setSortOption }: Props) => {
  const ionRouter = useIonRouter();
  const {
    routeInfo: { pathname },
  } = ionRouter;

  const baseUrlPath = '/store/category';
  const activeCategoryValue = pathname.replace(baseUrlPath, '');
  const isRootCategory = !activeCategoryValue.replaceAll('/', '');

  const { getChildCategories } = useCategories();
  const categories = getChildCategories(activeCategoryValue);
  const activeCategoryPaths = activeCategoryValue.split('/').filter((v) => v);

  const goToCategory = (value: string) =>
    ionRouter.push(`/store/category${value}`);

  return (
    <div>
      <div className='container mb-3 capitalize text-base'>
        <ul className='flex flex-wrap items-center w-full'>
          <li>
            <span
              className={cx({
                underline: activeCategoryPaths.length,
              })}
              onClick={() => goToCategory('/')}
            >
              All products
            </span>
            {!isRootCategory && <span className='inline-block mx-2'>/</span>}
          </li>
          {activeCategoryPaths.map((path, i) => {
            const isLastPath = i === activeCategoryPaths.length - 1;
            const pathValue = `/${activeCategoryPaths
              .slice(0, i + 1)
              .join('/')}`;
            return (
              <li key={i}>
                <span
                  className={cx({
                    underline: !isLastPath,
                  })}
                  onClick={() => goToCategory(pathValue)}
                >
                  {path}
                </span>
                {!isLastPath && <span className='inline-block mx-2'>/</span>}
              </li>
            );
          })}
        </ul>
      </div>
      {/* <PageHeader backHref={baseUrlPath} noBackButton={isRootCategory}>
        {!isRootCategory ? activeCategory?.name : 'All products'}
      </PageHeader> */}
      <IonHeader className='container ion-no-border'>
        {' '}
        <div className='w-screen overflow-x-auto pb-1'>
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
        </div>
        <div className='flex justify-end pb-2'>
          <QueryController
            onSort={(v) => setSortOption(v)}
            sortOptions={Object.keys(sortOptions)}
          />
        </div>
      </IonHeader>
    </div>
  );
};
