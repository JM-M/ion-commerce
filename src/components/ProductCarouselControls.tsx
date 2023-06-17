import { DotGroup, Dot } from 'pure-react-carousel';
import cx from 'classnames';

const ProductCarouselControls = () => {
  return (
    <DotGroup
      className='container flex gap-[10px]'
      renderDots={({ totalSlides, currentSlide, ...rest }) => {
        return [...Array(totalSlides)].map((_, i) => {
          const active = i === currentSlide;
          return (
            <Dot
              key={i}
              slide={i}
              className={cx(
                'h-[50px] w-[60px] bg-gray-200 rounded-[8px] border border-solid transition-[border-color] ease-in-out duration-150',
                {
                  'border-transparent': !active,
                  'border-pri': active,
                }
              )}
            />
          );
        });
      }}
    />
  );
};

export default ProductCarouselControls;
