export default function GridPosts({ children }: { children: React.ReactNode }) {
  return (
    <div className="grid flex-1 gap-3 px-1 py-3 grid-1 sm:grid-cols-2 md:grid-cols-3 2xl:grid-cols-4">
      {children}
    </div>
  );
}
