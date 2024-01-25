"use client";
import React, {useEffect} from "react";
import {Input} from "@/app/(client)/components/ui/input";
import {
  RadioGroup,
  RadioGroupItem,
} from "@/app/(client)/components/ui/radio-group";
import {Checkbox} from "@/app/(client)/components/ui/checkbox";
import {Label} from "@/app/(client)/components/ui/label";
import {Slider} from "@/app/(client)/components/ui/slider";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/app/(client)/components/ui/tooltip";
import {Icons} from "@/app/(client)/components/icons";
import {set} from "date-fns";

const Calculator = () => {
  const [newsletterSize, setNewsletterSize] = React.useState<any>(12);
  const [audienceValue, setAudienceValue] = React.useState<any[]>([1]);
  const [openRate, setOpenRate] = React.useState<any>(36);
  const [clickRate, setClickRate] = React.useState<any>(3);

  const handleNewsletterSize = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewsletterSize(Number(e.target.value));
  };

  const handleOpenRate = (e: Number[]) => {
    setOpenRate(Number(e[0]));
  };

  const handleClickRate = (e: Number[]) => {
    setClickRate(Number(e[0]));
  };

  const handleAudienceValueChange = (value: any, id: string) => {
    const element = document.getElementById(id);
    // check if element data-state is checked
    if (element?.getAttribute("data-state") === "checked") {
      const indexToRemove = audienceValue.indexOf(value);
      if (indexToRemove !== -1) {
        audienceValue.splice(indexToRemove, 1);
      }
      setAudienceValue([...audienceValue]);
    } else {
      setAudienceValue([...audienceValue, value]);
    }
  };

  useEffect(() => {
    console.log("av", audienceValue);
    if (!newsletterSize || !audienceValue || !openRate || !clickRate) return;
    const finalRate = Math.round(
      (((newsletterSize * Math.max(...audienceValue) * openRate) / 100) *
        clickRate) /
        100
    );
    nbrElmSpdDec(finalRate, document.getElementById("finalRate"), 1000, false);
  }, [newsletterSize, audienceValue, openRate, clickRate]);

  return (
    <div className="w-full h-fit bg-white p-6 rounded-md flex flex-col  gap-6 mt-4">
      <div className="grid w-full gap-4">
        <h1 className="font-bold text-lg flex items-center">
          Newsletter list size
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger>
                <Icons.info className="w-4 h-4 ml-2 text-theme-blue" />
              </TooltipTrigger>
              <TooltipContent className="w-80">
                <p>Your number of subscribers.</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </h1>
        <Input
          placeholder="Enter a number"
          type="number"
          className="w-full border-theme-blue text-theme-blue placeholder:text-theme-blue focus:ring"
          onChange={handleNewsletterSize}
        />
      </div>
      <div className="grid gap-4">
        <h1 className="font-bold text-lg">
          Select the best description of your audience
        </h1>
        <div className="grid gap-3 grid-cols-4">
          {Topics.map((topic, index) => (
            <div key={index} className="flex items-center space-x-2">
              <Checkbox
                value={topic.weight}
                id={topic.title}
                onClick={() =>
                  handleAudienceValueChange(topic.weight, topic.title)
                }
              />
              <Label className="text-xsm text-theme-blue" htmlFor={topic.title}>
                {topic.title}
              </Label>
            </div>
          ))}
        </div>
        {/* <RadioGroup
          className="gap-4 text-black/60"
          value={audienceValue}
          defaultValue="1"
          onValueChange={handleAudienceValue}
        >
           <div className="flex items-center space-x-2">
            <RadioGroupItem value={"1"} id="r1" />
            <Label htmlFor="r1">
              General interest audience (e.g., daily news roundup)
            </Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="2" id="r2" />
            <Label htmlFor="r2">
              Targeted interest audience (e.g., travelers, tech enthusiasts, pet
              lovers)
            </Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="4" id="r3" />
            <Label htmlFor="r3">
              Targeted professional audience (e.g., coders, stock traders,
              marketers)
            </Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="6" id="r4" />
            <Label htmlFor="r4">
              B2B audience (e.g., C-Suite, entrepreneurs, founders)
            </Label>
          </div>
        </RadioGroup> */}
      </div>
      {/* <div className="grid grid-cols-2 gap-10"> */}
      <div className="grid gap-4">
        <h1 className="font-bold text-lg flex items-center">
          Open rate (%)
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger>
                <Icons.info className="w-4 h-4 ml-2 text-theme-blue" />
              </TooltipTrigger>
              <TooltipContent className="w-80">
                <p>The percentage who open your emails (on average).</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </h1>
        <div className="flex flex-row items-center gap-1">
          0%
          <Slider
            max={100}
            step={1}
            value={[openRate]}
            // onValueChange={handleOpenRate}s
            onValueChange={handleOpenRate}
          >
            <div className="absolute ease-in-out duration-150  -translate-y-0 -translate-x-1/2 w-fit left-[36.5%] text-center rounded-full text-white whitespace-nowrap text-xs font-bold">
              <span className="h-6 w-1 absolute bg-theme-blue rounded-sm  left-1/2 -translate-x-1/2 -translate-y-0"></span>
              <h1 className="-translate-y-4 text-theme-blue">Avg.</h1>
            </div>
          </Slider>
          100%
        </div>
      </div>
      <div className="grid gap-2">
        <h1 className="font-bold text-lg flex items-center">
          Ad click rate (%)
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger>
                <Icons.info className="w-4 h-4 ml-2 text-theme-blue" />
              </TooltipTrigger>
              <TooltipContent className="w-80">
                <p>
                  Also known as the ad CTOR (or ad click-to-open ratio) is the
                  percentage of users who click on your ads — out of the set who
                  have opened your email. For instance, if you have 100
                  subscribers, 30 open, and 6 click, your ad click rate is 20%
                  (6 / 30).
                </p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </h1>
        <div className="flex flex-row items-center gap-1">
          0%
          <Slider
            max={100}
            step={1}
            value={[clickRate]}
            onValueChange={handleClickRate}
          >
            <div className="absolute ease-in-out duration-150  -translate-y-0 -translate-x-1/2 w-fit left-[4.3%] text-center rounded-full text-white whitespace-nowrap text-xs font-bold">
              <span className="h-6 w-1 absolute bg-theme-blue rounded-sm  left-1/2 -translate-x-1/2 -translate-y-0"></span>
              <h1 className="-translate-y-4 text-theme-blue">Avg.</h1>
            </div>
          </Slider>
          100%
        </div>
        {/* </div> */}
      </div>
      <div className="w-full bg-theme-blue p-4 rounded-md flex flex-col items-end">
        <span className="text-white opacity-60  items-center ">
          Rate card price for main sponsorship ($):
        </span>
        <span
          id="finalRate"
          className="opacity-1 font-bold text-3xl text-white"
        ></span>
      </div>
    </div>
  );
};

