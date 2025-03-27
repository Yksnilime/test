"use client";

import React from "react";
import { useGlobalContext } from "@/ContextApi";
import LightModeOutlinedIcon from "@mui/icons-material/LightModeOutlined";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";

export default function DarkMode() {
  const {
    darkModeObject: { darkMode, setDarkMode },
  } = useGlobalContext();

  function handleDarkMode(index: number) {
    const updatedDarkMode = darkMode.map((item, i) => ({
      ...item,
      isSelected: i === index,
    }));
    setDarkMode(updatedDarkMode);
  }

  return (
    <div className="flex gap-2">
      {darkMode.map((item, index) => (
        <div
          key={index}
          onClick={() => handleDarkMode(index)}
          className={`p-[6px] rounded-full cursor-pointer transition-colors ${
            item.isSelected
              ? index === 1
                ? "bg-white/85 text-slate-900"
                : "bg-[#092C4C] text-white"
              : "text-slate-400"
          }`}
        >
          {item.icon}
        </div>
      ))}
    </div>
  );
}
