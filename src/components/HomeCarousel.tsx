import { CarouselProvider, Slider, Slide } from 'pure-react-carousel';
import { IonButton } from '@ionic/react';
import 'pure-react-carousel/dist/react-carousel.es.css';
import HomeCarouselControls from './HomeCarouselControls';

const HomeCarousel = () => {
  return (
    <div className='pt-4'>
      <CarouselProvider
        naturalSlideWidth={100}
        naturalSlideHeight={76}
        totalSlides={3}
      >
        <Slider>
          <Slide index={0}>
            <div className='relative mx-5 bg-gray-200 rounded-xl h-[256px]'>
              <IonButton className='absolute bottom-5 right-5'>
                Kids stuff
              </IonButton>
            </div>
          </Slide>
          <Slide index={1}>
            <div className='relative mx-5 bg-gray-200 rounded-xl h-[256px]'>
              <IonButton className='absolute bottom-5 right-5'>
                Kids stuff
              </IonButton>
            </div>
          </Slide>
          <Slide index={2}>
            <div className='relative mx-5 bg-gray-200 rounded-xl h-[256px]'>
              <IonButton className='absolute bottom-5 right-5'>
                Kids stuff
              </IonButton>
            </div>
          </Slide>
        </Slider>

        <HomeCarouselControls />
      </CarouselProvider>
    </div>
  );
};

export default HomeCarousel;
