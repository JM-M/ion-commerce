import { BsChevronDown } from 'react-icons/bs';

const SubCategorySelector = () => {
  return (
    <div className='h-[30px] w-fit flex justify-between items-center gap-2 px-3 bg-gray-200 rounded-[8px]'>
      Subcategory
      <BsChevronDown size={12} />
    </div>
  );
};

export default SubCategorySelector;
