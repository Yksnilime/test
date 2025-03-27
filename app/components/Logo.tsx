import React from "react";
import { useGlobalContext } from "@/ContextApi";

export default function Logo() {
  const { darkModeObject: { darkMode } } = useGlobalContext();
  
  return (
    <div className="flex items-center gap-2">
      <div className={`text-2xl font-bold ${
        darkMode[1].isSelected ? "text-white" : "text-[#092C4C]"
      }`}>
        Bitvault
      </div>
    </div>
  );
} 