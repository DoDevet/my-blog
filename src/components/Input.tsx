import { UseFormRegisterReturn } from "react-hook-form";

interface InputProps {
  type: string;
  labelText?: string;
  inputPlaceholder?: string;
  register: UseFormRegisterReturn;
}

const Input = ({ type, inputPlaceholder, labelText, register }: InputProps) => {
  return (
    <div className="flex flex-col gap-1.5">
      <label htmlFor={type} className="text-sm font-medium text-gray-700 dark:text-gray-300">
        {labelText}
      </label>
      {type === "textarea" ? (
        <textarea
          className="h-40 px-3 py-2.5 text-sm rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-[#2d2d2f] outline-none focus:ring-2 focus:ring-sky-400 dark:focus:ring-violet-400 focus:border-transparent transition-shadow"
          id={type}
          placeholder={inputPlaceholder}
          {...register}
        />
      ) : (
        <input
          className="px-3 py-2.5 text-sm rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-[#2d2d2f] outline-none focus:ring-2 focus:ring-sky-400 dark:focus:ring-violet-400 focus:border-transparent transition-shadow"
          type={type}
          id={type}
          placeholder={inputPlaceholder}
          {...register}
        />
      )}
    </div>
  );
};

export default Input;
