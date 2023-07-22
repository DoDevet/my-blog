"use client";

import { useForm } from "react-hook-form";
import Divider from "../Divider";
import Input from "../Input";

interface useFormEmail {
  email: string;
  title: string;
  message: string;
}

const EmailForm = () => {
  const { register, handleSubmit } = useForm<useFormEmail>();

  const onSubmit = ({ email, message, title }: useFormEmail) => {
    console.log(email, message, title);
  };
  return (
    <div className="relative flex flex-col w-full max-w-2xl ">
      <Divider text="OR" />
      <h1 className="pb-3 mx-auto font-semibold">Send Email</h1>
      <form className="flex flex-col w-full" onSubmit={handleSubmit(onSubmit)}>
        <Input
          type="email"
          labelText="Your email"
          inputPlaceholder="Input your email"
          register={register("email", {
            required: true,
          })}
        />
        <Input
          type="text"
          labelText="Subject"
          inputPlaceholder="Input Subject"
          register={register("title", {
            required: true,
          })}
        />
        <Input
          type="textarea"
          labelText="Message"
          inputPlaceholder="Input Message"
          register={register("message", {
            required: true,
          })}
        />
        <button className="absolute px-2 py-1 transition-colors bg-indigo-500 rounded-md right-1 -bottom-9 hover:bg-indigo-600">
          Send
        </button>
      </form>
    </div>
  );
};
export default EmailForm;
