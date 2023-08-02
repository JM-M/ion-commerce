import { IonImg } from "@ionic/react";
import { DotGroup, Dot } from "pure-react-carousel";
import cx from "classnames";

const ProductCarouselControls: React.FC<{ images: string[] }> = ({
  images,
}) => {
  return (
    <DotGroup
      className="flex gap-[10px] pt-3"
      renderDots={({ currentSlide }) => {
        return images.map((image, i) => {
          const active = i === currentSlide;
          return (
            <Dot key={i} slide={i} className="h-fit w-fit">
              <div
                className={cx(
                  "relative h-[75px] w-[60px] bg-gray-200 border border-solid transition-[border-color] ease-in-out duration-150 rounded-lg overflow-hidden",
                  {
                    "border-transparent": !active,
                    "border-black": active,
                  }
                )}
              >
                <IonImg
                  src={image}
                  alt={`Slide ${i + 1}`}
                  className="h-full w-full bg-gray-200 object-cover"
                />
              </div>
            </Dot>
          );
        });
      }}
    />
  );
};

export default ProductCarouselControls;
