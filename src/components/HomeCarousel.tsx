import { IonButton, IonImg } from '@ionic/react';
import { CarouselProvider, Slider, Slide } from 'pure-react-carousel';
import 'pure-react-carousel/dist/react-carousel.es.css';
import HomeCarouselSkeleton from './skeletons/HomeCarouselSkeleton';
import HomeCarouselControls from './HomeCarouselControls';
import useHomeSlides, { HomeSlide } from '../hooks/useHomeSlides';

const HomeCarousel = () => {
  const { homeSlides, homeSlidesQuery } = useHomeSlides();

  if (homeSlidesQuery.isLoading) return <HomeCarouselSkeleton />;

  return (
    <div className='container pt-4'>
      <CarouselProvider
        naturalSlideWidth={100}
        naturalSlideHeight={76}
        totalSlides={homeSlides?.length}
      >
        <Slider>
          {homeSlides.map((homeSlide: HomeSlide, index: number) => {
            const { id, image, button, buttonText, buttonHref } = homeSlide;
            return (
              <Slide key={id} index={index}>
                <div className='relative aspect-[4/3] bg-gray-200 rounded-xl overflow-hidden'>
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
