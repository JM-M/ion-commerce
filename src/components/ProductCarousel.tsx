import { IonImg } from '@ionic/react';
import { CarouselProvider, Slider, Slide } from 'pure-react-carousel';
import ProductCarouselControls from './ProductCarouselControls';
import WishlistIcon from './WishlistIcon';
import useAuth from '../hooks/useAuth';
import { getProductImages } from '../hooks/useProductImages';
import { Product } from '../constants/schemas/product';

interface Props {
  product: Product;
  hasVariant: boolean;
}

const ProductCarousel: React.FC<Props> = ({ product, hasVariant = false }) => {
  const { isLoggedIn } = useAuth();

  const { stocks = [], name, price, id } = product;

  const images = getProductImages(stocks);

  if (!images.length)
    return (
      <div className='relative min-h-[400px] flex items-center justify-center m-5 p-5 bg-gray-200 dark:bg-neutral-700 rounded-xl overflow-hidden'>
        No images available for this {hasVariant ? 'variant' : 'product'}
      </div>
    );

  return (
    <div className='relative'>
      <CarouselProvider
        naturalSlideWidth={100}
        naturalSlideHeight={120}
        totalSlides={images.length}
        className='relative ml-5'
      >
        {isLoggedIn && (
          <WishlistIcon
            product={{
              name,
              price,
              objectID: id!,
              image: images[0],
            }}
            className='right-10 bottom-28 z-10'
          />
        )}
        <Slider>
          {images.map((image, i) => {
            return (
              <Slide key={i} index={i}>
                <div className='pr-5'>
                  <div className='relative w-full aspect-[3.2/4.0] bg-gray-200 rounded-xl overflow-hidden'>
                    <IonImg
                      src={image}
                      alt={`Slide ${i + 1}`}
                      className='h-full w-full bg-gray-200 object-cover'
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