export default Calculator;

function nbrElmSpdDec(endNbr: any, elm: any, speed: any, decimal: Boolean) {
  if (endNbr == 0) {
    elm.innerHTML = 0;
    return;
  }

  let inc = endNbr / (speed / 10);
  function incNbrRec(i: any, endNbr: any, elm: any) {
    if (i + inc < endNbr) {
      if (decimal) {
        elm.innerHTML = (Math.ceil(i * 100) / 100)
          .toString()
          .replace(/\B(?=(\d{3})+(?!\d))/g, ",");
      } else {
        elm.innerHTML = Math.round((i * 100) / 100)
          .toString()
          .replace(/\B(?=(\d{3})+(?!\d))/g, ",");
      }

      setTimeout(function () {
        incNbrRec(i + inc, endNbr, elm);
      }, 1);
    } else if (i != endNbr && i + inc >= endNbr) {
      elm.innerHTML = endNbr.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }
  }
  incNbrRec(inc, endNbr, elm);
}

const Topics = [
  {
    title: "Daily News Roundup",
    weight: 1,
  },
  {
    title: "Lifestyle Tips and Hacks",
    weight: 1,
  },

  {
    title: "Entertainment News and Reviews",
    weight: 1,
  },
  {
    title: "Other General Interest Audience",
    weight: 1,
  },
  {
    title: "Travelers",
    weight: 2,
  },
  {
    title: "Tech Enthusiasts",
    weight: 2,
  },
  {
    title: "Pet Lovers",
    weight: 2,
  },
  {
    title: "Other Targeted Interest Audience",
    weight: 2,
  },
  {
    title: "Coders",
    weight: 4,
  },
  {
    title: "Stock Traders",
    weight: 4,
  },
  {
    title: "Marketers",
    weight: 4,
  },
  {
    title: "Other Targeted Professional Audience",
    weight: 4,
  },
  {
    title: "C-Suite",
    weight: 6,
  },
  {
    title: "Entrepreneurs",
    weight: 6,
  },
  {
    title: "Founders",
    weight: 6,
  },
  {
    title: "Other B2B Audience",
    weight: 6,
  },
];
