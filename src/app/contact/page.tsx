import EmailForm from "@/components/contact/EmailForm";
import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Contact",
};
const ContactPage = () => {
  return (
    <section className="flex flex-col items-center justify-center max-w-2xl mx-auto space-y-6 py-8">
      <div className="text-center space-y-2">
        <h1 className="text-3xl font-bold tracking-tight">Contact Me</h1>
        <p className="text-gray-500 dark:text-gray-400">Feel free to reach out</p>
      </div>

      <div className="flex flex-col items-center gap-3 p-6 w-full rounded-xl bg-white dark:bg-[#2d2d2f] shadow-sm">
        <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-300">
          <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
          </svg>
          <span>ehwlgns000@gmail.com</span>
        </div>
        <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-300">
          <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
          </svg>
          <span>010-9271-3943</span>
        </div>
        <Link href="https://github.com/DoDevet" className="mt-2 transition-opacity hover:opacity-70">
          <svg
            height="28"
            aria-hidden="true"
            viewBox="0 0 16 16"
            version="1.1"
            width="28"
            data-view-component="true"
            className="octicon octicon-mark-github v-align-middle color-fg-default dark:fill-white"
          >
            <path d="M8 0c4.42 0 8 3.58 8 8a8.013 8.013 0 0 1-5.45 7.59c-.4.08-.55-.17-.55-.38 0-.27.01-1.13.01-2.2 0-.75-.25-1.23-.54-1.48 1.78-.2 3.65-.88 3.65-3.95 0-.88-.31-1.59-.82-2.15.08-.2.36-1.02-.08-2.12 0 0-.67-.22-2.2.82-.64-.18-1.32-.27-2-.27-.68 0-1.36.09-2 .27-1.53-1.03-2.2-.82-2.2-.82-.44 1.1-.16 1.92-.08 2.12-.51.56-.82 1.28-.82 2.15 0 3.06 1.86 3.75 3.64 3.95-.23.2-.44.55-.51 1.07-.46.21-1.61.55-2.33-.66-.15-.24-.6-.83-1.23-.82-.67.01-.27.38.01.53.34.19.73.9.82 1.13.16.45.68 1.31 2.69.94 0 .67.01 1.3.01 1.49 0 .21-.15.45-.55.38A7.995 7.995 0 0 1 0 8c0-4.42 3.58-8 8-8Z"></path>
          </svg>
        </Link>
      </div>

      <EmailForm />
    </section>
  );
};

export default ContactPage;
