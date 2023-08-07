import TableOfContents from "@/components/TableOfContents";

const PostDetailLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      {children}
      <TableOfContents />
    </>
  );
};
export default PostDetailLayout;
