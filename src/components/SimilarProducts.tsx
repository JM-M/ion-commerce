import { Link } from 'react-router-dom';
import ProductCategoryDisplay from './ProductCategoryDisplay';
import useCategories from '../hooks/useCategories';

type Props = { categoryId: string };

const SimilarProducts: React.FC<Props> = ({ categoryId }) => {
  const { getCategoryFromId } = useCategories();
  const { name: categoryName = '', value: categoryValue = '' } =
    getCategoryFromId(categoryId) || {};

  const fullPageHref = `/store/sections/${categoryName}`;
  return (
    <>
      <div className='flex justify-between items-start pb-5'>
        <h2 className='text-xl font-medium text-gray-500'>
          Other products in {categoryName}
        </h2>
        {fullPageHref && (
          <Link to={fullPageHref} className='text-blue-500'>
            See all
          </Link>
        )}
      </div>
      <ProductCategoryDisplay
        displayType='row'
        category={categoryValue}
        numProducts={8}
      />
    </>
  );
};

export default SimilarProducts;
