"use client";

import { UserButton } from "@clerk/nextjs";
import Sidebar from "./Components/Sidebar/Sidebar";
import ContentArea from "./Components/ContentArea/ContentArea";
import toast, { Toaster } from "react-hot-toast";
import { useGlobalContext } from "@/ContextApi";
import ConfirmationWindow from "../ConfirmationWindow";
import TagsWindow from "./Components/TagsWindow/TagsWindow";
import AddTagWindow from "./Components/TagsWindow/AddTagWindow";

export default function Page() {
  const {
    darkModeObject: { darkMode },
    openConfirmationWindowObject: { openConfirmationWindow },
    openNewTagsWindowObject: { openNewTagsWindow },
    openTagsWindowObject: { openTagsWindow },
  } = useGlobalContext();

  return (
    <div className="flex">
      {openConfirmationWindow && (
        <div className="fixed w-full h-full bg-black z-50 opacity-20"></div>
      )}

      {openNewTagsWindow && (
        <div className="fixed w-full h-full bg-black z-50 opacity-20"></div>
      )}

      {openTagsWindow && (
        <div className="fixed w-full h-full bg-black z-20 opacity-20"></div>
      )}

      <AddTagWindow />
      <TagsWindow />
      <ConfirmationWindow />
      <Toaster
        toastOptions={{
          style: {
            backgroundColor: darkMode[1].isSelected ? "#1E293B" : "white",
            color: darkMode[1].isSelected ? "white" : "black",
          },
        }}
      />
      <Sidebar />
      <ContentArea />
    </div>
  );
}
