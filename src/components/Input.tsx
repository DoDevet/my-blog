import { UseFormRegisterReturn } from "react-hook-form";

interface InputProps {
  type: string;
  labelText?: string;
  inputPlaceholder?: string;
  register: UseFormRegisterReturn;
}

const Input = ({ type, inputPlaceholder, labelText, register }: InputProps) => {
  return (
    <>
      <label htmlFor={type}>{labelText}</label>
      {type === "textarea" ? (
        <textarea
          className="h-40 px-2 py-2 border-none rounded-sm outline-none focus:border-0 focus:ring-indigo-400 focus:ring-1"
          id={type}
          placeholder={inputPlaceholder}
          {...register}
        />
      ) : (
        <input
          className="px-2 py-2 rounded-sm outline-none focus:border-0 focus:ring-indigo-400 focus:ring-1"
          type={type}
          id={type}
          placeholder={inputPlaceholder}
          {...register}
        />
      )}
    </>
  );
};

export default Input;
