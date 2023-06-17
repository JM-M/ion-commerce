import { BsChevronDown } from 'react-icons/bs';

const CustomProductVariants = () => {
  return (
    <div className='pt-[30px]'>
      <div>
        <h4 className='mb-[10px] font-medium text-gray-500 text-base'>
          Custom variation
        </h4>
        <div className='h-[40px] w-[160px] flex justify-between items-center px-3 bg-gray-200 rounded-[8px]'>
          Variation option
          <BsChevronDown size={12} />
        </div>
      </div>
    </div>
  );
};

export default CustomProductVariants;
