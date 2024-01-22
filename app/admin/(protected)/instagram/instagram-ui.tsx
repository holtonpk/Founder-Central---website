"use client";

import React from "react";
import {Icons} from "@/app/admin/components/icons";
import {Button} from "@/app/admin/components/ui/button";

const InstagramUi = () => {
  const [mode, setMode] = React.useState<"dark" | "light">("dark");

  return (
    <>
      <div className="flex flex-col gap-8">
        <div className=" w-full h-[69vh] relative overflow-hidden flex flex-row  justify-between">
          <DesktopDisplay mode={mode} />
          <MobileDisplay mode={mode} />
        </div>
      </div>
      <div className="flex flex-col gap-2">
        <ToolBar mode={mode} setMode={setMode} />
        <div className="h-full w-full border rounded-md"></div>
      </div>
    </>
  );
};

export default InstagramUi;

const DesktopDisplay = ({mode}: {mode: "dark" | "light"}) => {
  const textColor = mode === "dark" ? "text-white" : "text-black";
  const fillColor = mode === "dark" ? "white" : "black";

  return (
    <div
      className={`aspect-[8/6] pt-4 rounded-md relative h-full flex flex-col overflow-scroll ${textColor}
  ${mode === "dark" ? "bg-black" : "bg-white"}
  
  `}
    >
      <div className="flex items-center w-[90%]  ">
        <div className="p-20">
          <div
            className={`bg-gray-500 rounded-full h-[150px] aspect-square ring-offset-20 ring-[1px]  border-2 
        
        ${
          mode == "dark"
            ? "ring-[#333333] border-black"
            : "ring-[#DBDBDB] border-white"
        }`}
          ></div>
        </div>
        <div className="flex flex-col h-fit flex-grow ">
          <div className="flex flex-row items-center justify-between">
            <h1>User_name</h1>
            <Button className=" bg-[#1877F2]">Follow</Button>
            <Button
              className={`${
                mode === "dark" ? "bg-[#363636]" : "bg-[#EFEFEF] text-black"
              } `}
            >
              Message
            </Button>

            <Icons.moreHor
              className={`h-6 w-6  ${
                mode === "dark" ? "text-white" : "text-black"
              } `}
            />
          </div>
          <div className="flex justify-between mt-3">
            <h1>
              <span className="font-bold">100</span> posts
            </h1>
            <h1>
              <span className="font-bold">100</span> followers
            </h1>
            <h1>
              <span className="font-bold">100</span> following
            </h1>
          </div>
          <h1>Name</h1>
          <h1
            className={`
          ${mode === "dark" ? "text-[#A0A0A0]" : "text-[#737373]"}
          `}
          >
            Category
          </h1>
          <p>
            👨‍💻 The #1 place for young founders <br /> 💼 Making business NOT
            boring. <br /> ⛽️Sharing success stories, insights and inspos
            <br />
            <br />
            Get the book here 👇
          </p>
          <div className="flex items-center gap-1 text-[#00376B]">
            <Icons.link2 className="w-4 h-4" />
            www.foundercentral.co
          </div>
        </div>
      </div>

      <div className="flex flex-row items-center gap-6 p-6 pl-10">
        <StoryButton mode={mode} title="story 1" />
        <StoryButton mode={mode} title="story 2" />
        <StoryButton mode={mode} title="story 3" />
        <StoryButton mode={mode} title="story 4" />
        <StoryButton mode={mode} title="story 5" />
      </div>
      <div
        className={`w-full border-t  mt-auto justify-center flex flex-row mb-2
      ${mode === "dark" ? "border-[#262626]" : "border-[#DBDBDB]"}
      `}
      >
        <div className="w-full h-8 flex flex-row justify-center items-center gap-20">
          <div
            className={`w-fit h-full flex flex-row justify-center items-center border-t gap-2 uppercase
          ${mode === "dark" ? "border-t-white" : "border-t-black"}
          `}
          >
            <Icons.grid className="w-4 h-4" />
            Posts
          </div>
          <div className="w-fit h-full flex flex-row justify-center items-center gap-2 uppercase opacity-50">
            <Icons.reel className="w-4 h-" fill={fillColor} />
            Reels
          </div>
          <div className="w-fit h-full flex flex-row justify-center items-center gap-2 uppercase opacity-50">
            <Icons.tagged className="w-4 h-4" fill={fillColor} />
            Tagged
          </div>
        </div>
      </div>
      <PostGrid />
    </div>
  );
};

const StoryButton = ({
  mode,
  title,
}: {
  mode: "dark" | "light";
  title: string;
}) => {
  return (
    <div className="flex flex-col items-center gap-1">
      <div
        className={`bg-gray-500 rounded-full h-16 w-16 ring-offset-20 ring-[1px]  border-2 
        
        ${
          mode == "dark"
            ? "ring-[#333333] border-black"
            : "ring-[#DBDBDB] border-white"
        }`}
      ></div>
      {title}
    </div>
  );
};

const MobileDisplay = ({mode}: {mode: "dark" | "light"}) => {
  return (
    <div
      className={` aspect-[9/19]  h-full rounded-md relative flex flex-col overflow-scroll
  ${mode === "dark" ? "bg-black" : "bg-white"}
  `}
    >
      <PostGrid />
    </div>
  );
};

const ToolBar = ({
  mode,
  setMode,
}: {
  mode: "dark" | "light";
  setMode: React.Dispatch<React.SetStateAction<"dark" | "light">>;
}) => {
  return (
    <div className="flex  items-center space-x-2">
      <Button
        className={` flex items-center justify-center p-2 rounded-md gap-1 border
      `}
        onClick={() => setMode((prev) => (prev === "dark" ? "light" : "dark"))}
      >
        {mode === "light" ? (
          <>
            <Icons.moon className="w-4 h-4" />
            Dark
          </>
        ) : (
          <>
            <Icons.sun className="w-4 hs-4" />
            Light
          </>
        )}
      </Button>
      <Button className="gap-1 border" variant="">
        <Icons.camera className="w-4 h-4" />
        Screenshot
      </Button>
    </div>
  );
};

const PostGrid = () => {
  return (
    <div className="w-full h-20 gap-1 grid grid-cols-3 ">
      <div className="bg-gray-500 aspect-square"></div>
      <div className="bg-gray-500 aspect-square"></div>
      <div className="bg-gray-500 aspect-square"></div>
      <div className="bg-gray-500 aspect-square"></div>
      <div className="bg-gray-500 aspect-square"></div>
      <div className="bg-gray-500 aspect-square"></div>
    </div>
  );
};
