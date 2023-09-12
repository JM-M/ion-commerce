import { IonButton } from '@ionic/react';
import { CiFilter } from 'react-icons/ci';
import QuerySort from './QuerySort';
import QueryFilter from './QueryFilter';

interface Props {
  sortOptions?: string[];
  onSort?: (option: string) => void;
  productFilters: {};
  setProductFilters: Function;
}

const QueryController = ({
  onSort,
  sortOptions,
  productFilters,
  setProductFilters,
}: Props) => {
  return (
    <div className='flex items-center gap-[10px]'>
      {sortOptions && onSort && (
        <QuerySort options={sortOptions} onSort={onSort} />
      )}
      <QueryFilter
        productFilters={productFilters}
        setProductFilters={setProductFilters}
      />
    </div>
  );
};

export default QueryController;
