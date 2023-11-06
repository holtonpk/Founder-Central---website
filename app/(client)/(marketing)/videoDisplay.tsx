"use client";

import Image from "next/image";
import React from "react";
import cover1 from "@/public/image/videos/cover1.png";
import cover2 from "@/public/image/videos/cover2.png";
import cover3 from "@/public/image/videos/cover3.png";
import cover4 from "@/public/image/videos/cover4.png";
import cover5 from "@/public/image/videos/cover5.png";
import cover6 from "@/public/image/videos/cover6.png";
import cover7 from "@/public/image/videos/cover7.png";

import {siteConfig} from "@/config/site";
import {LinkButton} from "@/app/(client)/components/ui/link";
import {motion} from "framer-motion";
import {Icons} from "@/app/(client)/components/icons";
import {Button} from "@/app/(client)/components/ui/button";
import {StaticImageData} from "next/image";
import {cn} from "@/lib/utils";

type VideoObject = {
  coverImage: StaticImageData;
  videoSrc: string;

  position: {x: number | string; y: number | string; z: number; scale: number};
};

const VideoDisplay = () => {
  const Videos: VideoObject[] = [
    {
      coverImage: cover1,
      videoSrc:
        "https://firebasestorage.googleapis.com/v0/b/sfpg-af5b0.appspot.com/o/Video%201%20-%20Justin%20Kan.mp4?alt=media&token=298c7338-7eab-46ed-9c6b-2fc3b8dfc0c8&_gl=1*1efdew3*_ga*NzQwNTg1NzQuMTY5NTkyMTY3Mg..*_ga_CW55HF8NVT*MTY5OTE2MzExOC40NS4xLjE2OTkxNjM0NzUuNjAuMC4w",

      position: {
        x: "40%",
        y: "20%",
        z: 5,
        scale: 1,
      },
    },
    {
      coverImage: cover2,
      videoSrc:
        "https://firebasestorage.googleapis.com/v0/b/sfpg-af5b0.appspot.com/o/Video%205%20-%20Whitney%20Wolfe%20Herd.mp4?alt=media&token=ee5dfbcb-5aec-4c3f-8b90-f0ac70bf5f5d&_gl=1*6lattb*_ga*NzQwNTg1NzQuMTY5NTkyMTY3Mg..*_ga_CW55HF8NVT*MTY5OTE2MzExOC40NS4xLjE2OTkxNjQ0MjEuNjAuMC4w",

      position: {
        x: "10%",
        y: "35%",
        z: 4,
        scale: 0.75,
      },
    },
    {
      coverImage: cover3,
      videoSrc:
        "https://firebasestorage.googleapis.com/v0/b/sfpg-af5b0.appspot.com/o/Video%208%20-%20Ben%20Francis.mp4?alt=media&token=84c11e9c-fa9e-46d7-bec5-bb5e6904ee2d&_gl=1*yu4n2y*_ga*NzQwNTg1NzQuMTY5NTkyMTY3Mg..*_ga_CW55HF8NVT*MTY5OTE2MzExOC40NS4xLjE2OTkxNjQ1MDMuNjAuMC4w",

      position: {
        x: "50%",
        y: "0%",
        z: 3,
        scale: 0.8,
      },
    },
    {
      coverImage: cover4,
      videoSrc:
        "https://firebasestorage.googleapis.com/v0/b/sfpg-af5b0.appspot.com/o/Video%2017%20-%20Samwer%20Bros.mp4?alt=media&token=23b10ba5-caae-4735-b1a2-d05c89557463&_gl=1*bc0hhb*_ga*NzQwNTg1NzQuMTY5NTkyMTY3Mg..*_ga_CW55HF8NVT*MTY5OTE2MzExOC40NS4xLjE2OTkxNjQ1MTYuNDcuMC4w",

      position: {
        x: "20%",
        y: "2%",
        z: 2,
        scale: 0.5,
      },
    },
    {
      coverImage: cover5,
      videoSrc:
        "https://firebasestorage.googleapis.com/v0/b/sfpg-af5b0.appspot.com/o/Video%2011%20-%20Jimmy%20Donaldson.mp4?alt=media&token=6557657c-d8f7-43cb-a8f2-3cf717e2c88d&_gl=1*1bwziet*_ga*NzQwNTg1NzQuMTY5NTkyMTY3Mg..*_ga_CW55HF8NVT*MTY5OTE2MzExOC40NS4xLjE2OTkxNjQ1MzkuMjQuMC4w",

      position: {
        x: "55%",
        y: "50%",
        z: 1,
        scale: 0.7,
      },
    },
    {
      coverImage: cover6,
      videoSrc:
        "https://firebasestorage.googleapis.com/v0/b/sfpg-af5b0.appspot.com/o/Video%204%20-%20Austin%20Russel.mp4?alt=media&token=b3846ef7-f2ab-4de2-ba1f-9ed641adf7c9&_gl=1*132wr2l*_ga*NzQwNTg1NzQuMTY5NTkyMTY3Mg..*_ga_CW55HF8NVT*MTY5OTE2MzExOC40NS4xLjE2OTkxNjQ1NTUuOC4wLjA.",

      position: {
        x: "25%",
        y: "40%",
        z: 1,
        scale: 0.6,
      },
    },
    {
      coverImage: cover7,
      videoSrc:
        "https://firebasestorage.googleapis.com/v0/b/sfpg-af5b0.appspot.com/o/Video%202%20-%20Bernard%20Arnault.mp4?alt=media&token=f868a264-73e1-4ebe-b1ab-e003e5d0ebde&_gl=1*157l777*_ga*NzQwNTg1NzQuMTY5NTkyMTY3Mg..*_ga_CW55HF8NVT*MTY5OTE2MzExOC40NS4xLjE2OTkxNjQ1NjYuNjAuMC4w",

      position: {
        x: "70%",
        y: "20%",
        z: 1,
        scale: 0.65,
      },
    },
  ];

  return (
    <div className="flex flex-col relative z-10 w-full mx-auto py-10 pt-20   bg-theme-blue/10">
      <h1 className="text-5xl text-theme-blue font-head font-bold mx-auto relative text-center md:text-left">
        Our Short Video Series
      </h1>

      <div className="flex w-screen lg:flex-row flex-col items-center gap-10 md:gap-10 lg:gap-20">
        <div
          id="video-container"
          className="relative z-10 overflow-hidden shadow-lg md:ml-10 w-[90vw] aspect-square  md:h-[600px] md:w-[600px] rounded-full mt-10"
        >
          <div className="absolute w-[90vw] aspect-square  md:h-[600px] md:w-[600px] bg-theme-blue rounded-full top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 " />
          {Videos.map((video, i) => (
            <Video key={i} video={video} i={i} />
          ))}
        </div>
        <div className="flex  flex-col lg:items-start items-center text-theme-pink text-2xl  md:text-4xl w-[80%] md:w-fit font-bold font-body relative h-fit">
          <motion.div
            whileHover={{scale: 1.1}}
            whileTap={{scale: 0.9}}
            initial={{opacity: 0}}
            whileInView={{opacity: 1}}
            viewport={{once: true}}
            className="text-theme-yellow bg-white shadow-lg w-fit p-4 rounded-lg flex items-center gap-4"
          >
            <Icons.showPassword className="h-8 w-8" />
            Over 10 Million Views
          </motion.div>
          <motion.div
            whileHover={{scale: 1.1}}
            whileTap={{scale: 0.9}}
            initial={{opacity: 0}}
            whileInView={{opacity: 1}}
            viewport={{once: true}}
            className="text-theme-purple bg-white w-fit shadow-lg p-4 rounded-lg flex items-center gap-4 mt-4 md:mt-6 lg::mt-20"
          >
            <Icons.clapperBoard className="h-8 w-8" />
            30+ Videos
          </motion.div>
          <motion.div
            whileHover={{scale: 1.1}}
            whileTap={{scale: 0.9}}
            initial={{opacity: 0}}
            whileInView={{opacity: 1}}
            viewport={{once: true}}
            className="text-theme-pink bg-white shadow-lg w-fit p-4 rounded-lg flex flex-col items-center gap-4 mt-4 md:mt-6 lg::mt-20"
          >
            Across 3 Platforms
            <div
              className="video__social-links flex gap-4 w-fit "
              id="video-social-links"
            >
              <LinkButton
                variant={"secondaryOutline"}
                target="_blank"
                href={siteConfig.links.youtube}
                className="video__social-link border-none p-0 aspect-square"
              >
                <Icons.youtube
                  className="h-8 w-8"
                  id="video-social-link-youtube"
                  color="#EF1F80"
                />
              </LinkButton>
              <LinkButton
                variant={"secondaryOutline"}
                target="_blank"
                href={siteConfig.links.instagram}
                className="video__social-link border-none p-0 aspect-square"
              >
                <Icons.instaGram
                  className="h-8 w-8"
                  id="video-social-link-instagram"
                  color="#EF1F80"
                />
              </LinkButton>
              <LinkButton
                variant={"secondaryOutline"}
                target="_blank"
                href={siteConfig.links.tiktok}
                className="video__social-link border-none p-0 aspect-square"
              >
                <Icons.tiktok
                  className="h-8 w-8 "
                  color="#EF1F80"
                  id="video-social-link-tiktok"
                />
              </LinkButton>
            </div>
          </motion.div>

          <div className="flex flex-col items-center gap-6 w-fit"></div>
        </div>
      </div>
    </div>
  );
};

