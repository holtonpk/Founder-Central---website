"use client";
import React, {useEffect} from "react";
import ToolBar from "./components/tool-bar";
import ProfileDetails from "./components/profile-details";
import Posts from "./components/posts";
import Highlights from "./components/highlights";
import {ProfileInfoProvider} from "./context/profile-info";
import InstagramUi, {ScreenShotCanvas} from "./components/instagram-ui";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/app/(client)/components/ui/tabs";

const ProfileEditor = () => {
  return (
    <ProfileInfoProvider>
      <ScreenShotCanvas />
      <div className="grid grid-cols-[30%_70%]  w-full">
        <div className="flex flex-col gap-2  ">
          <div className="min-h-fit max-h-full overflow-scroll w-fit rounded-r-md flex flex-col items-start border bg-white shadow-lg relative gap-4 p-4">
            <ProfileDetails />
            <div className="absolute top-2 right-2 z-20">
              <ToolBar />
            </div>
          </div>
        </div>
        <div className="flex flex-col items-center justify-center gap-4 pt-1 h-fit w-full relative ">
          <div className="w-[80%] aspect-[8/6]  relative">
            <InstagramUi />
          </div>

          {/* <div className=" w-full h-screen wrap overflow-hidden flex flex-row gap-10 justify-between scale-75 border  shadow-lg">
            <InstagramUi />
          </div> */}
        </div>
      </div>
    </ProfileInfoProvider>
  );
};

export default ProfileEditor;
