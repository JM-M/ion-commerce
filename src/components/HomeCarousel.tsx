import { IonButton, IonImg } from '@ionic/react';
import cx from 'classnames';
import { CarouselProvider, Slider, Slide } from 'pure-react-carousel';
import 'pure-react-carousel/dist/react-carousel.es.css';
import HomeCarouselSkeleton from './skeletons/HomeCarouselSkeleton';
import HomeCarouselControls from './HomeCarouselControls';
import useHomeSlides, { HomeSlide } from '../hooks/useHomeSlides';
import useScreenSize from '../hooks/useScreenSize';

const HomeCarousel = () => {
  const { homeSlides = [], homeSlidesQuery } = useHomeSlides();

  const { width } = useScreenSize();

  if (homeSlidesQuery.isLoading) return <HomeCarouselSkeleton />;

  if (!homeSlides?.length) return null;

  let naturalSlideHeight = 76;
  if (width > 768) naturalSlideHeight = 60;
  if (width > 1024) naturalSlideHeight = 50;

  return (
    <div className='container pt-4 max-h-[500px] mb-10'>
      <CarouselProvider
        naturalSlideWidth={100}
        naturalSlideHeight={naturalSlideHeight}
        totalSlides={homeSlides?.length}
      >
        <Slider>
          {homeSlides.map((homeSlide: HomeSlide, index: number) => {
            const { id, image, button, buttonText, buttonHref } = homeSlide;
            return (
              <Slide
                key={id}
                index={index}
                style={width >= 1280 ? { paddingBottom: '20%' } : {}}
              >
                <div
                  className={cx(
                    'relative h-full w-full bg-gray-200 rounded-xl overflow-hidden',
                    { 'aspect-[4/3]': width < 768 }
                  )}
                >
                  <IonImg
                    src={image}
                    alt={`Slide ${index + 1}`}
                    className='h-full w-full bg-gray-200 object-cover'
                  />
                  {button && (
                    <IonButton
                      routerLink={buttonHref}
                      className='absolute bottom-5 right-5'
                    >
                      {buttonText}
                    </IonButton>
                  )}
                </div>
              </Slide>
            );
          })}
        </Slider>
        <HomeCarouselControls />
      </CarouselProvider>
    </div>
  );
};

export default HomeCarousel;
