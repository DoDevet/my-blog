"use client";
import Carousel, { ResponsiveType } from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";

const responsive: ResponsiveType = {
  desktop: {
    breakpoint: { max: 3000, min: 1537 },
    items: 3,
  },
  tablet: {
    breakpoint: { max: 1536, min: 769 },
    items: 3,
  },
  mobile: {
    breakpoint: { max: 768, min: 0 },
    items: 2,
  },
};
export default function CarouselPosts({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Carousel
      autoPlaySpeed={5000}
      infinite
      pauseOnHover
      renderButtonGroupOutside={true}
      containerClass="carousel-container"
      className="space-x-3"
      responsive={responsive}
      itemClass="px-1 py-3 w-full"
    >
      {children}
    </Carousel>
  );
}
