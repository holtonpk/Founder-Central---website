import React from "react";
import {useProfileInfo} from "../context/profile-info";
import {Icons} from "@/app/(client)/components/icons";

const InstagramUi = () => {
  return <DesktopDisplay />;
};

export default InstagramUi;

export const ScreenShotCanvas = () => {
  const {PageInfo, mode} = useProfileInfo()!;

  const textColor = mode === "dark" ? "text-white" : "text-black";
  const fillColor = mode === "dark" ? "white" : "black";
  return (
    <div className="fixed top-0 right-0 translate-x-full pointer-events-none">
      <div
        id="instagram-ui-canvas"
        className={`aspect-[12/6] w-[1000px]  pt-4 left-0 relative top-0 h-full shadow-lg rounded-md flex flex-col    ${textColor}
  ${mode === "dark" ? "bg-black" : "bg-white"}

  `}
      >
        <div className="  w-[100%] flex flex-row items-stretch  mb-[44px]   ">
          <div className="p-10 mr-[30px] ">
            <div className="h-[150px] relative aspect-square">
              <div
                className={`bg-gray-500 rounded-full h-[150px] overflow-hidden relative aspect-square z-20 ring-offset-20 ring-[1px]  border-2

        ${
          mode == "dark"
            ? "ring-[#333333] border-black"
            : "ring-[#DBDBDB] border-white"
        }`}
              >
                {PageInfo.profilePicture && (
                  <img
                    alt="not found"
                    className="absolute h-full w-full object-cover"
                    src={PageInfo.profilePicture}
                  />
                )}
              </div>
              <div className="h-[162px] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 aspect-square insta-create p-[2px] rounded-full absolute">
                <div
                  className={`  rounded-full h-full w-full ${
                    mode === "dark" ? "bg-black" : "bg-white"
                  }`}
                ></div>
              </div>
            </div>
          </div>

          <div className="flex flex-col h-fit   w-full">
            <div className="flex flex-row items-center  w-full">
              <h1 className=" text-[20px] leading-[25px] font-semibold ">
                {PageInfo.userName}
              </h1>
              {PageInfo.verified && (
                <svg
                  aria-label="Verified"
                  className="block relative mt-[4px] ml-[8px]"
                  fill="rgb(0, 149, 246)"
                  height="18"
                  role="img"
                  viewBox="0 0 40 40"
                  width="18"
                >
                  <title>Verified</title>
                  <path
                    d="M19.998 3.094 14.638 0l-2.972 5.15H5.432v6.354L0 14.64 3.094 20 0 25.359l5.432 3.137v5.905h5.975L14.638 40l5.36-3.094L25.358 40l3.232-5.6h6.162v-6.01L40 25.359 36.905 20 40 14.641l-5.248-3.03v-6.46h-6.419L25.358 0l-5.36 3.094Zm7.415 11.225 2.254 2.287-11.43 11.5-6.835-6.93 2.244-2.258 4.587 4.581 9.18-9.18Z"
                    fillRule="evenodd"
                  ></path>
                </svg>
              )}
              <div className="flex ml-[20px] items-center">
                <div className="text-sm border-none ml-[8px] rounded-lg flex justify-center items-center  h-6 px-[16px] bg-[#1877F2] text-white">
                  Follow
                </div>
                <div
                  className={`text-sm border-none rounded-lg ml-[8px] flex justify-center items-center py-[7px] h-fit px-[16px] text-[14px] ${
                    mode === "dark" ? "bg-[#363636]" : "bg-[#EFEFEF] text-black"
                  } `}
                >
                  Message
                </div>
                <div
                  className={`text-sm border-none rounded-lg ml-[8px] h-fit p-[8px] text-[14px] ${
                    mode === "dark" ? "bg-[#363636]" : "bg-[#EFEFEF] text-black"
                  } `}
                >
                  <Icons.follow className="w-4 h-4 hor-flip " />
                </div>

                <Icons.moreHor
                  className={`h-6 w-6 ml-[8px]  ${
                    mode === "dark" ? "text-white" : "text-black"
                  } `}
                />
              </div>
            </div>
            <div className="flex my-[20px] text-sm">
              <h1 className="mr-[40px]">
                <span className="font-semibold">{PageInfo.postsCount}</span>{" "}
                posts
              </h1>
              <h1 className="mr-[40px]">
                <span className="font-semibold">{PageInfo.followerCount}</span>{" "}
                followers
              </h1>
              <h1 className="mr-[40px]">
                <span className="font-semibold">{PageInfo.followingCount}</span>{" "}
                following
              </h1>
            </div>
            <h1 className="font-semibold text-sm">{PageInfo.name}</h1>
            <h1
              className={` text-sm
          ${mode === "dark" ? "text-[#A0A0A0]" : "text-[#737373]"}
          `}
            >
              Category
            </h1>
            <p className="text-sm whitespace-pre-wrap">{PageInfo.bio}</p>
            <div className="flex items-center gap-1 text-[#00376B]">
              <svg
                aria-label="Link icon"
                className="x1lliihq x1n2onr6 x7l2uk3 "
                fill="currentColor"
                height="12"
                role="img"
                viewBox="0 0 24 24"
                width="12"
              >
                <title>Link icon</title>
                <path
                  d="m9.726 5.123 1.228-1.228a6.47 6.47 0 0 1 9.15 9.152l-1.227 1.227m-4.603 4.603-1.228 1.228a6.47 6.47 0 0 1-9.15-9.152l1.227-1.227"
                  fill="none"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                ></path>
                <line
                  fill="none"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  x1="8.471"
                  x2="15.529"
                  y1="15.529"
                  y2="8.471"
                ></line>
              </svg>
              {PageInfo.link}
            </div>
          </div>
        </div>
        {PageInfo.highlights && (
          <div className="flex flex-row items-center px-[44px]">
            {PageInfo.highlights.map((highlight: any, index: any) => (
              <div
                key={index}
                className="flex flex-col items-center gap-1 w-[125px] "
              >
                <div className="py-[10px] px-[15px] w-[115px] flex flex-col items-center">
                  <div
                    className={`bg-red-500 rounded-full h-[77px] w-[77px] ring-offset-20 ring-[1px] overflow-hidden relative  border-2 
 
 ${
   mode == "dark"
     ? "ring-[#333333] border-black"
     : "ring-[#DBDBDB] border-white"
 }`}
                  >
                    <img
                      alt="not found"
                      className="absolute h-full w-full object-cover"
                      src={highlight}
                    />
                  </div>
                  <h1 className="font-semibold text-sm leading-[16px] pt-[15px]">
                    Highlight {index + 1}
                  </h1>
                </div>
              </div>
            ))}
          </div>
        )}
        <div
          className={`w-full border-t   justify-center flex flex-row mb-2
      ${mode === "dark" ? "border-[#262626]" : "border-[#DBDBDB]"}
      `}
        >
          <div className="w-full h-8 flex flex-row justify-center items-center gap-[60px] text-[.75rem] font-semibold">
            <div
              className={`w-fit h-full flex flex-row justify-center items-center border-t gap-[6px] uppercase
          ${mode === "dark" ? "border-t-white" : "border-t-black"}
          `}
            >
              <svg
                aria-label=""
                className="x1lliihq x1n2onr6 x5n08af"
                fill="currentColor"
                height="12"
                role="img"
                viewBox="0 0 24 24"
                width="12"
              >
                <title></title>
                <rect
                  fill="none"
                  height="18"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  width="18"
                  x="3"
                  y="3"
                ></rect>
                <line
                  fill="none"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  x1="9.015"
                  x2="9.015"
                  y1="3"
                  y2="21"
                ></line>
                <line
                  fill="none"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  x1="14.985"
                  x2="14.985"
                  y1="3"
                  y2="21"
                ></line>
                <line
                  fill="none"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  x1="21"
                  x2="3"
                  y1="9.015"
                  y2="9.015"
                ></line>
                <line
                  fill="none"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  x1="21"
                  x2="3"
                  y1="14.985"
                  y2="14.985"
                ></line>
              </svg>
              Posts
            </div>
            <div className="w-fit h-full flex flex-row justify-center items-center gap-2 uppercase opacity-50">
              <svg
                aria-label=""
                className="x1lliihq x1n2onr6 x1roi4f4"
                fill="currentColor"
                height="12"
                role="img"
                viewBox="0 0 24 24"
                width="12"
              >
                <title></title>
                <line
                  fill="none"
                  stroke="currentColor"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  x1="2.049"
                  x2="21.95"
                  y1="7.002"
                  y2="7.002"
                ></line>
                <line
                  fill="none"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  x1="13.504"
                  x2="16.362"
                  y1="2.001"
                  y2="7.002"
                ></line>
                <line
                  fill="none"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  x1="7.207"
                  x2="10.002"
                  y1="2.11"
                  y2="7.002"
                ></line>
                <path
                  d="M2 12.001v3.449c0 2.849.698 4.006 1.606 4.945.94.908 2.098 1.607 4.946 1.607h6.896c2.848 0 4.006-.699 4.946-1.607.908-.939 1.606-2.096 1.606-4.945V8.552c0-2.848-.698-4.006-1.606-4.945C19.454 2.699 18.296 2 15.448 2H8.552c-2.848 0-4.006.699-4.946 1.607C2.698 4.546 2 5.704 2 8.552Z"
                  fill="none"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                ></path>
                <path
                  d="M9.763 17.664a.908.908 0 0 1-.454-.787V11.63a.909.909 0 0 1 1.364-.788l4.545 2.624a.909.909 0 0 1 0 1.575l-4.545 2.624a.91.91 0 0 1-.91 0Z"
                  fillRule="evenodd"
                ></path>
              </svg>
              Reels
            </div>
            <div className="w-fit h-full flex flex-row justify-center items-center gap-2 uppercase opacity-50">
              <svg
                aria-label=""
                className="x1lliihq x1n2onr6 x1roi4f4"
                fill="currentColor"
                height="12"
                role="img"
                viewBox="0 0 24 24"
                width="12"
              >
                <title></title>
                <path
                  d="M10.201 3.797 12 1.997l1.799 1.8a1.59 1.59 0 0 0 1.124.465h5.259A1.818 1.818 0 0 1 22 6.08v14.104a1.818 1.818 0 0 1-1.818 1.818H3.818A1.818 1.818 0 0 1 2 20.184V6.08a1.818 1.818 0 0 1 1.818-1.818h5.26a1.59 1.59 0 0 0 1.123-.465Z"
                  fill="none"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                ></path>
                <path
                  d="M18.598 22.002V21.4a3.949 3.949 0 0 0-3.948-3.949H9.495A3.949 3.949 0 0 0 5.546 21.4v.603"
                  fill="none"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                ></path>
                <circle
                  cx="12.072"
                  cy="11.075"
                  fill="none"
                  r="3.556"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                ></circle>
              </svg>
              Tagged
            </div>
          </div>
        </div>
        {/* <PostGrid /> */}
        {PageInfo.posts && (
          <div className="w-full gap-1 grid grid-cols-3  ">
            {PageInfo.posts.map((post: any) => (
              <div className="bg-gray-500  aspect-square  relative overflow-hidden">
                <img
                  alt="not found"
                  className="absolute h-full w-full object-cover"
                  src={post}
                />
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export const DesktopDisplay = () => {
  const {PageInfo, mode} = useProfileInfo()!;

  const textColor = mode === "dark" ? "text-white" : "text-black";
  const fillColor = mode === "dark" ? "white" : "black";

  return (
    <div className="max-w-[950px] flex-grow margin-[0px_auto_30px]">
      <div
        id="instagram-ui"
        className={`aspect-[8/6] pt-4 relative w-[950px] border shadow-lg rounded-md flex flex-col top-6 wrap  ${textColor}
      ${mode === "dark" ? "bg-black" : "bg-white"}
  
      `}
      >
        <div className="  w-[100%] flex flex-row items-stretch  mb-[44px]   ">
          <div className="p-10 mr-[30px] ">
            <div className="h-[150px] relative aspect-square">
              <div
                className={`bg-gray-500 rounded-full h-[150px] overflow-hidden relative aspect-square z-20 ring-offset-20 ring-[1px]  border-2
  
            ${
              mode == "dark"
                ? "ring-[#333333] border-black"
                : "ring-[#DBDBDB] border-white"
            }`}
              >
                {PageInfo.profilePicture && (
                  <img
                    alt="not found"
                    className="absolute h-full w-full object-cover"
                    src={PageInfo.profilePicture}
                  />
                )}
              </div>
              <div className="h-[162px] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 aspect-square insta-create p-[2px] rounded-full absolute">
                <div
                  className={`  rounded-full h-full w-full ${
                    mode === "dark" ? "bg-black" : "bg-white"
                  }`}
                ></div>
              </div>
            </div>
          </div>

          <div className="flex flex-col h-fit max-w-full ">
            <div className="flex flex-row items-center ">
              <h1 className=" text-[20px] leading-[25px] font-semibold ">
                {PageInfo.userName}
              </h1>
              {PageInfo.verified && (
                <svg
                  aria-label="Verified"
                  className="block relative mt-[4px] ml-[8px]"
                  fill="rgb(0, 149, 246)"
                  height="18"
                  role="img"
                  viewBox="0 0 40 40"
                  width="18"
                >
                  <title>Verified</title>
                  <path
                    d="M19.998 3.094 14.638 0l-2.972 5.15H5.432v6.354L0 14.64 3.094 20 0 25.359l5.432 3.137v5.905h5.975L14.638 40l5.36-3.094L25.358 40l3.232-5.6h6.162v-6.01L40 25.359 36.905 20 40 14.641l-5.248-3.03v-6.46h-6.419L25.358 0l-5.36 3.094Zm7.415 11.225 2.254 2.287-11.43 11.5-6.835-6.93 2.244-2.258 4.587 4.581 9.18-9.18Z"
                    fillRule="evenodd"
                  ></path>
                </svg>
              )}
              <div className="flex ml-[20px] items-center">
                <div className="text-sm border-none ml-[8px] rounded-lg py-[7px] h-fit px-[16px] bg-[#1877F2] text-white">
                  Follow
                </div>
                <div
                  className={`text-sm border-none rounded-lg ml-[8px] py-[7px] h-fit px-[16px] text-[14px] ${
                    mode === "dark" ? "bg-[#363636]" : "bg-[#EFEFEF] text-black"
                  } `}
                >
                  Message
                </div>
                <div
                  className={`text-sm border-none rounded-lg ml-[8px] h-fit p-[8px] text-[14px] ${
                    mode === "dark" ? "bg-[#363636]" : "bg-[#EFEFEF] text-black"
                  } `}
                >
                  <Icons.follow className="w-4 h-4 hor-flip " />
                </div>

                <Icons.moreHor
                  className={`h-6 w-6 ml-[8px]  ${
                    mode === "dark" ? "text-white" : "text-black"
                  } `}
                />
              </div>
            </div>
            <div className="flex my-[20px] text-sm">
              <h1 className="mr-[40px]">
                <span className="font-semibold">{PageInfo.postsCount}</span>{" "}
                posts
              </h1>
              <h1 className="mr-[40px]">
                <span className="font-semibold">{PageInfo.followerCount}</span>{" "}
                followers
              </h1>
              <h1 className="mr-[40px]">
                <span className="font-semibold">{PageInfo.followingCount}</span>{" "}
                following
              </h1>
            </div>
            <h1 className="font-semibold text-sm">{PageInfo.name}</h1>
            <h1
              className={` text-sm
              ${mode === "dark" ? "text-[#A0A0A0]" : "text-[#737373]"}
              `}
            >
              Category
            </h1>
            <p className="text-sm whitespace-pre-wrap">{PageInfo.bio}</p>
            <div className="flex items-center gap-1 text-[#00376B]">
              <svg
                aria-label="Link icon"
                className="x1lliihq x1n2onr6 x7l2uk3 "
                fill="currentColor"
                height="12"
                role="img"
                viewBox="0 0 24 24"
                width="12"
              >
                <title>Link icon</title>
                <path
                  d="m9.726 5.123 1.228-1.228a6.47 6.47 0 0 1 9.15 9.152l-1.227 1.227m-4.603 4.603-1.228 1.228a6.47 6.47 0 0 1-9.15-9.152l1.227-1.227"
                  fill="none"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                ></path>
                <line
                  fill="none"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  x1="8.471"
                  x2="15.529"
                  y1="15.529"
                  y2="8.471"
                ></line>
              </svg>
              {PageInfo.link}
            </div>
          </div>
        </div>
        {PageInfo.highlights && (
          <div className="flex flex-row items-center px-[44px]">
            {PageInfo.highlights.map((highlight: any, index: any) => (
              <div
                key={index}
                className="flex flex-col items-center gap-1 w-[125px] "
              >
                <div className="py-[10px] px-[15px] w-[115px] flex flex-col items-center">
                  <div
                    className={`bg-gray-500 rounded-full h-[77px] w-[77px] ring-offset-20 ring-[1px] overflow-hidden relative  border-2 
     
     ${
       mode == "dark"
         ? "ring-[#333333] border-black"
         : "ring-[#DBDBDB] border-white"
     }`}
                  >
                    <img
                      alt="not found"
                      className="absolute h-full w-full object-cover"
                      src={highlight}
                    />
                  </div>
                  <h1 className="font-semibold text-sm leading-[16px] pt-[15px]">
                    Highlight {index + 1}
                  </h1>
                </div>
              </div>
            ))}
          </div>
        )}
        <div
          className={`w-full border-t   justify-center flex flex-row mb-2
          ${mode === "dark" ? "border-[#262626]" : "border-[#DBDBDB]"}
          `}
        >
          <div className="w-full h-8 flex flex-row justify-center items-center gap-[60px] text-[.75rem] font-semibold">
            <div
              className={`w-fit h-full flex flex-row justify-center items-center border-t gap-[6px] uppercase
              ${mode === "dark" ? "border-t-white" : "border-t-black"}
              `}
            >
              <svg
                aria-label=""
                className="x1lliihq x1n2onr6 x5n08af"
                fill="currentColor"
                height="12"
                role="img"
                viewBox="0 0 24 24"
                width="12"
              >
                <title></title>
                <rect
                  fill="none"
                  height="18"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  width="18"
                  x="3"
                  y="3"
                ></rect>
                <line
                  fill="none"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  x1="9.015"
                  x2="9.015"
                  y1="3"
                  y2="21"
                ></line>
                <line
                  fill="none"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  x1="14.985"
                  x2="14.985"
                  y1="3"
                  y2="21"
                ></line>
                <line
                  fill="none"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  x1="21"
                  x2="3"
                  y1="9.015"
                  y2="9.015"
                ></line>
                <line
                  fill="none"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  x1="21"
                  x2="3"
                  y1="14.985"
                  y2="14.985"
                ></line>
              </svg>
              Posts
            </div>
            <div className="w-fit h-full flex flex-row justify-center items-center gap-2 uppercase opacity-50">
              <svg
                aria-label=""
                className="x1lliihq x1n2onr6 x1roi4f4"
                fill="currentColor"
                height="12"
                role="img"
                viewBox="0 0 24 24"
                width="12"
              >
                <title></title>
                <line
                  fill="none"
                  stroke="currentColor"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  x1="2.049"
                  x2="21.95"
                  y1="7.002"
                  y2="7.002"
                ></line>
                <line
                  fill="none"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  x1="13.504"
                  x2="16.362"
                  y1="2.001"
                  y2="7.002"
                ></line>
                <line
                  fill="none"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  x1="7.207"
                  x2="10.002"
                  y1="2.11"
                  y2="7.002"
                ></line>
                <path
                  d="M2 12.001v3.449c0 2.849.698 4.006 1.606 4.945.94.908 2.098 1.607 4.946 1.607h6.896c2.848 0 4.006-.699 4.946-1.607.908-.939 1.606-2.096 1.606-4.945V8.552c0-2.848-.698-4.006-1.606-4.945C19.454 2.699 18.296 2 15.448 2H8.552c-2.848 0-4.006.699-4.946 1.607C2.698 4.546 2 5.704 2 8.552Z"
                  fill="none"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                ></path>
                <path
                  d="M9.763 17.664a.908.908 0 0 1-.454-.787V11.63a.909.909 0 0 1 1.364-.788l4.545 2.624a.909.909 0 0 1 0 1.575l-4.545 2.624a.91.91 0 0 1-.91 0Z"
                  fillRule="evenodd"
                ></path>
              </svg>
              Reels
            </div>
            <div className="w-fit h-full flex flex-row justify-center items-center gap-2 uppercase opacity-50">
              <svg
                aria-label=""
                className="x1lliihq x1n2onr6 x1roi4f4"
                fill="currentColor"
                height="12"
                role="img"
                viewBox="0 0 24 24"
                width="12"
              >
                <title></title>
                <path
                  d="M10.201 3.797 12 1.997l1.799 1.8a1.59 1.59 0 0 0 1.124.465h5.259A1.818 1.818 0 0 1 22 6.08v14.104a1.818 1.818 0 0 1-1.818 1.818H3.818A1.818 1.818 0 0 1 2 20.184V6.08a1.818 1.818 0 0 1 1.818-1.818h5.26a1.59 1.59 0 0 0 1.123-.465Z"
                  fill="none"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                ></path>
                <path
                  d="M18.598 22.002V21.4a3.949 3.949 0 0 0-3.948-3.949H9.495A3.949 3.949 0 0 0 5.546 21.4v.603"
                  fill="none"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                ></path>
                <circle
                  cx="12.072"
                  cy="11.075"
                  fill="none"
                  r="3.556"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                ></circle>
              </svg>
              Tagged
            </div>
          </div>
        </div>
        {/* <PostGrid /> */}
        {PageInfo.posts && (
          <div className="gap-1 grid grid-cols-3 w-full ">
            {PageInfo.posts.map((post: any) => (
              <div className="bg-gray-500  aspect-square  relative overflow-hidden">
                <img
                  alt="not found"
                  className="absolute h-full w-full object-cover"
                  src={post}
                />
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
