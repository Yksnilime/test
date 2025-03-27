import React from "react";
import { useGlobalContext } from "@/ContextApi";

export default function ConfirmationWindow({
  text,
  onConfirm,
}: {
  text: string;
  onConfirm: () => void;
}) {
  const {
    openConfirmationWindowObject: { openConfirmationWindow, setOpenConfirmationWindow },
    darkModeObject: { darkMode },
  } = useGlobalContext();

  return (
    <div
      style={{
        left: "0",
        right: "0",
        marginLeft: "auto",
        marginRight: "auto",
        top: "100px",
      }}
      className={`${
        openConfirmationWindow ? "fixed" : "hidden"
      } max-sm:w-[350px] w-[500px] shadow-md ${
        darkMode[1].isSelected ? "bg-slate-800 text-white" : "bg-white border"
      } z-50 p-6 rounded-lg`}
    >
      <div className="text-center">
        <h3 className="text-lg font-semibold text-slate-700 dark:text-slate-200">
          Confirm Action
        </h3>
        <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
          {text}
        </p>
      </div>

      <div className="mt-6 flex justify-end gap-3">
        <button
          onClick={() => setOpenConfirmationWindow(false)}
          className="px-4 py-2 text-sm text-slate-600 hover:text-slate-700 border rounded-full transition-colors"
        >
          Cancel
        </button>
        <button
          onClick={() => {
            onConfirm();
            setOpenConfirmationWindow(false);
          }}
          className={`px-4 py-2 text-sm rounded-full transition-colors ${
            darkMode[1].isSelected
              ? "bg-white/85 text-slate-900 hover:bg-white"
              : "bg-[#092C4C] text-white hover:bg-[#0A3459]"
          }`}
        >
          Confirm
        </button>
      </div>
    </div>
  );
}
