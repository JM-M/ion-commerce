import { IonImg } from '@ionic/react';
import { DotGroup, Dot } from 'pure-react-carousel';
import cx from 'classnames';

const ProductCarouselControls: React.FC<{ images: string[] }> = ({
  images,
}) => {
  return (
    <DotGroup
      className='container flex gap-[10px] mt-3'
      renderDots={({ currentSlide }) => {
        return images.map((image, i) => {
          const active = i === currentSlide;
          return (
            <Dot key={i} slide={i} className='h-fit w-fit'>
              <div
                className={cx(
                  'relative h-[75px] w-[60px] bg-gray-200 border border-solid transition-[border-color] ease-in-out duration-150 rounded-lg overflow-hidden',
                  {
                    'border-transparent': !active,
                    'border-black': active,
                  }
                )}
              >
                <IonImg src={image} alt={`Slide ${i + 1}`} />
              </div>
            </Dot>
          );
        });
      }}
    />
  );
};

export default ProductCarouselControls;
