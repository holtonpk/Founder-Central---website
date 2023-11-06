"use client";

import * as React from "react";
import {Icons} from "@/app/admin/components/icons";
import {DateRange} from "react-day-picker";
import {format} from "date-fns";

import {cn} from "@/lib/utils";
import {Button} from "@/app/admin/components/ui/button";
import {Calendar} from "@/app/admin/components/ui/calendar";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/app/admin/components/ui/select";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/app/admin/components/ui/popover";
import {subDays, startOfToday} from "date-fns";

export function CalendarDateRangePicker({
  date,
  setDate,
}: {
  date: DateRange | undefined;
  setDate: (date: DateRange | undefined) => void;
}) {
  const timeFrames = [
    {
      startDate: subDays(startOfToday(), 1),
      units: "hours",
    },
    {
      startDate: subDays(startOfToday(), 7),
      units: "days",
    },
    {
      startDate: subDays(startOfToday(), 30),
      units: "days",
    },
  ];

  type TimeFrame = {
    startDate: Date;
    units: string;
  };
  const [timeFrame, setTimeFrame] = React.useState<TimeFrame>(timeFrames[1]);

  React.useEffect(() => {
    setDate({
      from: timeFrame.startDate,
      to: startOfToday(),
    });
  }, [timeFrame, setDate]);

  return (
    <div className={cn("grid grid-cols-2 gap-2")}>
      <Popover>
        <PopoverTrigger asChild>
          <Button
            id="date"
            variant={"outline"}
            className={cn(
              "w-[260px] justify-start text-left font-normal",
              !date && "text-muted-foreground"
            )}
          >
            <Icons.calendar className="mr-2 h-4 w-4" />
            {date?.from ? (
              date.to ? (
                <>
                  {format(date.from, "LLL dd, y")} -{" "}
                  {format(date.to, "LLL dd, y")}
                </>
              ) : (
                format(date.from, "LLL dd, y")
              )
            ) : (
              <span>Pick a date</span>
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="end">
          <Calendar
            initialFocus
            mode="range"
            defaultMonth={date?.from}
            selected={date}
            onSelect={setDate}
            numberOfMonths={2}
          />
        </PopoverContent>
      </Popover>
      <Select
        onValueChange={(value: string) =>
          setTimeFrame(timeFrames[parseInt(value)])
        }
      >
        <SelectTrigger
          // defaultValue={"7d"}
          className="w-[250px] flex items-center gap-2 pl-8 relative"
        >
          <Icons.calendar className="h-4 w-4 text-muted-foreground absolute left-2 top-1/2 -translate-y-1/2" />
          <SelectValue placeholder="Last 7 days" className="w-fit" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="0">Last 24 hours</SelectItem>
          <SelectItem value="1">Last 7 days</SelectItem>
          <SelectItem value="2">Last 30 days</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
}
