"use client";
import { BsSun, BsMoon } from "react-icons/bs";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

const DarkMode = () => {
  const [mounted, setMounted] = useState<string>("dark");
  const { theme, setTheme } = useTheme();

  const onClick = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };
  useEffect(() => {
    if (theme && theme !== mounted) setMounted(theme);
  }, [theme, setMounted, mounted]);

  return (
    <div
      className="transition-colors cursor-pointer  hover:text-slate-400"
      onClick={onClick}
    >
      {mounted === "light" ? (
        <BsMoon className="w-8 h-8 p-1" />
      ) : (
        <BsSun className="w-8 h-8 p-1" />
      )}
    </div>
  );
};

export default DarkMode;
