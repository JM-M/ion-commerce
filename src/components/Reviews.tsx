import ProductStars from './ProductStars';

const Reviews = () => {
  const text =
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut non massa at risus eleifend vulputate vel ac lacus. Nulla hendrerit mollis rhoncus. Sed ac pharetra diam, ut lobortis mauris. Integer in urna augue. Ut in quam eget tortor rutrum dictum eu eu augue.';
  return (
    <div className='p-3 bg-gray-100 rounded-[8px]'>
      <h5 className='text-gray-500 font-medium mb-1'>John Doe</h5>
      <ProductStars />
      <div className='pt-2 text-gray-900'>{text}</div>
    </div>
  );
};

export default Reviews;
