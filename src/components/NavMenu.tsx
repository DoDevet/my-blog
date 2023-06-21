"use client";
import { AiOutlineMenu } from "react-icons/ai";
import { useState } from "react";
import Modal from "./Modal";

const NavMenu = () => {
  const [modal, setModal] = useState(false);

  const onClickMenu = () => {
    setModal((prev) => !prev);
  };
  return (
    <div className="" onClick={onClickMenu}>
      <AiOutlineMenu className="w-6 h-6 transition-colors cursor-pointer md:hidden hover:text-slate-400" />
      {modal && <Modal />}
    </div>
  );
};

export default NavMenu;
