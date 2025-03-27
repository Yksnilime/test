"use client";

import React, { useEffect, useRef, useState } from "react";
import CloseIcon from "@mui/icons-material/Close";
import SearchRoundedIcon from "@mui/icons-material/SearchRounded";
import StyleOutlinedIcon from "@mui/icons-material/StyleOutlined";
import AddOutlinedIcon from "@mui/icons-material/AddOutlined";
import EditRoundedIcon from "@mui/icons-material/EditRounded";
import DeleteRoundedIcon from "@mui/icons-material/DeleteRounded";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import DragIndicatorOutlinedIcon from "@mui/icons-material/DragIndicatorOutlined";
import { useGlobalContext } from "@/ContextApi";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { SingleNoteType, SingleTagType } from "@/app/Types";
import toast from "react-hot-toast";
import EmptyPlaceHolder from "@/app/EmptyPlaceHolder";
import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

function TagsWindow() {
  const {
    openTagsWindowObject: { openTagsWindow, setOpenTagsWindow },
    darkModeObject: { darkMode },
    allTagsObject: { allTags, setAllTags },
    allNotesObject: { allNotes, setAllNotes },
    openNewTagsWindowObject: { setOpenNewTagsWindow },
    selectedTagToEditObject: { setSelectedTagToEdit },
  } = useGlobalContext();
  const [searchQuery, setSearchQuery] = useState("");

  interface Tag {
    name: string;
  }

  interface TagCount {
    [key: string]: number;
  }

  const countTags = (
    notes: any[],
    allTags: Tag[]
  ): { name: string; count: number }[] => {
    // Initialize tagCount with all tags set to 0
    const tagCount: TagCount = allTags.reduce((acc: TagCount, tag) => {
      acc[tag.name] = 0;
      return acc;
    }, {});

    // Count occurrences of tags in notes
    notes.forEach((note) => {
      note.tags.forEach((tag: Tag) => {
        tagCount[tag.name]++;
      });
    });

    // Convert to array of objects and update "All" count
    return allTags
      .map((tag) => {
        if (tag.name === "All") {
          return { name: "All", count: allNotes.length }; // Set count to 7 for "All"
        }
        return { name: tag.name, count: tagCount[tag.name] };
      })
      .sort((a, b) => b.count - a.count);
  };

  const sortAllTags = (
    notes: SingleNoteType[],
    allTags: SingleTagType[]
  ): SingleTagType[] => {
    // First, get the count of tags
    const tagCounts = countTags(notes, allTags);

    // Create a map for quick lookup of counts
    const countMap = new Map(tagCounts.map((item) => [item.name, item.count]));

    // Sort the allTags array
    return [...allTags].sort((a, b) => {
      // Always keep "All" at the top
      if (a.name === "All") return -1;
      if (b.name === "All") return 1;

      // Sort by count (descending), then alphabetically if counts are equal
      const countDiff =
        (countMap.get(b.name) || 0) - (countMap.get(a.name) || 0);
      return countDiff !== 0 ? countDiff : a.name.localeCompare(b.name);
    });
  };

  // Usage
  const sortedTags: SingleTagType[] = sortAllTags(allNotes, allTags);

  //This useEffect will clear the search query if something changes in the allTags Array
  useEffect(() => {
    setSearchQuery("");
  }, [allTags]);

  useEffect(() => {
    setAllTags(sortedTags);
  }, [allNotes]);

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
        openTagsWindow ? "fixed" : "hidden"
      } max-sm:w-[350px] w-[500px] shadow-md ${
        darkMode[1].isSelected ? "bg-slate-800 text-white" : "bg-white border"
      } z-50 p-6 rounded-lg`}
    >
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-2">
          <StyleOutlinedIcon className="text-slate-600" />
          <span className="text-[18px] text-slate-600 font-bold">All Tags</span>
        </div>
        <CloseIcon
          sx={{ fontSize: 15 }}
          className="text-slate-400 cursor-pointer"
          onClick={() => setOpenTagsWindow(false)}
        />
      </div>

      <div className="mt-6 flex justify-between items-center">
        <span className="text-slate-400 text-sm">
          {allTags.length} tags available
        </span>
        <button
          onClick={() => {
            setOpenNewTagsWindow(true);
            setOpenTagsWindow(false);
          }}
          className={`flex gap-1 text-[13px] p-[6px] px-4 rounded-full items-center cursor-pointer select-none transition-colors ${
            darkMode[1].isSelected
              ? "bg-white/85 text-slate-900 hover:bg-white"
              : "bg-[#092C4C] text-white hover:bg-[#0A3459]"
          }`}
        >
          <AddIcon sx={{ fontSize: 16 }} />
          <span>New Tag</span>
        </button>
      </div>

      <div className="mt-6">
        {allTags.map((tag, index) => (
          <div
            key={index}
            className="flex justify-between items-center p-3 hover:bg-slate-50 rounded-lg group"
          >
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-[#092C4C] rounded-full"></div>
              <span className="text-slate-600 text-sm">{tag.name}</span>
            </div>
            <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
              <EditIcon
                sx={{ fontSize: 18 }}
                className="text-slate-400 cursor-pointer hover:text-[#092C4C]"
                onClick={() => {
                  setSelectedTagToEdit(tag);
                  setOpenNewTagsWindow(true);
                  setOpenTagsWindow(false);
                }}
              />
              <DeleteIcon
                sx={{ fontSize: 18 }}
                className="text-slate-400 cursor-pointer hover:text-red-500"
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default TagsWindow;
