import QuerySort from './QuerySort';
import QueryFilter from './QueryFilter';

interface Props {
  sortOptions?: string[];
  onSort?: (option: string) => void;
}

const QueryController = ({ onSort, sortOptions }: Props) => {
  return (
    <div className='flex items-center gap-2'>
      {sortOptions && onSort && (
        <QuerySort options={sortOptions} onSort={onSort} />
      )}
      <QueryFilter />
    </div>
  );
};

export default QueryController;
