"use client";
import React, {PureComponent} from "react";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/app/admin/components/ui/avatar";
import {
  Area,
  AreaChart,
  Tooltip,
  CartesianGrid,
  Bar,
  BarChart,
  ResponsiveContainer,
  XAxis,
  YAxis,
  PieChart,
  Pie,
  Cell,
  Sector,
} from "recharts";
import {formatDateShort} from "@/app/admin/lib/utils";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/app/admin/components/ui/tabs";
import {Icons} from "@/app/admin/components/icons";
import {formatDateMonthDay} from "@/app/admin/lib/utils";

export function OverviewCard({
  siteTrafficByDateData,
}: {
  siteTrafficByDateData: {date: string; value: string}[];
}) {
  // Assuming you have your sales data in the 'salesData' array
  const combinedData: {[date: string]: {total: number}} = {};

  siteTrafficByDateData.forEach((item) => {
    const formattedDate = formatDate(item.date);
    if (combinedData[formattedDate]) {
      combinedData[formattedDate].total += Number(item.value);
    } else {
      combinedData[formattedDate] = {
        total: Number(item.value),
      };
    }
  });

  const combinedDataArray = Object.keys(combinedData)
    .sort((a, b) => new Date(a).getTime() - new Date(b).getTime())
    .map((date) => ({
      date: date,
      value: combinedData[date].total,
    }));

  return (
    <Tabs defaultValue="bar" className="w-full flex flex-col">
      <TabsList className="absolute right-6 top-6">
        <TabsTrigger value="bar">
          <Icons.barChart className="h-5 w-5" />
        </TabsTrigger>
        <TabsTrigger value="line">
          <Icons.lineChart className="h-5 w-5" />
        </TabsTrigger>
      </TabsList>
      <TabsContent value="bar">
        <BarOverview siteTrafficByDateData={combinedDataArray} />
      </TabsContent>
      <TabsContent value="line">
        <LineOverview siteTrafficByDateData={combinedDataArray} />
      </TabsContent>
    </Tabs>
  );
}

export function LineOverview({
  siteTrafficByDateData,
}: {
  siteTrafficByDateData: {date: string; value: number}[];
}) {
  const sortedData = siteTrafficByDateData.sort((a, b) => {
    if (a.date < b.date) {
      return -1;
    } else {
      return 1;
    }
  });

  const data = sortedData.map((item) => ({
    name: item.date,
    total: item.value,
  }));
  return (
    <ResponsiveContainer width="100%" height={350}>
      <AreaChart data={data} margin={{top: 10, right: 30, left: 0, bottom: 5}}>
        <defs>
          <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
            <stop
              offset="5%"
              stopColor="hsl(var(--primary))"
              stopOpacity={0.3}
            />
            <stop
              offset="95%"
              stopColor="hsl(var(--primary))"
              stopOpacity={0}
            />
          </linearGradient>
        </defs>
        <XAxis
          dataKey="name"
          stroke="#888888"
          fontSize={12}
          tickLine={false}
          axisLine={false}
        />
        <YAxis
          stroke="#888888"
          fontSize={12}
          tickLine={false}
          axisLine={false}
          tickFormatter={(value) => `${value}`}
          padding={{top: 0}}
        />
        <Tooltip content={<CustomTooltip />} />
        <Area
          dataKey="total"
          //   className="fill-primary"
          stroke="hsl(var(--primary))"
          fillOpacity={1}
          fill="url(#colorUv)"
        />
        <CartesianGrid vertical={false} stroke="hsl(var(--border))" />
      </AreaChart>
    </ResponsiveContainer>
  );
}

