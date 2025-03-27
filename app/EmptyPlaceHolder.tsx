import React from "react";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import AddOutlinedIcon from "@mui/icons-material/AddOutlined";
import { v4 as uuidv4 } from "uuid";
import { useGlobalContext } from "@/ContextApi";
import { SingleNoteType } from "./Types";

function EmptyPlaceHolder({
  muiIcon,
  text,
  isNew,
}: {
  muiIcon: React.ReactNode;
  text: React.ReactNode;
  isNew?: boolean;
}) {
  const {
    isNewNoteObject: { isNewNote, setIsNewNote },
    selectedNoteObject: { selectedNote, setSelectedNote },
    openContentNoteObject: { openContentNote, setOpenContentNote },
    sharedUserIdObject: { sharedUserId },
    darkModeObject: { darkMode },
  } = useGlobalContext();
  return (
    <div className="  w-full h-[510px] pt-20 flex gap-3 flex-col items-center  ">
      {muiIcon}
      {text}
      {isNew && (
        <button
          onClick={() =>
            OpenTheContentNote(
              setIsNewNote,
              setSelectedNote,
              setOpenContentNote,
              sharedUserId
            )
          }
          className={`flex items-center gap-1 text-[13px] p-[6px] px-4 rounded-full cursor-pointer select-none transition-colors ${
            darkMode[1].isSelected
              ? "bg-white/85 text-slate-900 hover:bg-white"
              : "bg-[#092C4C] text-white hover:bg-[#0A3459]"
          }`}
        >
          <AddOutlinedIcon sx={{ fontSize: 17 }} />
          <span>Add a new snippet</span>
        </button>
      )}
    </div>
  );
}

export default EmptyPlaceHolder;

export function OpenTheContentNote(
  setIsNewNote: React.Dispatch<React.SetStateAction<boolean>>,
  setSelectedNote: React.Dispatch<React.SetStateAction<SingleNoteType | null>>,
  setOpenContentNote: React.Dispatch<React.SetStateAction<boolean>>,
  sharedUserId: string
) {
  function formatDate(date: Date) {
    //format the date to dd month yyyy
    const options: Intl.DateTimeFormatOptions = {
      day: "numeric",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: false,
    };
    return new Intl.DateTimeFormat("en-US", options).format(date);
  }

  // Creating an new note
  const newNote: SingleNoteType = {
    _id: uuidv4(),
    title: "Welcome to Snippet Master!",
    description: "Create your first code snippet by clicking the + button above.",
    code: `// Your code here
function example() {
  console.log("Hello, World!");
}`,
    language: "javascript",
    tags: [
      {
        _id: uuidv4(),
        name: "Getting Started",
        userId: "demo-user",
      },
    ],
    userId: "demo-user",
    creationDate: new Date().toISOString(),
    isFavorite: false,
    isTrash: false,
  };
  setIsNewNote(true);
  setSelectedNote(newNote);
  setOpenContentNote(true);
}
