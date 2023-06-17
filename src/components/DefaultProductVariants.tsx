import { BsChevronDown } from 'react-icons/bs';

const DefaultProductVariants = () => {
  return (
    <div className='flex'>
      <div className='flex-1'>
        <h4 className='mb-[10px] font-medium text-gray-500 text-base'>Color</h4>
        <div className='h-[40px] w-[110px] flex justify-between items-center px-3 bg-gray-200 rounded-[8px]'>
          <div className='flex gap-[10px] items-center'>
            <span className='inline-block h-[15px] w-[15px] bg-gray-950 rounded-lg'></span>
            Black
          </div>{' '}
          <BsChevronDown size={12} />
        </div>
      </div>
      <div className='flex-1'>
        <h4 className='mb-[10px] font-medium text-gray-500 text-base'>Size</h4>
        <div className='h-[40px] w-[110px] flex justify-between items-center px-3 bg-gray-200 rounded-[8px]'>
          US 10
          <BsChevronDown size={12} />
        </div>
      </div>
    </div>
  );
};

export default DefaultProductVariants;
