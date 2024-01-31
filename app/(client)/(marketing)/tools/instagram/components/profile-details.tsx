"use client";
import React, {useEffect} from "react";
import {Input} from "@/app/(client)/components/ui/input";
import {Label} from "@/app/(client)/components/ui/label";
import {Icons} from "@/app/(client)/components/icons";
import {Textarea} from "@/app/(client)/components/ui/textarea";
import {useProfileInfo} from "../context/profile-info";
import Posts from "./posts";
import Highlights from "./highlights";

const ProfileDetails = () => {
  const {PageInfo, setPageInfo} = useProfileInfo()!;

  const handlePageInfo = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const updatedInfo = {...PageInfo, [e.target.name]: e.target.value};
    setPageInfo({...updatedInfo});
  };

  const saveImageToLocal = (file: File): Promise<void> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();

      reader.onload = (event) => {
        const dataURI = event.target?.result as string;

        // Assuming you have a state variable 'pageInfo' and a function 'setPageInfo' to update it
        setPageInfo((prevPageInfo: any) => ({
          ...prevPageInfo,
          profilePicture: dataURI,
        }));

        resolve();
      };

      reader.onerror = (error) => {
        reject(error);
      };

      reader.readAsDataURL(file);
    });
  };

  // Example usage:
  useEffect(() => {
    const inputFile = document.getElementById("inputFile") as HTMLInputElement;
    inputFile.addEventListener("change", async (event) => {
      const file = (event.target as HTMLInputElement).files?.[0];

      if (file) {
        try {
          await saveImageToLocal(file);
        } catch (error) {
          console.error("Error saving image to local storage:", error);
        }
      }
    });
  }, []);

  return (
    <div className="h-fit flex flex-col gap-4">
      <div className="flex flex-col items-center gap-4">
        <div className="h-[100px] w-[100px] shadow-lg border group overflow-hidden relative rounded-full flex flex-col items-center justify-center ">
          {PageInfo.profilePicture ? (
            <>
              <div className="absolute h-full w-full object-cover z-20">
                <img
                  alt="not found"
                  className="absolute h-full w-full object-cover"
                  src={PageInfo.profilePicture}
                />
                <br />
              </div>
              <div className="absolute z-30 opacity-0  group-hover:opacity-100 flex transition-all duration-200 bg-white bg-opacity-10 h-full w-full items-center justify-center blurBack2 ">
                <input
                  type="file"
                  id="inputFile"
                  className="h-full w-full absolute   rounded-full b-b top-1/2 -translate-y-1/2 cursor-pointer  opacity-0 bg-theme-blue"
                />
                {/* <span className="pointer-events-none text-black">Change</span> */}
              </div>
            </>
          ) : (
            <input
              type="file"
              id="inputFile"
              className="h-full w-full absolute  rounded-full b-b top-1/2 -translate-y-1/2 cursor-pointer  opacity-0 bg-theme-blue"
            />
          )}
        </div>
        <div className="grid grid-cols-2 gap-4 ">
          <div className="flex flex-col gap-2">
            <Label className="text-xsm font-bold font-body">Username</Label>
            <Input
              onChange={handlePageInfo}
              placeholder="Username"
              type="text"
              className="w-full  shadow-lg placeholder: focus:ring "
            />
          </div>
          <div className="flex flex-col gap-2">
            <Label className="text-xsm font-bold font-body">Name</Label>
            <Input
              onChange={handlePageInfo}
              placeholder="Display Name"
              type="text"
              className="w-full shadow-lg  placeholder: focus:ring "
            />
          </div>
        </div>
      </div>
      <div className="col-span-2 grid grid-cols-3 gap-4 h-fit">
        <div className="flex flex-col gap-2">
          <Label className="text-xsm font-bold font-body">Posts</Label>
          <Input
            name="postsCount"
            onChange={handlePageInfo}
            placeholder="#"
            type="number"
            className="w-full shadow-lg   placeholder: focus:ring "
          />
        </div>
        <div className="flex flex-col gap-2">
          <Label className="text-xsm font-bold font-body">Followers</Label>
          <Input
            name="followerCount"
            onChange={handlePageInfo}
            placeholder="#"
            type="number"
            className="w-full  shadow-lg placeholder: focus:ring "
          />
        </div>
        <div className="flex flex-col gap-2">
          <Label className="text-xsm font-bold font-body">Following</Label>
          <Input
            name="followingCount"
            onChange={handlePageInfo}
            placeholder="#"
            type="number"
            className="w-full shadow-lg  placeholder: focus:ring "
          />
        </div>
      </div>
      <div className="flex flex-col gap-2 w-full">
        <Label className="text-xsm font-bold font-body">Bio</Label>
        <Textarea
          name="bio"
          onChange={handlePageInfo}
          placeholder="Enter Your bio"
          className="w-full shadow-lg bg-transparent placeholder: focus:ring"
        />
      </div>
      <div className="flex flex-col gap-2 w-full">
        <Label className="text-xsm font-bold font-body">Link</Label>
        <Input
          name="link"
          type="link"
          onChange={handlePageInfo}
          placeholder="link in bio"
          className="w-full shadow-lg  placeholder: focus:ring "
        />
      </div>
      <Posts />
      <Highlights />
    </div>
  );
};

export default ProfileDetails;
