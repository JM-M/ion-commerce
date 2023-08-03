import ProductStars from './ProductStars';
import { Review as ReviewInterface } from '../constants/schemas/review';

const Review = ({ firstName, lastName, content, rating }: ReviewInterface) => {
  return (
    <div className='p-3 bg-gray-100 rounded-[8px]'>
      <h5 className='text-gray-500 font-medium mb-1'>
        {firstName} {lastName}
      </h5>
      <ProductStars value={rating} max={5} />
      <div className='pt-2 text-gray-900'>{content}</div>
    </div>
  );
};

export default Review;