export default VideoDisplay;

const Video = ({video, i}: {video: VideoObject; i: number}) => {
  function getRandomNumberBetweenRanges() {
    const range1 = Math.random() >= 0.5; // Determine the first range (true for -20 to -10, false for 10 to 20)
    if (range1) {
      return Math.floor(Math.random() * 11 - 20);
    } else {
      return Math.floor(Math.random() * 11 + 10);
    }
  }

  const xMovement = getRandomNumberBetweenRanges();
  const yMovement = getRandomNumberBetweenRanges();
  const duration = Math.random() * 1.5 + 3.5;

  const [playVideo, setPlayVideo] = React.useState(false);

  return (
    <>
      {playVideo ? (
        <VideoPlayer video={video.videoSrc} setPlayVideo={setPlayVideo} />
      ) : (
        <motion.div
          onClick={() => setPlayVideo(true)}
          style={{
            left: video.position.x,
            top: video.position.y,
            transform: `translate(-50%, -50%)`, // Apply translate for centering
            zIndex: video.position.z,
          }}
          initial={{scale: video.position.scale}}
          animate={["animation"]}
          whileHover={["grow"]}
          whileTap={{scale: 0.9}}
          variants={{
            grow: {
              scale: 1.1,
              zIndex: 999,
            },

            animation: {
              //   scale: video.position.scale + 0.2,
              y: [-xMovement, xMovement],
              x: [-yMovement, yMovement],

              //   rotate: 0,
              transition: {
                duration: duration,
                repeat: Infinity,
                // repeatDelay: 0.2,
                repeatType: "reverse",
              },
            },
          }}
          //   whileHover={{scale: 1.1}}
          //   whileTap={{scale: 0.9}}
          className={`w-[100px] h-[150px] xsm:w-[130px] xsm:h-[195px] sm:h-[225px] sm:w-[150px]   md:w-[200px]  md:h-[300px]  rounded-lg  absolute  shadow-xl overflow-hidden group cursor-pointer `}
        >
          <div className="absolute z-20 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-transparent hover:bg-transparent hidden group-hover:block">
            <Icons.posts
              id={`video-play-icon-${i}`}
              className="text-white h-8 w-8 fill-white opacity-75 "
            />
          </div>
          {/* <div className="absolute bottom-0 bg-white/20 h-20 z-20 blurBack p-2 hover:h-fit transition-all duration-75 ease-in ">
        <p className="text-white text-sm  h-full overflow-hidden  text-ellipsis">
          {video.caption}
        </p>
      </div> */}
          <div className="h-full w-full relative ">
            <Image
              src={video.coverImage}
              layout="fill"
              objectFit="cover"
              alt="video display image"
            />
          </div>
        </motion.div>
      )}
    </>
  );
};

