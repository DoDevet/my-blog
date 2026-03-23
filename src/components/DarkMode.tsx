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
      className="p-2 transition-colors rounded-lg cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-800"
      onClick={onClick}
    >
      {mounted === "light" ? (
        <BsMoon className="w-5 h-5" />
      ) : (
        <BsSun className="w-5 h-5 text-yellow-400" />
      )}
    </div>
  );
};

export default DarkMode;
