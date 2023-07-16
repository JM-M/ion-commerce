import { IonImg } from '@ionic/react';
import { CarouselProvider, Slider, Slide } from 'pure-react-carousel';
import ProductCarouselControls from './ProductCarouselControls';

const ProductCarousel: React.FC<{ images: string[]; hasVariant: boolean }> = ({
  images = [],
  hasVariant = false,
}) => {
  if (!images.length)
    return (
      <div className='h-[400px] flex justify-center items-center m-5 bg-gray-100 text-gray-500 rounded-xl'>
        No images available for this {hasVariant ? 'variant' : 'product'}
      </div>
    );

  return (
    <div>
      <CarouselProvider
        naturalSlideWidth={100}
        naturalSlideHeight={115}
        totalSlides={3}
      >
        <Slider>
          {images.map((image, i) => {
            return (
              <Slide key={i} index={i}>
                <div className='relative mx-5 rounded-xl h-[556px] overflow-hidden'>
                  <div className='bg-gray-200 rounded-xl overflow-hidden'>
                    <IonImg
                      src={image}
                      alt={`Slide ${i + 1}`}
                      className='bg-gray-200'
                    />
                  </div>
                </div>
              </Slide>
            );
          })}
        </Slider>

        <ProductCarouselControls images={images} />
      </CarouselProvider>
    </div>
  );
};

export default ProductCarousel;
