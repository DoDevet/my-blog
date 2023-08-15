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
      <h1 className="py-3 mx-auto font-semibold">Send Email</h1>
      <form
        className="flex flex-col w-full space-y-1"
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
        <button className="absolute px-2 py-1 text-white transition-colors rounded-md bg-sky-500 dark:bg-indigo-500 right-1 -bottom-9 hover:bg-sky-600 dark:hover:bg-indigo-600">
          {loading ? "Sending..." : "Send"}
        </button>
      </form>
    </div>
  );
};
export default EmailForm;
