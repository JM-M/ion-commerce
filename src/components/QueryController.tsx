import QueryFilter from './QueryFilter';

interface Props {
  sortOptions?: string[];
  onSort?: (option: string) => void;
}

const QueryController = ({ onSort, sortOptions }: Props) => {
  return (
    <div className='flex items-center gap-2'>
      <QueryFilter />
    </div>
  );
};

export default QueryController;
