"use client";
import { BsSun } from "react-icons/bs";
const DarkMode = () => {
  return (
    <div className="px-2 transition-colors cursor-pointer hover:text-slate-400">
      <BsSun className="w-6 h-6" />
    </div>
  );
};

export default DarkMode;
