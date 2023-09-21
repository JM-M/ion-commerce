import { Link } from 'react-router-dom';
import SelectedProductSection from './SelectedProductSection';
import ProductCategoryDisplay from './ProductCategoryDisplay';
import { DatabaseProductSection } from '../hooks/useProductSections';

interface Props {
  section: DatabaseProductSection;
  noHeader?: boolean;
  loading?: boolean;
}

const ProductSection = ({
  section,
  noHeader = false,
  loading = false,
}: Props) => {
  const { title, id, category } = section || {};
  const fullPageHref = `/store/sections/${id}`;

  if (!id) return null;

  return (
    <div className='container py-[30px]'>
      {(title || fullPageHref) && !noHeader && (
        <div className='flex justify-between items-start pb-5'>
          <h2 className='text-xl font-medium text-gray-500'>{title}</h2>
          {fullPageHref && (
            <Link to={fullPageHref} className='text-blue-500'>
              See all
            </Link>
          )}
        </div>
      )}
      {category ? (
        <ProductCategoryDisplay category={category} />
      ) : (
        <SelectedProductSection id={id!} />
      )}
    </div>
  );
};

export default ProductSection;
