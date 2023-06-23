"use client";
import "react-multi-carousel/lib/styles.css";

import Carousel from "react-multi-carousel";
import Postcard from "../Postcard";
import { Post } from "@/service/posts";
import { useEffect, useRef, useState } from "react";
const responsive = {
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 4,
    paritialVisibilityGutter: 60,
  },
  tablet: {
    breakpoint: { max: 1536, min: 769 },
    items: 3,
    paritialVisibilityGutter: 50,
  },
  mobile: {
    breakpoint: { max: 768, min: 0 },
    items: 2,
    paritialVisibilityGutter: 30,
  },
};
export default function YouMayLikePosts({ posts }: { posts: Post[] }) {
  const ref = useRef<HTMLDivElement>(null);
  const [hover, setHover] = useState(true);
  useEffect(() => {
    if (ref && ref.current?.onmouseover) {
      console.log("hi");
      setHover(false);
    }
    if (ref && ref.current?.onmouseleave) {
      console.log("hi");
      setHover(true);
    }
  }, [ref]);
  return (
    <div ref={ref}>
      <Carousel
        infinite={true}
        autoPlaySpeed={5000}
        autoPlay={hover}
        ssr
        containerClass="carousel-container"
        className="space-x-3"
        responsive={responsive}
        itemClass="px-1"
      >
        {posts?.map((post) => (
          <Postcard key={post.id} {...post} />
        ))}
      </Carousel>
    </div>
  );
}
