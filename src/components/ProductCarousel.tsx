import { CarouselProvider, Slider, Slide } from 'pure-react-carousel';
import ProductCarouselControls from './ProductCarouselControls';

const ProductCarousel = () => {
  return (
    <div>
      <CarouselProvider
        naturalSlideWidth={100}
        naturalSlideHeight={76}
        totalSlides={3}
      >
        <Slider>
          <Slide index={0}>
            <div className='relative mx-5 bg-gray-200 rounded-xl h-[256px]'></div>
          </Slide>
          <Slide index={1}>
            <div className='relative mx-5 bg-gray-200 rounded-xl h-[256px]'></div>
          </Slide>
          <Slide index={2}>
            <div className='relative mx-5 bg-gray-200 rounded-xl h-[256px]'></div>
          </Slide>
        </Slider>

        <ProductCarouselControls />
      </CarouselProvider>
    </div>
  );
};

export default ProductCarousel;
