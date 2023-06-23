"use client";
import Carousel, { CarouselProps, ResponsiveType } from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import Postcard from "./Postcard";
import { Post } from "@/service/posts";
import { LegacyRef, useEffect, useRef, useState } from "react";

const responsive: ResponsiveType = {
  desktop: {
    breakpoint: { max: 3000, min: 1537 },
    items: 4,
    partialVisibilityGutter: 30,
  },
  tablet: {
    breakpoint: { max: 1536, min: 769 },
    items: 3,
    paritialVisibilityGutter: 30,
  },
  mobile: {
    breakpoint: { max: 768, min: 0 },
    items: 2,
    paritialVisibilityGutter: 30,
  },
};
export default function CarouselPosts({ posts }: { posts: Post[] }) {
  const ref = useRef<Carousel>(null);
  const [hover, setHover] = useState(true);
  useEffect(() => {
    if (ref.current?.containerRef.current?.onmouseenter) {
    } else setHover(true);
  }, [ref]);
  return (
    <>
      <div>
        <Carousel
          ref={ref}
          autoPlaySpeed={5000}
          autoPlay={hover}
          partialVisible
          infinite
          renderButtonGroupOutside={true}
          containerClass="carousel-container"
          className="space-x-3"
          responsive={responsive}
          itemClass="px-1 py-3 w-full"
        >
          {posts?.map((post) => (
            <Postcard key={post.id} {...post} />
          ))}
        </Carousel>
      </div>
    </>
  );
}
