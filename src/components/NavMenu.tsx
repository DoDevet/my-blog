"use client";
import { AiOutlineMenu } from "react-icons/ai";
import { useState } from "react";
import Modal from "./Modal";
import { cls } from "@/libs/utils";

const NavMenu = () => {
  const [modal, setModal] = useState(false);
  const onClickMenu = () => {
    setModal((prev) => !prev);
  };
  return (
    <div className="" onClick={onClickMenu}>
      <AiOutlineMenu
        className={cls(
          "w-8 h-8 p-1 transition-colors cursor-pointer md:hidden hover:text-slate-400 rounded-md",
          modal ? "bg-slate-400" : ""
        )}
      />
      {modal && <Modal />}
    </div>
  );
};

export default NavMenu;
