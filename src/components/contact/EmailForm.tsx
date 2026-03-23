"use client";

import { useForm } from "react-hook-form";
import Divider from "../Divider";
import Input from "../Input";
import { sendContextMail } from "@/service/contact";
import { useState } from "react";

interface IFormEmail {
  subject: string;
  message: string;
}

const EmailForm = () => {
  const [loading, setLoading] = useState(false);
  const { register, handleSubmit } = useForm<IFormEmail>();

  const onSubmit = async (formData: IFormEmail) => {
    setLoading(true);
    const res = await sendContextMail(formData);
    setLoading(false);
  };
  return (
    <div className="relative flex flex-col w-full max-w-2xl">
      <Divider text="OR" />
      <h2 className="py-3 mx-auto text-lg font-bold tracking-tight">Send Email</h2>
      <form
        className="flex flex-col w-full gap-3"
        onSubmit={handleSubmit(onSubmit)}
      >
        <Input
          type="text"
          labelText="Subject"
          inputPlaceholder="Input Subject"
          register={register("subject", {
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
        <button className="self-end px-5 py-2 mt-2 text-sm font-medium text-white transition-all duration-200 rounded-full shadow-md bg-gradient-to-r from-sky-500 to-indigo-500 dark:from-violet-500 dark:to-fuchsia-500 hover:shadow-lg hover:-translate-y-0.5">
          {loading ? "Sending..." : "Send"}
        </button>
      </form>
    </div>
  );
};
export default EmailForm;