export function BarOverview({
  siteTrafficByDateData,
}: {
  siteTrafficByDateData: {date: string; value: number}[];
}) {
  const sortedData = siteTrafficByDateData.sort((a, b) => {
    if (a.date < b.date) {
      return -1;
    } else {
      return 1;
    }
  });

  const data = sortedData.map((item) => ({
    name: item.date,
    total: item.value,
  }));
  return (
    <ResponsiveContainer width="100%" height={350}>
      <BarChart data={data}>
        <XAxis
          dataKey="name"
          stroke="#888888"
          fontSize={12}
          tickLine={false}
          axisLine={false}
        />
        <YAxis
          stroke="#888888"
          fontSize={12}
          tickLine={false}
          axisLine={false}
          tickFormatter={(value) => `${value}`}
        />
        <Tooltip content={<CustomTooltip />} cursor={{fill: "transparent"}} />
        <Bar dataKey="total" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} />
      </BarChart>
    </ResponsiveContainer>
  );
}

function formatDateYYYYMMDD(inputDate: string): string {
  if (inputDate.length !== 8) {
    throw new Error(
      "Invalid input date format. It should be in YYYYMMDD format."
    );
  }

  const year = inputDate.slice(0, 4);
  const month = inputDate.slice(4, 6);
  const day = inputDate.slice(6, 8);

  return `${day}/${month}`;
}

function dateYYYYMMDDToTimestamp(inputDate: string): number {
  if (inputDate.length !== 8) {
    throw new Error(
      "Invalid input date format. It should be in YYYYMMDD format."
    );
  }

  const year = parseInt(inputDate.slice(0, 4), 10);
  const month = parseInt(inputDate.slice(4, 6), 10) - 1; // Months are 0-indexed
  const day = parseInt(inputDate.slice(6, 8), 10);

  const date = new Date(year, month, day);
  const timestamp = date.getTime() / 1000; // Convert to Unix timestamp (seconds since epoch)

  return timestamp;
}

function timestampToMMDD(timestamp: number): string {
  const date = new Date(timestamp * 1000); // Convert timestamp to milliseconds
  const day = date.getDate().toString().padStart(2, "0"); // Get day and pad with leading zero if necessary
  const month = (date.getMonth() + 1).toString().padStart(2, "0"); // Get month (months are 0-indexed) and pad with leading zero if necessary

  return `${month}/${day}`;
}

function convertToTime(dateTime: string): string {
  if (dateTime.length !== 10) {
    throw new Error("Invalid date format. Expected 'YYYYMMDDHH'.");
  }

  const year = dateTime.slice(0, 4);
  const month = dateTime.slice(4, 6);
  const day = dateTime.slice(6, 8);
  const hour = dateTime.slice(8, 10);

  const date = new Date(`${year}-${month}-${day}T${hour}:00:00Z`);
  const timeOptions = {
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  };

  return date.toLocaleTimeString("en-US", timeOptions as any);
}

function formatDate(yyyyMMddhh: string): string {
  // Ensure the input string has at least 8 characters
  if (yyyyMMddhh.length < 8) {
    throw new Error("Invalid input format");
  }

  // Extract year, month, and day components from the input string
  const year = yyyyMMddhh.slice(0, 4);
  const month = yyyyMMddhh.slice(4, 6);
  const day = yyyyMMddhh.slice(6, 8);

  // Create a Date object with the extracted components
  const date = new Date(`${year}-${month}-${day}`);

  // Format the date as "mm/dd"
  const mmdd = `${(date.getMonth() + 1).toString().padStart(2, "0")}/${date
    .getDate()
    .toString()
    .padStart(2, "0")}`;

  return mmdd;
}

const CustomTooltip = ({active, payload, label}: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="custom-tooltip bg-popover border border-border rounded-md p-3">
        <span className="h-4 w-4 rounded-full bg-primary"></span>
        <p className="label">{`Visitors : ${payload[0].value}`}</p>
        <p className="desc">{`${label}`}</p>
      </div>
    );
  }

  return null;
};

