import React from "react";
import {constructMetadata} from "@/lib/utils";

export const metadata = constructMetadata({
  title: "Newsletter",
  description: "The #1 place for young founders",
});

const Newsletter = () => {
  return (
    <div className="lg:mt-20 py-10">
      <h1 className="font-head font-bold text-5xl text-center text-theme-blue">
        The Founder Central Newsletter
      </h1>
      <p className="font-body text-2xl text-center">
        The #1 place for young founders
      </p>
      <div className="w-full bg-theme-blue p-6 h-fit flex flex-col items-center gap-6 px-20 mt-10 ">
        <h1 className="text-white font-head text-4xl ">
          Join 45k other founders like yourself
        </h1>
        <iframe
          src="https://embeds.beehiiv.com/77dff1b9-eaaf-4b3a-9c41-ff3f7209ed44?slim=true"
          data-test-id="beehiiv-embed"
          height="52"
          scrolling="no"
          className="shadow-lg w-full md:max-w-[80%]"
          // style={"margin: 0; border-radius: 0px !important; background-color: transparent;"}
        ></iframe>
      </div>
      <div className="flex flex-col mt-10 container ">
        <h1 className="text-center font-head text-theme-blue text-4xl">
          What you get when you join
        </h1>
        <div className="grid grid-cols-3 gap-10 text-center mt-10">
          <div className="bg-theme-pink flex flex-col p-6 rounded-lg shadow w-full gap-2">
            <h1 className="font-head font-bold text-white text-2xl">
              Talk to other founders
            </h1>
            <p className="font-body text-white">
              Join a community of other founders to discuss what's working for
              them, the challenges they are facing and the secret hacks they are
              using. Get a behind-the-scenes view of founders in the trenches
              and watch them build life changing startups from day 1.
            </p>
          </div>
          <div className="bg-theme-yellow flex flex-col p-6 rounded-lg shadow w-full gap-2">
            <h1 className="font-head font-bold text-white text-2xl">
              Accountability group
            </h1>
            <p className="font-body text-white">
              Entrepreneurship can get lonely. When you join this founders-only
              slack group, you get a supportive network of other ambitious
              people to keep you going and share the ups and downs with.
              Includes three weekly check-ins and one monthly group call.
            </p>
          </div>
          <div className="bg-theme-purple flex flex-col p-6 rounded-lg shadow w-full gap-2">
            <h1 className="font-head font-bold text-white text-2xl">
              Stay Motivated
            </h1>
            <p className="font-body text-white">
              Every week, we send out two emails to the 45,000 founders in the
              community. Read about the success stories of self-made
              billionaires and founders that are currently in the trenches.
              Plus, get a chance to be featured in the newsletter if you are
              working on something cool.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Newsletter;
