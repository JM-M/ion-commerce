import { useState } from 'react';
import { Link } from 'react-router-dom';
import { IonIcon, IonMenuToggle, IonButton } from '@ionic/react';
import { chevronForward } from 'ionicons/icons';
import CategoriesMenuSkeleton from './skeletons/CategoriesMenuSkeleton';
import cx from 'classnames';
import useCategories, { Category } from '../hooks/useCategories';

const CategoriesMenu = () => {
  const [activeCategory, setActiveCategory] = useState<string>('/');

  const { categoriesQuery, getChildCategories, hasChildCategories } =
    useCategories();
  const { isLoading } = categoriesQuery || {};

  if (isLoading) return <CategoriesMenuSkeleton />;
  const categories = getChildCategories(activeCategory || '/');
  console.log(categoriesQuery.data, categories);
  const activeCategoryPaths = activeCategory.split('/').filter((v) => v);

  const setCategoryPathAsActive = (i: number) => {
    setActiveCategory('/' + activeCategoryPaths.slice(0, i + 1).join('/'));
  };

  return (
    <>
      <ul className='flex flex-wrap items-center pl-5 mr-5 mb-2 capitalize'>
        <li>
          <span
            className={cx('text-sm', {
              underline: activeCategoryPaths?.length,
            })}
            onClick={() => setActiveCategory('/')}
          >
            All products
          </span>
        </li>
        {activeCategoryPaths.map((path, i) => {
          const isLastPath = i === activeCategoryPaths.length - 1;
          return (
            <li key={i}>
              <span className='inline-block mx-2'>/</span>
              <span
                className='text-sm underline'
                onClick={() => (isLastPath ? null : setCategoryPathAsActive(i))}
              >
                {path}
              </span>
            </li>
          );
        })}
      </ul>
      <ul>
        {categories.map((category: Category, index: number) => {
          const { name, value } = category;
          const active = activeCategory === value;
          const hasChildren = hasChildCategories(value);
          return (
            <li key={index} className='flex justify-between items-center px-5'>
              <Link
                to={`/store/category${value}`}
                className={cx(
                  'flex items-center justify-between h-10 w-fit mr-5 mb-1 border border-transparent rounded-lg',
                  {
                    'border-[var(--ion-color-primary)] text-[var(--ion-color-primary)] font-medium':
                      active,
                  }
                )}
              >
                <IonMenuToggle>
                  <IonButton
                    fill='clear'
                    className='ion-no-padding'
                    color='dark'
                  >
                    {name}
                  </IonButton>
                </IonMenuToggle>
              </Link>
              {hasChildren && (
                <IonIcon
                  icon={chevronForward}
                  onClick={() => {
                    if (!hasChildren) return;
                    setActiveCategory(value);
                  }}
                />
              )}
            </li>
          );
        })}
      </ul>
    </>
  );
};

export default CategoriesMenu;
