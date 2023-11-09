"use client";

import React from "react";
import Image from "next/image";

import {Button} from "@/app/admin/components/ui/button";
import {DateRange} from "react-day-picker";
import {addDays, subDays, startOfToday} from "date-fns";

import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/app/admin/components/ui/tabs";
import {CalendarDateRangePicker} from "@/app/admin/(protected)/reports/components/date-range-picker";
import SalesReport from "@/app/admin/(protected)/reports/tabs/sales/sales-report";
import EmailReport from "@/app/admin/(protected)/reports/tabs/email/email-report";
import FianceReport from "@/app/admin/(protected)/reports/tabs/fiance/fiance-report";
import SocialsReport from "@/app/admin/(protected)/reports/tabs/socials/socials-report";
import SiteReport from "@/app/admin/(protected)/reports/tabs/site/site-report";

const Reports = () => {
  const [date, setDate] = React.useState<DateRange | undefined>({
    from: subDays(startOfToday(), 7),
    to: startOfToday(),
  });

  return (
    <div className="flex-col flex">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <div className="flex items-center justify-between space-y-2">
          <h2 className="text-3xl font-bold tracking-tight">Reports</h2>
          <div className="items-center space-x-2 hidden md:flex">
            <CalendarDateRangePicker date={date} setDate={setDate} />
            <Button>Download</Button>
          </div>
        </div>
        <Tabs defaultValue="sales" className="space-y-4">
          <TabsList>
            <TabsTrigger value="sales">Sales</TabsTrigger>
            <TabsTrigger value="site">Website</TabsTrigger>
            <TabsTrigger value="email">Email</TabsTrigger>
            <TabsTrigger value="fiance">Fiances</TabsTrigger>
            <TabsTrigger value="socials">Socials</TabsTrigger>
          </TabsList>
          <TabsContent value="sales" className="space-y-4">
            <SalesReport date={date} />
          </TabsContent>
          <TabsContent value="site" className="space-y-4">
            <SiteReport date={date} />
          </TabsContent>
          <TabsContent value="email" className="space-y-4">
            <EmailReport date={date} />
          </TabsContent>
          <TabsContent value="fiance" className="space-y-4">
            <FianceReport date={date} />
          </TabsContent>
          <TabsContent value="socials" className="space-y-4">
            <SocialsReport date={date} />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Reports;
