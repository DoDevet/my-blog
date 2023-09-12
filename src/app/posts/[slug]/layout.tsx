import TableOfContents from "@/components/TableOfContents";

const PostDetailLayout = ({ children }: { children: React.ReactNode }) => {
  return <section className="flex justify-between w-full">{children}</section>;
};
export default PostDetailLayout;
