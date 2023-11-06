import React from "react";
import {Input} from "@/app/(client)/components/ui/input";
import {Button} from "@/app/(client)/components/ui/button";
const Newsletter = () => {
  return (
    <div className="h-fit bg-theme-blue/10 py-20 relative z-10 ">
      <div className="flex flex-col w-[70%] mx-auto gap-6">
        <h1 className="text-theme-blue text-3xl font-body font-bold text-center md:text-left">
          What’s In The Weekly Email?
        </h1>
        <p className="text-theme-blue text-base md:text-xl font-body text-center md:text-left">
          Every week, we send out a compilation of all the content you might
          have missed in a single email. Plus, you can connect with like-minded
          founders reading the same email
        </p>
        <div className="w-full md:w-[60%] flex relative">
          <Input
            placeholder="youremail@domain.com"
            className="relative bg-white shadow-lg border-none rounded-lg"
          />
          <Button className="bg-theme-pink text-white rounded-lg absolute right-0 rounded-l-none border-none">
            Subscribe
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Newsletter;
