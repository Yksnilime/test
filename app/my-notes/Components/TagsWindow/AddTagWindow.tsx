"use client";

import React, { useState, useEffect, useRef } from "react";
import CloseIcon from "@mui/icons-material/Close";
import StyleOutlinedIcon from "@mui/icons-material/StyleOutlined";
import { useGlobalContext } from "@/ContextApi";
import { v4 as uuidv4 } from "uuid";
import ErrorOutlineOutlinedIcon from "@mui/icons-material/ErrorOutlineOutlined";
import { SingleNoteType, SingleTagType } from "@/app/Types";
import toast from "react-hot-toast";
import { allLanguages } from "@/app/localData/Languages";

const tagSuggestions = [
  "TimeTravelAlgorithm",
  "QuantumComputing",
  "AIEthics",
  "BugSquasher",
  "CodePoetry",
  "DataWizardry",
  "RoboticsDreams",
  "CyberSecurity",
  "CloudNinja",
  "BlockchainMagic",
  "IoTInnovation",
  "NeuroInterface",
  "GreenCode",
  "SpaceExplorationAI",
  "VRWorldBuilder",
  "MachineLearningArt",
  "CryptoAlchemy",
  "BioInformatics",
  "AugmentedReality",
  "EthicalHacking",
];
function AddTagWindow() {
  const {
    openNewTagsWindowObject: { openNewTagsWindow, setOpenNewTagsWindow },
    darkModeObject: { darkMode },
    selectedTagToEditObject: { selectedTagToEdit, setSelectedTagToEdit },
  } = useGlobalContext();

  const [tagName, setTagName] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  function onInputChange(e: React.ChangeEvent<HTMLInputElement>) {
    const newValue = e.target.value;
    setErrorMessage("");
    setTagName(newValue);
  }

  // Reset the form when the openNewTagsWindow state changes
  useEffect(() => {
    if (openNewTagsWindow) {
      setTagName("");
      setErrorMessage("");
      return;
    }
  }, [openNewTagsWindow]);

  useEffect(() => {
    if (selectedTagToEdit) {
      setTagName(selectedTagToEdit.name);
    }
  }, [selectedTagToEdit]);

  return (
    <div
      style={{
        left: "0",
        right: "0",
        marginLeft: "auto",
        marginRight: "auto",
        top: "100px",
      }}
      className={`${openNewTagsWindow ? "fixed" : "hidden"} max-sm:w-[350px] w-[500px] shadow-md ${darkMode[1].isSelected ? "bg-slate-800 text-white" : "bg-white border"}     z-50 p-6 rounded-lg`}
    >
      <Header />
      <AddTagInput
        tagName={tagName}
        onInputChange={onInputChange}
        errorMessage={errorMessage}
        setErrorMessage={setErrorMessage}
      />
      <ButtonGroup tagName={tagName} setErrorMessage={setErrorMessage} />
    </div>
  );
}

export default AddTagWindow;

function Header() {
  const {
    openNewTagsWindowObject: { setOpenNewTagsWindow },
    selectedTagToEditObject: { selectedTagToEdit, setSelectedTagToEdit },
  } = useGlobalContext();

  return (
    <div className="flex justify-between items-center rounded-lg ">
      <div className="flex items-center gap-2">
        {/* <StyleOutlinedIcon className="text-slate-600" /> */}
        <span className="text-[18px] text-slate-600 font-bold">
          {selectedTagToEdit ? "Edit Tag" : "Add New Tag"}
        </span>
      </div>
      <div>
        <CloseIcon
          sx={{ fontSize: 15 }}
          className="text-slate-400 cursor-pointer"
          onClick={() => {
            setOpenNewTagsWindow(false), setSelectedTagToEdit(null);
          }}
        />
      </div>
    </div>
  );
}

function AddTagInput({
  tagName,
  onInputChange,
  errorMessage,
  setErrorMessage,
}: {
  tagName: string;
  onInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  errorMessage: string;
  setErrorMessage: (errorMessage: string) => void;
}) {
  const {
    openNewTagsWindowObject: { openNewTagsWindow },
    darkModeObject: { darkMode },
  } = useGlobalContext();

  const [placeholder, setPlaceholder] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    inputRef.current?.focus();
    const randomIndex = Math.floor(Math.random() * tagSuggestions.length);
    setPlaceholder(`e.g., ${tagSuggestions[randomIndex]}`);
  }, [openNewTagsWindow]);

  useEffect(() => {
    inputRef.current?.focus();
  }, [errorMessage, setErrorMessage]);

  return (
    <div className="mt-6">
      <span className="text-slate-400 text-sm font-semibold">Tag Name</span>
      <input
        ref={inputRef}
        value={tagName}
        onChange={(e) => onInputChange(e)}
        placeholder={placeholder}
        className={`${darkMode[1].isSelected ? "bg-slate-700" : "bg-white border"} w-full  rounded-md p-2 mt-1 text-[12px] outline-none text-slate-600`}
      />
      {errorMessage.length > 0 && (
        <div className="text-red-500 flex mt-2 gap-1 items-center ">
          <ErrorOutlineOutlinedIcon fontSize="small" className=" " />
          <span className="text-red-500 text-[11px]">{errorMessage}</span>
        </div>
      )}
    </div>
  );
}

