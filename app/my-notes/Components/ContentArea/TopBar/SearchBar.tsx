import React from "react";
import SearchIcon from "@mui/icons-material/Search";
import { useGlobalContext } from "@/ContextApi";
import AddIcon from "@mui/icons-material/Add";

export default function SearchBar() {
  const {
    openContentNoteObject: { openContentNote, setOpenContentNote },
    isNewNoteObject: { setIsNewNote },
    darkModeObject: { darkMode },
  } = useGlobalContext();

  return (
    <div className="flex justify-between items-center">
      <div className={`flex items-center gap-2 p-2 px-3 rounded-full w-[300px] ${
        darkMode[1].isSelected ? "bg-slate-700" : "bg-slate-100"
      }`}>
        <SearchIcon className="text-[#092C4C]" sx={{ fontSize: 13 }} />
        <input
          placeholder="Search for notes..."
          className={`text-[12px] outline-none bg-transparent w-full ${
            darkMode[1].isSelected 
              ? "text-white placeholder:text-slate-400" 
              : "text-slate-900 placeholder:text-slate-500"
          }`}
        />
      </div>
      <button
        onClick={() => {
          setOpenContentNote(true);
          setIsNewNote(true);
        }}
        className={`flex gap-1 text-[13px] p-[6px] px-4 rounded-full items-center cursor-pointer select-none transition-colors ${
          darkMode[1].isSelected
            ? openContentNote
              ? "bg-white/60 text-slate-900"
              : "bg-white/85 text-slate-900 hover:bg-white"
            : openContentNote
            ? "bg-[#0A3459] text-white"
            : "bg-[#092C4C] text-white hover:bg-[#0A3459]"
        }`}
      >
        <AddIcon sx={{ fontSize: 16 }} />
        <span>New Note</span>
      </button>
    </div>
  );
}
