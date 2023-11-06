"use client";

import React from "react";
import Image from "next/image";
import image1 from "@/public/image/feedbackImages/1.png";
import image2 from "@/public/image/feedbackImages/2.png";
import image3 from "@/public/image/feedbackImages/3.png";
import image4 from "@/public/image/feedbackImages/4.png";
import image5 from "@/public/image/feedbackImages/5.png";
import image6 from "@/public/image/feedbackImages/6.png";
import image7 from "@/public/image/feedbackImages/7.png";
import {StaticImageData} from "next/image";
import {cn} from "@/lib/utils";
import {motion} from "framer-motion";

const Feedback = () => {
  return (
    <div className="flex flex-col relative z-1 py-6 pt-20 container bg-white">
      <Image src="/image/brush2.svg" alt="logo" fill objectFit="contain" />
      <h1 className="text-5xl font-bold text-theme-blue mx-auto text-center md:text-left">
        45k Others Like You Are Loving It
      </h1>
      <div className="md:container w-full md:w-[80%] flex flex-col mt-10 ">
        <div className="md:block hidden">
          <ImageRow
            id="image-row-1"
            images={[image1, image2]}
            gridCols="grid-cols-[50%_1fr] gap-[100px]"
          />
          <ImageRow
            id="image-row-2"
            images={[image3, image4]}
            gridCols="grid-cols-[30%_1fr] gap-[80px]"
          />
          <ImageRow
            id="image-row-3"
            images={[image5, image6]}
            gridCols="grid-cols-[55%_1fr] gap-10"
          />
          <ImageRow
            id="image-row-4"
            images={[image7]}
            gridCols="grid-cols-[20%_1fr] gap-0 pr-20"
          />
        </div>
        <div className="md:hidden block">
          <ImageRow
            id="mobile-image-row-1"
            images={[image1]}
            gridCols="grid-cols-1 h-[80px]"
          />
          <ImageRow
            id="mobile-image-row-2"
            images={[image2, image3]}
            gridCols="grid-cols-2 h-[100px]"
          />
          <ImageRow
            id="mobile-image-row-3"
            images={[image4]}
            gridCols="grid-cols-1"
          />
          <ImageRow
            id="mobile-image-row-4"
            images={[image5]}
            gridCols="grid-cols-1 "
          />
          <ImageRow
            id="mobile-image-row-5"
            images={[image6]}
            gridCols="grid-cols-1 "
          />
          <ImageRow
            id="mobile-image-row-6"
            images={[image7]}
            gridCols="grid-cols-1 "
          />
        </div>
      </div>
    </div>
  );
};

export default Feedback;

const ImageRow = ({
  id,
  images,
  gridCols,
}: {
  id: string;
  images: StaticImageData[];
  gridCols: string;
}) => {
  const [showImage1, setShowImage1] = React.useState(false);
  const [showImage2, setShowImage2] = React.useState(false);

  React.useEffect(() => {
    const handleScroll = () => {
      const container = document.getElementById(id);
      if (container) {
        const containerRect = container.getBoundingClientRect();
        const containerBottom = containerRect.bottom;
        if (
          containerBottom + 100 <= window.innerHeight &&
          containerBottom > 0
        ) {
          setShowImage1(true);
        }
        if (
          containerBottom + 150 <= window.innerHeight &&
          containerBottom > 0
        ) {
          setShowImage2(true);
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [id]);

  return (
    <div id={id} className={cn(`grid h-[150px] ${gridCols}`)}>
      {images.length == 2 ? (
        <>
          {showImage1 && (
            <motion.div
              whileHover={{scale: 1.1}}
              whileTap={{scale: 0.9}}
              initial={{opacity: 0, scale: 0}}
              animate={{opacity: 1, scale: 1}}
              transition={{ease: "easeOut", duration: 0.5}}
              id={id + "-image1"}
              className="w-full h-full  relative "
            >
              <Image
                src={images[0]}
                alt="cover"
                fill
                objectFit="contain"
                className=""
                loading="eager"
              />
            </motion.div>
          )}
          {showImage2 && (
            <motion.div
              whileHover={{scale: 1.1}}
              whileTap={{scale: 0.9}}
              initial={{opacity: 0, scale: 0}}
              animate={{opacity: 1, scale: 1}}
              transition={{ease: "easeOut", duration: 0.5}}
              id={id + "-image2"}
              className="w-full h-full relative"
            >
              <Image
                src={images[1]}
                alt="cover"
                fill
                objectFit="contain"
                className=""
                loading="eager"
              />
            </motion.div>
          )}
        </>
      ) : (
        <>
          <div className="w-full h-full  relative md:block hidden" />
          {showImage1 && (
            <motion.div
              whileHover={{scale: 1.1}}
              whileTap={{scale: 0.9}}
              initial={{opacity: 0, scale: 0}}
              animate={{opacity: 1, scale: 1}}
              transition={{ease: "easeOut", duration: 0.5}}
              id={id + "-image1"}
              className="w-full h-full  relative "
            >
              <Image
                src={images[0]}
                alt="cover"
                fill
                objectFit="contain"
                className=""
                loading="eager"
              />
            </motion.div>
          )}
        </>
      )}
    </div>
  );
};