function ButtonGroup({
  tagName,
  setErrorMessage,
}: {
  tagName: string;
  setErrorMessage: (e: string) => void;
}) {
  const {
    openNewTagsWindowObject: { setOpenNewTagsWindow },
    allTagsObject: { allTags, setAllTags },
    selectedTagToEditObject: { selectedTagToEdit, setSelectedTagToEdit },
    allNotesObject: { allNotes, setAllNotes },
    tagsClickedObject: { tagsClicked, setTagsClicked },
    sharedUserIdObject: { sharedUserId },
    darkModeObject: { darkMode },
  } = useGlobalContext();

  function handleClickedTag() {
    // Check if the tag already exists

    if (tagName.trim().length === 0) {
      setErrorMessage("Tag name is still empty!");
      return;
    }

    if (!allTags.some((tag) => tag.name === tagName)) {
      if (!selectedTagToEdit) {
        addNewTagFunction(
          allTags,
          setAllTags,
          setOpenNewTagsWindow,
          tagName,
          sharedUserId
        );
      } else {
        handleEditTag(
          allTags,
          setAllTags,
          setOpenNewTagsWindow,
          selectedTagToEdit,
          setSelectedTagToEdit,
          tagName,
          allNotes,
          setAllNotes
        );
      }

      let newTagClicked = [];
      newTagClicked.push("All");
      setTagsClicked(newTagClicked);
    } else {
      setErrorMessage("Tag already exists");
    }
  }

  return (
    <div className="flex justify-end mt-6 gap-2 text-[12px]">
      <button
        onClick={() => {
          setOpenNewTagsWindow(false);
          setSelectedTagToEdit(null);
        }}
        className="px-4 py-2 text-slate-600 border rounded-full hover:bg-slate-100 transition-colors"
      >
        Cancel
      </button>
      <button
        onClick={handleClickedTag}
        className={`px-4 py-2 rounded-full transition-colors ${
          darkMode[1].isSelected 
            ? "text-slate-900 bg-white/85 hover:bg-white" 
            : "text-white bg-[#092C4C] hover:bg-[#0A3459]"
        }`}
      >
        {selectedTagToEdit ? "Edit Tag" : "Add Tag"}
      </button>
    </div>
  );
}
async function addNewTagFunction(
  allTags: SingleTagType[],
  setAllTags: (value: React.SetStateAction<SingleTagType[]>) => void,
  setOpenNewTagsWindow: (value: React.SetStateAction<boolean>) => void,
  tagName: string,
  sharedUserId: string
) {
  const newTag = {
    name: tagName,
    userId: "demo-user",
  };

  try {
    const response = await fetch("/api/tags", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newTag),
    });

    if (!response.ok) {
      throw new Error("Failed to create tag");
    }

    const data = await response.json();
    const createdTag = data.tag;

    setAllTags((prevTags) => [...prevTags, createdTag]);
    setOpenNewTagsWindow(false);
    toast.success("Tag created successfully!");
  } catch (error) {
    console.error("Error creating tag:", error);
    toast.error("Failed to create tag");
  }
}

//Edit The Tag in the database
//---------------------------

async function updateNote(
  note: SingleNoteType,
  oldTagName: string,
  newTagName: string
) {
  const updatedTags = note.tags.map((tag) =>
    tag.name.toLowerCase() === oldTagName.toLowerCase()
      ? { ...tag, name: newTagName }
      : tag
  );
  const updateNoteResponse = await fetch(
    `/api/snippets?snippetId=${note._id}`,
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        ...note,
        tags: updatedTags,
      }),
    }
  );

  if (!updateNoteResponse.ok) {
    throw new Error(`Failed to update note ${note._id}`);
  }

  const updatedNote = await updateNoteResponse.json();
  return updatedNote.note;
}

async function handleEditTag(
  allTags: SingleTagType[],
  setAllTags: (value: React.SetStateAction<SingleTagType[]>) => void,
  setOpenNewTagsWindow: (value: React.SetStateAction<boolean>) => void,
  selectedTagToEdit: SingleTagType,
  setSelectedTagToEdit: (
    value: React.SetStateAction<SingleTagType | null>
  ) => void,
  newTagName: string,
  allNotes: SingleNoteType[],
  setAllNotes: (value: React.SetStateAction<SingleNoteType[]>) => void
) {
  try {
    const response = await fetch("/api/tags", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        _id: selectedTagToEdit._id,
        name: newTagName,
        userId: "demo-user",
      }),
    });

    if (!response.ok) {
      throw new Error("Failed to update tag");
    }

    const data = await response.json();
    const updatedTag = data.tag;

    // Update the tag in allTags state
    setAllTags((prevTags) =>
      prevTags.map((tag) =>
        tag._id === selectedTagToEdit._id ? updatedTag : tag
      )
    );

    // Update the tag in all notes
    const updatedNotes = allNotes.map((note) => {
      const updatedTags = note.tags.map((tag) =>
        tag._id === selectedTagToEdit._id ? updatedTag : tag
      );
      return { ...note, tags: updatedTags };
    });

    setAllNotes(updatedNotes);
    setOpenNewTagsWindow(false);
    setSelectedTagToEdit(null);
    toast.success("Tag updated successfully!");
  } catch (error) {
    console.error("Error updating tag:", error);
    toast.error("Failed to update tag");
  }
}
