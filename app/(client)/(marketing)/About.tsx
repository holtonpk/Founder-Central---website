"use client";

import {Icons} from "@/app/(client)/components/icons";
import Image from "next/image";
import React, {use, useEffect} from "react";
import {useLockBody} from "@/lib/hooks/use-lock-body";
import {LinkButton} from "../components/ui/link";
import {motion} from "framer-motion";
import Background from "../components/noise";
import SubscribePopup from "@/app/(client)/components/subscribe-popup";
import {siteConfig} from "@/config/site";

import {cn} from "@/lib/utils";
type WhyCard = {
  icon: keyof typeof Icons;
  title: string;
  description: string;
  cta: {
    text: string;
    link: string;
    target?: string;
    custom?: React.ReactNode;
  };
  color: {
    bg: string;
    text: string;
    hoverText: string;
  };
};
const whyCards: WhyCard[] = [
  {
    icon: "openBook",
    title: "50 Stories, 1 Book",
    description:
      "Read stories of people who, just like you, started with a dream, navigated through storms and transformed their vision into life changing wealth.",
    cta: {
      text: "View Book",
      target: "_self",
      link: "/books/shop/snapshots-of-success-the-50-greatest-business-success-stories",
    },
    color: {
      bg: "bg-theme-purple",
      text: "text-theme-purple",
      hoverText: "hover:text-theme-purple",
    },
  },
  {
    icon: "clapperBoard",
    title: "Daily Short Video Series",
    description:
      "Once a day, we tell the story of a business icon in 60 seconds. Follow the series to get the golden nuggets you need for your own journey.",
    cta: {
      text: "View Our Instagram",
      link: siteConfig.links.instagram,
      target: "_blank",
    },
    color: {
      bg: "bg-theme-yellow",
      text: "text-theme-yellow",
      hoverText: "hover:text-theme-yellow",
    },
  },
  {
    icon: "mails",
    title: "Weekly Newsletter",
    description:
      "Don't have the time to follow the series? We send out a weekly email that has a compilation of all the weeks stories. Plus, you can connect with like-minded founders reading the same email.",
    cta: {
      text: "Join Newsletter",
      link: "/",
      target: "_self",
      custom: (
        <SubscribePopup
          className={`bg-transparent border-white hover:text-theme-pink`}
        >
          Join Newsletter
        </SubscribePopup>
      ),
    },
    color: {
      bg: "bg-theme-pink",
      text: "text-theme-pink",
      hoverText: "hover:text-theme-pink",
    },
  },
];

const About = () => {
  return (
    <div
      id="About"
      className=" relative top-0 h-fit pb-10 mt-10 md:mt-0 z-20 bg-theme-blue/10"
    >
      <div className="md:container relative md:top-20 z-20 flex flex-col md:max-w-screen-xl overflow-visible">
        <div className="md:container mx-auto w-[90%] lg:w-[70%] items-center md:items-start justify-between gap-4 md:gap-2 relative">
          <h1
            id="about-title"
            className="  font-head font-bold md:text-left  text-4xl lg:text-7xl  text-theme-blue"
          >
            Business Content for Business Geeks.
          </h1>
          <div className="flex flex-col  md:items-start">
            <p
              id="about-description"
              className="font-body  md:text-left mt-4 text-sm md:text-lg text-black"
            >
              Founder Central delivers daily inspiration and unfiltered insights
              for business people. Learn from the success stories of
              billionaires and connect with other ambitious founders like
              yourself.
            </p>
            <LinkButton
              href="/about"
              className="underline text-black w-fit p-0 font-bold hover:text-theme-blue "
              variant={"link"}
            >
              Learn More
            </LinkButton>
          </div>
        </div>
        <div
          id="mobileScrollBox"
          className="md:hidden max-w-screen-xl h-fit px-4 flex justify-center"
        >
          <div className="grid gap-10 mt-10 z-10 relative items-center mx-auto w-fit">
            {whyCards.map((card, i) => (
              <MobileCard key={i} card={card} i={i} />
            ))}
          </div>
        </div>
        <div
          id="desktopScrollBox"
          className="md:block hidden max-w-screen-xl mt-16 no px-0 snap-x  "
        >
          <div className="grid grid-cols-3 gap-6  h-fit  pb-10 z-10 relative w-full">
            {whyCards.map((card, i) => (
              <DesktopCard key={i} card={card} i={i} />
            ))}
          </div>
        </div>
      </div>
      <div className="absolute w-full bg-white h-full md:h-[80%] left-0 top-0" />
    </div>
  );
};

export default About;

