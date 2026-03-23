interface DividerProps {
  text?: string;
}

const Divider = ({ text }: DividerProps) => {
  return (
    <div className="flex items-center w-full py-4">
      <div className="flex-grow border-b border-gray-200 dark:border-gray-700" />
      {text && (
        <p className="px-3 text-xs font-medium tracking-wider text-gray-400 uppercase dark:text-gray-500">
          {text}
        </p>
      )}
      <div className="flex-grow border-b border-gray-200 dark:border-gray-700" />
    </div>
  );
};
export default Divider;
