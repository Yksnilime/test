"use client";

import React from "react";
import BorderAllIcon from "@mui/icons-material/BorderAll";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import DataObjectIcon from "@mui/icons-material/DataObject";
import { SiCplusplus, SiJavascript, SiPython } from "react-icons/si";
import { useGlobalContext } from "@/ContextApi";
import getLanguageIcon from "@/app/utils/languageTextToIcon";
import Logo from "@/app/components/Logo";
import { SideBarMenu as SideBarMenuType } from "@/app/Types";

export default function Sidebar() {
  const {
    darkModeObject: { darkMode },
    isMobileObject: { isMobile },
    sideBarMenuObject: { sideBarMenu },
  } = useGlobalContext();

  return (
    <div
      className={`${
        darkMode[1].isSelected ? "bg-slate-800" : "bg-white"
      } min-h-screen w-[250px] p-4 flex flex-col gap-8 border-r border-slate-100`}
    >
      <Logo />
      <SideBarMenu />
    </div>
  );
}

function SideBarMenu() {
  const {
    sideBarMenuObject: { sideBarMenu, setSideBarMenu },
    darkModeObject: { darkMode },
  } = useGlobalContext();

  function clickedMenu(menu: SideBarMenuType) {
    const updateSideBarMenu = sideBarMenu.map((m) => ({
      ...m,
      isSelected: m.id === menu.id
    }));

    setSideBarMenu(updateSideBarMenu);
  }

  return (
    <div className="flex flex-col gap-2">
      {sideBarMenu.map((menu) => (
        <div
          key={menu.id}
          onClick={() => clickedMenu(menu)}
          className={`flex gap-2 p-2 px-4 rounded-lg cursor-pointer transition-colors ${
            menu.isSelected
              ? darkMode[1].isSelected
                ? "bg-white/85 text-slate-900"
                : "bg-[#092C4C] text-white"
              : darkMode[1].isSelected
              ? "text-white/85 hover:bg-white/10"
              : "text-slate-600 hover:bg-slate-100"
          }`}
        >
          {menu.icons}
          <span>{menu.name}</span>
        </div>
      ))}
    </div>
  );
}

function Languages() {
  const {
    codeLanguageCounterObject: { codeLanguagesCounter },
  } = useGlobalContext();

  return (
    <div className="mt-12 text-sm">
      {codeLanguagesCounter.length > 0 && (
        <>
          <div className="font-bold text-slate-400">Languages</div>
          <div className="mt-5 ml-2 text-slate-400 flex flex-col gap-4">
            {codeLanguagesCounter.map((language, index) => (
              <div key={index} className="flex justify-between">
                <div className="flex gap-2 items-center">
                  {getLanguageIcon(
                    capitalizeFirstOccurrence(language.language)
                  )}
                  <span> {capitalizeFirstOccurrence(language.language)}</span>
                </div>
                <span className="font-bold">{language.count}</span>
              </div>
            ))}

            {/* <div className="flex justify-between">
          <div className="flex gap-1 items-center">
            <SiCplusplus size={15} /> C++
          </div>
          <span className="font-bold">2</span>
        </div> */}
          </div>
        </>
      )}
    </div>
  );
}

function capitalizeFirstOccurrence(str: string) {
  if (!str) return str; // If the string is empty, return it as is.

  for (let i = 0; i < str.length; i++) {
    if (str[i] !== " ") {
      return str.slice(0, i) + str[i].toUpperCase() + str.slice(i + 1);
    }
  }

  return str; // If no non-space characters are found, return the string as is.
}
