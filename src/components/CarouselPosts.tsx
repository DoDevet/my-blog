"use client";
import Carousel, { ResponsiveType } from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";

const responsive: ResponsiveType = {
  desktop: {
    breakpoint: { max: 3000, min: 768 },
    items: 3,
  },
  tablet: {
    breakpoint: { max: 767, min: 640 },
    items: 2,
  },
  mobile: {
    breakpoint: { max: 639, min: 0 },
    items: 1,
  },
};
export default function CarouselPosts({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Carousel
      itemClass="px-1"
      className="py-2"
      autoPlaySpeed={5000}
      infinite
      pauseOnHover
      renderButtonGroupOutside={true}
      containerClass="carousel-container"
      responsive={responsive}
    >
      {children}
    </Carousel>
  );
}
