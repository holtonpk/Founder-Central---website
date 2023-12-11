import React from "react";
import Hero from "./Hero";
import Display from "./Display";
import About from "./About";
import {siteConfig} from "@/config/site";
import {constructMetadata} from "@/lib/utils";
import Noise from "@/app/(client)/components/noise";
import VideoDisplay from "./videoDisplay";
import NewsLetter from "./newsletter";
import Feedback from "./feedback";
import BookDisplay from "./bookDisplay";

export const metadata = constructMetadata({
  title: siteConfig.pages.home.title,
  description: siteConfig.pages.home.description,
});

const HomePage = () => {
  return (
    <div className="overflow-hidden max-w-screen  bg-white ">
      {/* <div className="background"></div> */}
      <Hero />
      <About />
      <VideoDisplay />
      <Feedback />
      <NewsLetter />
      <BookDisplay />
      <Noise />
    </div>
  );
};

export default HomePage;
