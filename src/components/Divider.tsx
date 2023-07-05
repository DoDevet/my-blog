interface DividerProps {
  text?: string;
}

const Divider = ({ text }: DividerProps) => {
  return (
    <div className="flex items-center w-full py-3">
      <div className="flex-grow border-b border-gray-500 dark:border-gray-300" />
      {text && (
        <p className="px-2 text-sm text-gray-500 dark:text-gray-300">{text}</p>
      )}
      <div className="flex-grow border-b border-gray-500 dark:border-gray-300" />
    </div>
  );
};
export default Divider;
