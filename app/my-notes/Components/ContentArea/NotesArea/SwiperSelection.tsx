import React, { useEffect, useRef, useState } from "react";
import AddOutlinedIcon from "@mui/icons-material/AddOutlined";

// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";

// import required modules
import { FreeMode } from "swiper/modules";
import GlobalContextProvider, { useGlobalContext } from "@/ContextApi";

export default function SwiperSelection() {
  const {
    darkModeObject: { darkMode },
    openNewTagsWindowObject: { setOpenNewTagsWindow },
    allTagsObject: { allTags, setAllTags },
    tagsClickedObject: { tagsClicked, setTagsClicked },
    sideBarMenuObject: { sideBarMenu, setSideBarMenu },
    searchQueryObject: { searchQuery, setSearchQuery },
    isLoadingObject: { isLoading },
  } = useGlobalContext();

  const [tagsSelected, setTagsSelected] = useState<boolean[]>([]);

  useEffect(() => {
    if (searchQuery.trim().length === 0) {
      const newTagsSelected = Array(allTags.length).fill(false);
      newTagsSelected[0] = true;
      setTagsSelected(newTagsSelected);
    }
  }, [searchQuery]);

  useEffect(() => {
    setTagsClicked((prevTagsClicked) => {
      const newTagsClicked = allTags.reduce(
        (acc, tag, index) => {
          if (tagsSelected[index]) {
            if (!prevTagsClicked.includes(tag.name)) {
              acc.push(tag.name);
            }
          } else {
            if (prevTagsClicked.includes(tag.name)) {
              const tagIndex = acc.indexOf(tag.name);
              if (tagIndex !== -1) {
                acc.splice(tagIndex, 1);
              }
            }
          }
          return acc;
        },
        [...prevTagsClicked]
      );

      return newTagsClicked;
    });
  }, [tagsSelected]);

  //Reset the tagsSelected state when allTags changes
  useEffect(() => {
    if (allTags) {
      const newTagsSelected = Array(allTags.length).fill(false);
      newTagsSelected[0] = true;
      setTagsSelected(newTagsSelected);
    }
  }, [allTags]);

  //Reset the tagsSelected and tagsClicked state when sideBarMenu changes
  useEffect(() => {
    if (sideBarMenu) {
      const newTagsSelected = Array(allTags.length).fill(false);
      const newTagsClicked = ["All"];
      newTagsSelected[0] = true;
      setTagsClicked(newTagsClicked);
      setTagsSelected(newTagsSelected);
    }
  }, [sideBarMenu]);

  const handleTagClick = (index: number) => {
    const newTagsSelected = [...tagsSelected];

    //If I click on All, turn all the other tags to false
    if (index === 0) {
      newTagsSelected[0] = true;
      //Turn all the tags except to all to false
      for (let index = 1; index < newTagsSelected.length; index++) {
        newTagsSelected[index] = false;
      }
      setTagsSelected(newTagsSelected);
      return;
    } else {
      newTagsSelected[0] = false;
      newTagsSelected[index] = !newTagsSelected[index];
      setTagsSelected(newTagsSelected);
    }

    //if all the tags are false, turn the first one to true
    if (newTagsSelected.every((tag) => !tag)) {
      newTagsSelected[0] = true;
      setTagsSelected(newTagsSelected);
    }
  };

  return (
    <div
      className={`${darkMode[1].isSelected ? "bg-slate-800 text-white" : "bg-white"}  p-3 rounded-lg flex gap-5 `}
    >
      {/* Second div */}
      <div className="overflow-x-auto w-[100%]    ">
        {isLoading ? (
          <div className="flex  gap-3 items-center mt-[2px]   ">
            <div className="w-[80px] h-[30px] bg-slate-100 rounded-md"></div>
            <div className="w-[80px] h-[30px] bg-slate-100 rounded-md"></div>
            <div className="w-[80px] h-[30px] bg-slate-100 rounded-md"></div>
          </div>
        ) : (
          <Swiper
            slidesPerView="auto"
            spaceBetween={10}
            freeMode={true}
            className="mySwiper"
            modules={[FreeMode]}
          >
            {allTags.map((tag, index) => (
              <SwiperSlide
                key={index}
                className={`${
                  tagsSelected[index]
                    ? darkMode[1].isSelected
                      ? "bg-white/85 text-slate-900"
                      : "bg-[#092C4C] text-white"
                    : `${
                        darkMode[1].isSelected
                          ? "bg-slate-800"
                          : "bg-white"
                      } hover:text-[#092C4C] text-gray-400`
                } p-1 rounded-full transition-colors`}
                onClick={() => handleTagClick(index)}
              >
                {tag.name}
              </SwiperSlide>
            ))}
          </Swiper>
        )}
      </div>
      <button
        onClick={() => setOpenNewTagsWindow(true)}
        className={`flex gap-1 text-[13px] p-[6px] px-4 rounded-full items-center cursor-pointer select-none transition-colors ${
          darkMode[1].isSelected
            ? "bg-white/85 text-slate-900 hover:bg-white"
            : "bg-[#092C4C] text-white hover:bg-[#0A3459]"
        }`}
      >
        <AddOutlinedIcon sx={{ fontSize: 18 }} />
        <span>Tag</span>
      </button>
    </div>
  );
}
