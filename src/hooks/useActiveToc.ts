import { Aclonica } from "next/font/google";
import { useEffect, useRef, useState } from "react";

export default function useActiveToc() {
  const observer = useRef<IntersectionObserver>();

  const [activeId, setActiveId] = useState("");

  useEffect(() => {
    const handleObsever = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry?.isIntersecting) {
          setActiveId(entry.target.id);
        }
      });
    };

    observer.current = new IntersectionObserver(handleObsever, {
      rootMargin: "-45% 0% -45% 0%",
    });

    const elements = document.querySelectorAll("h2, h3, h4");
    elements.forEach((elem) => observer?.current?.observe(elem));
    return () => observer.current?.disconnect();
  }, []);

  return { activeId };
}