const VideoPlayer = ({
  video,
  setPlayVideo,
}: {
  video: string;
  setPlayVideo: any;
}) => {
  const [isPlaying, setIsPlaying] = React.useState(true);
  const videoRef = React.useRef<HTMLVideoElement>(null);

  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }

      setIsPlaying(!isPlaying);
    }
  };

  React.useEffect(() => {
    if (videoRef.current) {
      videoRef.current.play();
    }
  }, [videoRef]);

  return (
    <div className=" absolute   left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full z-[999] ">
      <div
        onClick={() => setPlayVideo(false)}
        className="absolute bg-white/5 blurBack h-full w-full z-10 cursor-pointer"
      />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-[15]">
        <Icons.spinner className=" h-20 w-20 animate-spin text-white " />
      </div>
      <video
        ref={videoRef}
        className=" z-20 h-full aspect-[9/16] rounded-lg mx-auto relative"
        src={video}
        autoPlay
        loop
      />
      <button
        onClick={togglePlay}
        className="absolute top-0  h-full left-1/2 -translate-x-1/2 aspect-[9/16] z-30 flex justify-center items-center "
      >
        {isPlaying ? null : ( // <Icons.pause className="h-12 w-12 fill-background text-background opacity-50" />
          <Icons.posts className="h-12 w-12 fill-white text-white opacity-80" />
        )}
      </button>
    </div>
  );
};
