import { Post } from "@/service/posts";
import Postcard from "./Postcard";
import "react-multi-carousel/lib/styles.css";

export default function GridPosts({ children }: { children: React.ReactNode }) {
  return (
    <div className="grid flex-1 grid-cols-2 gap-3 px-1 py-3 md:grid-cols-3 2xl:grid-cols-4">
      {children}
    </div>
  );
}
