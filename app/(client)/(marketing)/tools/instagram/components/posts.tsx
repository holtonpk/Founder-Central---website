import React, {useEffect} from "react";
import {useProfileInfo} from "../context/profile-info";
import {Label} from "@/app/(client)/components/ui/label";
import {Icons} from "@/app/(client)/components/icons";

const Posts = () => {
  const {PageInfo, setPageInfo} = useProfileInfo()!;

  const saveImageToLocal = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = (event) => {
        const dataURI = event.target?.result as string;
        resolve(dataURI);
      };

      reader.onerror = (error) => {
        reject(error);
      };

      reader.readAsDataURL(file);
    });
  };

  // Example usage:
  useEffect(() => {
    const inputFile = document.getElementById("postUpload") as HTMLInputElement;
    inputFile.addEventListener("change", async (event) => {
      const files = (event.target as HTMLInputElement).files;
      if (files) {
        const updatedPosts: string[] = [];

        for (let i = 0; i < files.length; i++) {
          const file = files[i];
          try {
            const dataURI = await saveImageToLocal(file);
            updatedPosts.unshift(dataURI); // Add to the beginning of the array
          } catch (error) {
            console.error("Error saving image to local storage:", error);
          }
        }
        const prevPosts = PageInfo.posts ? PageInfo.posts : [];
        const updatedInfo = {
          ...PageInfo,
          posts: [...updatedPosts, ...prevPosts],
        };
        setPageInfo({...updatedInfo});
      }
    });
  }, []);

  const removeItem = (post: any) => {
    const newPosts = PageInfo.posts.filter((p: any) => p !== post);
    const updatedInfo = {...PageInfo, posts: newPosts};
    setPageInfo({...updatedInfo});
  };

  return (
    <>
      {PageInfo.posts ? (
        <>
          <Label className="text-xsm text-black font-bold font-body">
            Posts
          </Label>
          <div className="p-4 border shadow-lg rounded-md w-full  overflow-hidden">
            <div className="grid grid-cols-4 gap-4 h-fit">
              {PageInfo.posts.map((post: any) => (
                <div className="h-20 w-20 rounded-md relative group">
                  <button
                    onClick={() => removeItem(post)}
                    className="bg-red-400 hidden group-hover:flex absolute top-0 right-0 p-1 translate-x-1/2 -translate-y-1/2 z-20 rounded-full"
                  >
                    <Icons.close className="w-4 h-4 text-white" />
                  </button>
                  <div className="h-full w-full relative overflow-hidden rounded-md group z-10">
                    <img
                      alt="not found"
                      className="absolute h-full w-full object-cover"
                      src={post}
                    />
                  </div>
                </div>
              ))}
              <div className=" h-20 w-20 rounded-md text-theme-blue hover:bg-theme-blue/10 flex items-center justify-center relative overflow-hidden">
                <Icons.add className="w-10 h-10" />
                <input
                  type="file"
                  multiple={true}
                  id="postUpload"
                  className="h-full w-full absolute  top-1/2 -translate-y-1/2 cursor-pointer opacity-0  bg-theme-blue"
                />
              </div>
            </div>
            <button
              className="absolute z-30 hidden group-hover:block"
              onClick={() => null}
            >
              Change
            </button>
          </div>
        </>
      ) : (
        <div className="w-full border border-theme-blue rounded-md border-dashed h-40 flex justify-center items-center font-bold text-theme-blue bg-background">
          + Add Posts
          <input
            type="file"
            multiple={true}
            id="postUpload"
            className="h-full w-full absolute  top-1/2 -translate-y-1/2 cursor-pointer opacity-0  bg-theme-blue"
          />
        </div>
      )}
    </>
  );
};

export default Posts;
