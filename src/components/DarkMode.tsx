"use client";
import { BsSun, BsMoon } from "react-icons/bs";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

const DarkMode = () => {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();
  const onClick = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted)
    return (
      <div className="px-2 transition-colors cursor-pointer hover:text-slate-400">
        <BsSun className="w-6 h-6 " />
      </div>
    );
  return (
    <div
      className="px-2 transition-colors cursor-pointer hover:text-slate-400"
      onClick={onClick}
    >
      {theme === "dark" ? (
        <BsMoon className="w-6 h-6" />
      ) : (
        <BsSun className="w-6 h-6" />
      )}
    </div>
  );
};

export default DarkMode;