const DesktopCard = ({card, i}: {card: WhyCard; i: number}) => {
  const Icon = Icons[card.icon];

  return (
    <motion.div
      whileHover={{scale: 1.1}}
      whileTap={{scale: 0.9}}
      id={`desktop-card-${i}`} // Added ID here
      className={` flex h-fit w-full  rounded-lg shadow-lg items-start flex-col gap-3 p-4 transition-all duration-300 blurBack
      ${card.color.bg}`}
    >
      <Background />
      <div className="h-fit w-fit rounded-md bg-white p-2 aspect-square flex justify-center items-center">
        <Icon
          id={`desktop-card-icon-${i}`} // Added ID here
          className={cn(`card-icon h-8 w-8  ${card.color.text} `)}
        />
      </div>
      <h1
        id={`desktop-card-title-${i}`} // Added ID here
        className={`card-title text-base font-semibold lg:text-2xl font-head text-left text-white `}
      >
        {card.title}
      </h1>
      <p
        id={`desktop-card-description-${i}`} // Added ID here
        className="card-description text-base font-body text-left text-white h-[100px]  "
      >
        {card.description}
      </p>
      {card.cta?.custom ? (
        <>{card.cta.custom}</>
      ) : (
        <LinkButton
          target={card.cta.target}
          href={card.cta.link}
          className={`bg-transparent border-white ${card.color.hoverText}`}
        >
          {card.cta.text}
        </LinkButton>
      )}
    </motion.div>
  );
};

const MobileCard = ({card, i}: {card: WhyCard; i: number}) => {
  const [displayed, setDisplayed] = React.useState(false);

  const [centerPosition, setCenterPosition] = React.useState(i == 0 ? 0 : 1000);
  const cardRef = React.useRef<HTMLDivElement>(null);
  const Icon = Icons[card.icon];

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  });

  const handleScroll = () => {
    const card = cardRef.current?.getBoundingClientRect().top;
    if (card) {
      card < window.innerHeight * 0.75 && setDisplayed(true);
      card > window.innerHeight * 0.75 && setDisplayed(false);
    }
  };

  return (
    <div
      id={`desktop-card-${i}`} // Added ID here
      className={` flex h-fit w-full  rounded-lg shadow-lg items-center flex-col gap-3 p-4 transition-all duration-300 blurBack
      ${card.color.bg}`}
    >
      <Background />
      <div className="h-fit w-fit rounded-md bg-white p-2 aspect-square flex justify-center items-center">
        <Icon
          id={`desktop-card-icon-${i}`} // Added ID here
          className={cn(`card-icon h-8 w-8  ${card.color.text} `)}
        />
      </div>
      <h1
        id={`desktop-card-title-${i}`} // Added ID here
        className={`card-title text-base font-semibold lg:text-2xl font-head  text-white text-center`}
      >
        {card.title}
      </h1>
      <p
        id={`desktop-card-description-${i}`} // Added ID here
        className="card-description text-base font-body text-center text-white h-fit  "
      >
        {card.description}
      </p>
      {card.cta?.custom ? (
        <>{card.cta.custom}</>
      ) : (
        <LinkButton
          href={card.cta.link}
          className={`bg-transparent border-white ${card.color.hoverText}`}
        >
          {card.cta.text}
        </LinkButton>
      )}
    </div>
    // <div
    //   ref={cardRef}
    //   id={`mobile-card-${i}`} // Added ID here
    //   className={`mobile-card snap-centers relative  md:hidden bottom-0 h-[300px] w-[300px] md:w-full rounded-lg shadow-lg  border-t-4 flex flex-col gap-3 p-4 transition-all duration-300
    // ${
    //   displayed
    //     ? "border-t-theme-blue -translate-x-0 "
    //     : i % 2 == 0
    //     ? "-translate-x-20 opacity-0"
    //     : "translate-x-20 opacity-0"
    // }
    // `}
    // >
    //   <Icon
    //     id={`mobile-card-icon-${i}`} // Added ID here
    //     className={`${
    //       displayed ? "text-theme-blue" : "text-black"
    //     } card-icon h-8 w-8 mx-auto mt-5`}
    //   />
    //   <h1
    //     id={`mobile-card-title-${i}`} // Added ID here
    //     className={`card-title text-2xl font-head text-center ${
    //       displayed ? "text-theme-blue" : "text-black"
    //     }`}
    //   >
    //     {card.title}
    //   </h1>
    //   <p
    //     id={`mobile-card-description-${i}`} // Added ID here
    //     className="card-description text-sm font-body text-center text-black mt-6"
    //   >
    //     {card.description}
    //   </p>
    // </div>
  );
};
