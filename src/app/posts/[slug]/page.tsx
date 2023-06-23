const PostDetail = ({ params: { slug } }: { params: { slug: string } }) => {
  return <div>{`Post id : ${slug}`}</div>;
};
export default PostDetail;
