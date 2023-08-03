import { BsStarFill } from 'react-icons/bs';

interface Props {
  max: number;
  value: number;
}

const ProductStars = ({ value, max }: Props) => {
  return (
    <span className='flex items-center'>
      {[...Array(max)].map((_, i) => {
        const rating = i + 1;
        if (rating <= +value)
          return <BsStarFill key={i} size={16} className='text-[#FFC107]' />;
        return <BsStarFill key={i} size={16} className='text-gray-400' />;
      })}
    </span>
  );
};

export default ProductStars;
