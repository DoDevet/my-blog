export default function GridPosts({ children }: { children: React.ReactNode }) {
  return (
    <div className="grid flex-1 gap-5 py-3 grid-cols-1 sm:grid-cols-2 md:grid-cols-3">
      {children}
    </div>
  );
}
