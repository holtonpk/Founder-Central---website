"use client";

import * as React from "react";
import * as SliderPrimitive from "@radix-ui/react-slider";

import {cn} from "@/lib/utils";

const Slider = React.forwardRef<
  React.ElementRef<typeof SliderPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof SliderPrimitive.Root>
>(({className, ...props}, ref) => (
  <SliderPrimitive.Root
    ref={ref}
    className={cn(
      "relative flex w-full touch-none select-none items-center group",
      className
    )}
    {...props}
  >
    <SliderPrimitive.Track className="relative h-2 w-full grow overflow-hidden rounded-full bg-secondary">
      <SliderPrimitive.Range className="absolute h-full bg-theme-blue" />
    </SliderPrimitive.Track>
    {props.children}
    {/* <div className="absolute ease-in-out duration-150  -translate-y-0 -translate-x-1/2 w-fit left-[20%] text-center rounded-full text-white whitespace-nowrap text-xs font-bold">
      <span className="h-6 w-1 absolute bg-theme-pink rounded-sm  left-1/2 -translate-x-1/2 -translate-y-0"></span>
      <h1 className="-translate-y-4 text-theme-pink">Avg.</h1>
    </div> */}
    <SliderPrimitive.Thumb className="block relative h-5 w-5 rounded-full border-2 border-theme-blue  bg-background ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50">
      <h1 className="absolute ease-in-out duration-150 opacity-0 group-hover:opacity-100 group-hover:-translate-y-10 -translate-x-8 -translate-y-1/2 left-1/2  px-5 py-2 bg-theme-blue text-center rounded-full text-white whitespace-nowrap text-xs font-bold">
        {props.value}%
      </h1>
    </SliderPrimitive.Thumb>
  </SliderPrimitive.Root>
));
Slider.displayName = SliderPrimitive.Root.displayName;

export {Slider};
