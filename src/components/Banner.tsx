import { Image } from "@chakra-ui/react";
import { Carousel } from "react-responsive-carousel";

const Banner = ({ images }: { images?: string[] }) => {
  console.log(images);
  return (
    <div className="relative">
      <Carousel
        autoPlay
        infiniteLoop
        showStatus={false}
        showIndicators={false}
        showThumbs={false}
        interval={3000}
        className="bg-white"
        dynamicHeight={true}
      >
        {images &&
          images.map((image: string, index: number) => (
            <Image
              key={"Banner image " + index}
              objectFit={"contain"}
              src={image}
              alt="Banner image"
              bg={"white"}
            />
          ))}
      </Carousel>
    </div>
  );
};

export default Banner;