export const PieOverview = ({data}: {data: any}) => {
  console.log(data);

  const Top5 = data.slice(0, 5).map((item: any) => {
    let name = item.title;
    if (name == "") name = "Direct";
    else name = name.replace(/(https?:\/\/)?(www\.)?/, "").split(".")[0];
    if (name == "l") name = "Instagram";

    return {
      name: name,
      value: Number(item.value),
    };
  });

  // calculate the value of 5, data.length

  const otherValue = data
    .slice(5, data.length)
    .reduce(
      (accumulator: any, currentValue: any) =>
        accumulator + Number(currentValue.value),
      0
    );

  console.log("ov", otherValue);

  const formattedData = [
    ...Top5,
    {
      name: "Other",
      value: otherValue,
    },
  ];

  return (
    <ResponsiveContainer
      width={300}
      height={300}
      className="  overflow-visible absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
    >
      <Example data={formattedData} />
    </ResponsiveContainer>
  );
};

const renderActiveShape = (props: any) => {
  const RADIAN = Math.PI / 180;
  const {
    cx,
    cy,
    midAngle,
    innerRadius,
    outerRadius,
    startAngle,
    endAngle,
    fill,
    payload,
    percent,
    value,
  } = props;
  const sin = Math.sin(-RADIAN * midAngle);
  const cos = Math.cos(-RADIAN * midAngle);
  const sx = cx + (outerRadius + 10) * cos;
  const sy = cy + (outerRadius + 10) * sin;
  const mx = cx + (outerRadius + 10) * cos;
  const my = cy + (outerRadius + 20) * sin;
  const ex = mx + (cos >= 0 ? 1 : -1) * 22;
  const ey = my;
  const textAnchor = cos >= 0 ? "start" : "end";

  console.log(payload);
  return (
    <g>
      <text
        x={cx}
        y={cy}
        dy={8}
        textAnchor="middle"
        fill="hsl(var(--foreground))"
        className="uppercase flex flex-col"
      >
        {payload.name}
      </text>
      <Sector
        cx={cx}
        cy={cy}
        innerRadius={innerRadius}
        outerRadius={outerRadius}
        startAngle={startAngle}
        endAngle={endAngle}
        fill={fill}
      />
      <Sector
        cx={cx}
        cy={cy}
        startAngle={startAngle}
        endAngle={endAngle}
        innerRadius={outerRadius + 6}
        outerRadius={outerRadius + 10}
        fill={fill}
      />
      <path
        d={`M${sx},${sy}L${mx},${my}L${ex},${ey}`}
        stroke={fill}
        fill="none"
      />
      <circle cx={ex} cy={ey} r={2} fill={fill} stroke="none" />

      <text
        x={ex + (cos >= 0 ? 1 : -1) * 12}
        y={ey}
        textAnchor={textAnchor}
        className="absolute"
        fill="hsl(var(--muted-foreground))"
      >
        {value}
      </text>
      <text
        x={ex + (cos >= 0 ? 1 : -1) * 12}
        y={ey}
        dy={18}
        textAnchor={textAnchor}
        fill="hsl(var(--foreground))"
      >
        {` ${(percent * 100).toFixed(2)}%`}
      </text>
    </g>
  );
};
const COLORS = [
  "hsla(var(--primary))",
  "hsla(var(--primary) / .9)",
  "hsla(var(--primary) / .8)",
  "hsla(var(--primary) / .7)",
  "hsla(var(--primary) / .6)",
  "hsla(var(--primary) / .5)",
];

const Example = ({data}: {data: any}) => {
  const [activeIndex, setActiveIndex] = React.useState(0);

  const onPieEnter = (_: any, index: any) => {
    setActiveIndex(index);
  };

  return (
    <PieChart
      width={500}
      height={400}
      className=" absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 "
    >
      <Pie
        activeIndex={activeIndex}
        activeShape={renderActiveShape}
        data={data}
        cx="50%"
        cy="50%"
        innerRadius={80}
        outerRadius={140}
        fill="hsl(var(--primary))"
        dataKey="value"
        onMouseEnter={onPieEnter}
      >
        {data.map((entry: any, index: any) => (
          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
        ))}
      </Pie>
    </PieChart>
  );
};
