interface InputProps {
  type: string;
  labelText?: string;
  inputPlaceholder?: string;
}

const Input = ({ type, inputPlaceholder, labelText }: InputProps) => {
  return (
    <>
      <label htmlFor={type}>{labelText}</label>
      {type === "textarea" ? (
        <textarea
          className="h-40 px-2 py-2 rounded-sm"
          id={type}
          placeholder={inputPlaceholder}
        />
      ) : (
        <input
          className="px-2 py-2 rounded-sm"
          type={type}
          id={type}
          placeholder={inputPlaceholder}
        />
      )}
    </>
  );
};

export default Input;
