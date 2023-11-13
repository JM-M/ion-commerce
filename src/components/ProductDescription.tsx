interface Props {
  description: string;
}

const ProductDescription = ({ description = '' }: Props) => {
  return (
    <div className='pt-[30px] text-gray-700'>
      <h4 className='mb-[10px] font-medium text-gray-500 text-base'>
        Description
      </h4>
      <div className='leading-[24px] dark:text-gray-300'>{description}</div>
    </div>
  );
};

export default ProductDescription;
