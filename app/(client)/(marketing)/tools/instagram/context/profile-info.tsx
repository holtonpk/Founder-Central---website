"use client";

import React, {useContext, createContext, useState, useEffect} from "react";

const ProfileInfoContext = createContext<ProfileInfoContextValue | null>(null);

export function useProfileInfo() {
  return useContext(ProfileInfoContext);
}

interface Props {
  children?: React.ReactNode;
}

export const ProfileInfoProvider = ({children}: Props) => {
  const defaultPageInfo = {
    profilePicture: null,
    userName: "User_name",
    verified: true,
    name: "Name",
    category: "Category",
    bio: "👨‍💻 The #1 place for young founders \n 💼 Making business NOT boring.\n ⛽️Sharing success stories, insights and inspos \n Get the book here 👇",
    link: "www.foundercentral.co",
    postsCount: 100,
    followerCount: 100,
    followingCount: 100,
    highlights: [],
    posts: [],
  };

  const storedPageInfo =
    typeof window !== "undefined" ? localStorage.getItem("PageInfo") : null;

  const [PageInfo, setPageInfo] = React.useState<any>(
    storedPageInfo ? JSON.parse(storedPageInfo as string) : defaultPageInfo
  );

  useEffect(() => {
    console.log("PI", PageInfo.profilePicture);
    localStorage.setItem("PageInfo", JSON.stringify(PageInfo));
  }, [PageInfo]);

  const [mode, setMode] = React.useState<"dark" | "light">("light");

  const values = {
    PageInfo,
    setPageInfo,
    mode,
    setMode,
  };

  return (
    <ProfileInfoContext.Provider value={values}>
      {children}
    </ProfileInfoContext.Provider>
  );
};

export default ProfileInfoContext;

interface ProfileInfoContextValue {
  PageInfo: any; // Add a more specific type if possible
  setPageInfo: React.Dispatch<React.SetStateAction<any>>;
  mode: "dark" | "light";
  setMode: React.Dispatch<React.SetStateAction<"dark" | "light">>;
}
