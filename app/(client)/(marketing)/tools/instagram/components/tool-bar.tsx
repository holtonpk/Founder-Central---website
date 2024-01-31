import React from "react";
import {Icons} from "@/app/(client)/components/icons";
import {Button} from "@/app/(client)/components/ui/button";
import {useProfileInfo} from "../context/profile-info";
import html2canvas from "html2canvas";

const ToolBar = () => {
  const {mode, setMode} = useProfileInfo()!;

  const takeScreenshot = () => {
    const element = document.getElementById(
      "instagram-ui-canvas"
    ) as HTMLElement;
    html2canvas(element).then((canvas) => {
      const dataURI = canvas.toDataURL("image/png");
      const a = document.createElement("a");
      a.href = dataURI;
      a.download = "instagram-ui.png";
      a.click();
    });
  };

  return (
    <div className="flex  items-center space-x-2  ">
      <Button
        className={`shadow-lg flex bg-white text-black/60 hover:text-black items-center justify-center p-2 rounded-md gap-1 
        `}
      >
        <Icons.responsive className="w-4 h-4" />
      </Button>
      <Button
        className={` flex bg-white text-black/60 hover:text-black items-center justify-center p-2 rounded-md gap-1 shadow-lg
        `}
        onClick={() =>
          setMode((prev: any) => (prev === "dark" ? "light" : "dark"))
        }
      >
        {mode === "light" ? (
          <>
            <Icons.moon className="w-4 h-4" />
          </>
        ) : (
          <>
            <Icons.sun className="w-4 hs-4" />
          </>
        )}
      </Button>
      <Button
        onClick={takeScreenshot}
        className="flex bg-white text-black/60 hover:text-black items-center justify-center p-2 rounded-md gap-1 shadow-lg"
      >
        <Icons.camera className="w-4 h-4" />
      </Button>
    </div>
  );
};

export default ToolBar;
