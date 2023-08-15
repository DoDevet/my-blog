"use client";
import { AiOutlineMenu, AiOutlineClose } from "react-icons/ai";
import { useState } from "react";
import Modal from "./Modal";
import { cls } from "@/libs/utils";
import { AnimatePresence } from "framer-motion";

const NavMenu = () => {
  const [modal, setModal] = useState(false);
  const onClickMenu = () => {
    setModal((prev) => !prev);
  };
  return (
    <div onClick={onClickMenu}>
      {!modal ? (
        <AiOutlineMenu
          className={cls(
            "w-8 h-8 p-1 transition-colors cursor-pointer md:hidden rounded-md",
            modal ? "bg-slate-400" : "hover:text-slate-400"
          )}
        />
      ) : (
        <AiOutlineClose
          className={cls(
            "w-8 h-8 p-1 transition-colors cursor-pointer md:hidden rounded-md",
            modal ? "bg-slate-400" : "hover:text-slate-400"
          )}
        />
      )}

      <AnimatePresence initial={false} mode="wait">
        {modal && <Modal />}
      </AnimatePresence>
    </div>
  );
};

export default NavMenu;
