import React from "react";
import { Carousel } from "react-responsive-carousel";
import styles from "react-responsive-carousel/lib/styles/carousel.min.css";
import {carouselTest} from "../../assets";

export const LandingCarousel = () => {
  return (
    <Carousel
      className={"max-w-[935px] max-h-[390px] flex justify-center items-center rounded "}
      autoPlay
      showThumbs={false}
      showArrows={false}
      infiniteLoop={true}
      showStatus={false}
    >
      <div>
        <img alt={carouselTest.alt} src={carouselTest.img} />
      </div>
      <div>
        <img alt={carouselTest.alt} src={carouselTest.img} />
      </div>
      <div>
        <img alt={carouselTest.alt} src={carouselTest.img} />
      </div>
    </Carousel>
  );
};
