import React, {useEffect} from "react";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/app/admin/components/ui/card";
import {DateRange} from "react-day-picker";
import {Icons} from "@/app/admin/components/icons";
import {AnalyticsResponseData} from "@/app/admin/types";
import {Separator} from "@/app/admin/components/ui/separator";
import Image from "next/image";
import {ScrollArea} from "@/app/admin/components/ui/scroll-area";

import {
  OverviewCard,
  PieOverview,
} from "@/app/admin/(protected)/reports/tabs/site/components/overview";

const SocialsReport = ({date}: {date: DateRange | undefined}) => {
  const [analyticsData, setAnalyticsData] =
    React.useState<AnalyticsResponseData>();
  const [loading, setLoading] = React.useState<boolean>();

  useEffect(() => {
    async function fetchAnalyticsData() {
      setLoading(true);
      try {
        const res = await fetch("/api/admin/get-analytics", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          // Config this
          body: JSON.stringify(date),
        });
        if (!res.ok) {
          throw new Error(`Fetch failed with status: ${res.status}`);
        }

        const data: AnalyticsResponseData = await res.json();
        setAnalyticsData(data);
      } catch (error) {
        console.error("Error fetching analytics data:", error);
      }
      setLoading(false);
    }

    fetchAnalyticsData();
  }, [date]);

  return (
    <div className=" flex-col flex min-h-screen">
      <div className="flex-1 space-y-4 pt-0 ">
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Page views</CardTitle>
              <Icons.showPassword className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {analyticsData
                  ? !loading
                    ? analyticsData.siteTrafficData.pageViews
                    : "--"
                  : "--"}
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Visitors</CardTitle>
              <Icons.profile className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {analyticsData
                  ? !loading
                    ? analyticsData.siteTrafficData.users
                    : "--"
                  : "--"}
              </div>
            </CardContent>
          </Card>
        </div>
        <div className="grid gap-4 grid-cols-1 md:grid-cols-6 ">
          <Card className="col-span-1 md:col-span-4 relative max-w-full h-fit">
            <CardHeader>
              <CardTitle>Traffic</CardTitle>
            </CardHeader>
            <CardContent className="pl-2 ">
              {analyticsData && (
                <OverviewCard
                  siteTrafficByDateData={analyticsData.siteTrafficByDateData}
                />
              )}
              {loading && (
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                  <Icons.spinner className="h-12 w-12 text-primary  ml-auto animate-spin " />
                </div>
              )}
            </CardContent>
          </Card>
          <Card className="col-span-1 md:col-span-2 relative ">
            <CardHeader className="md:pb-0 pb-6">
              <CardTitle>Traffic Source</CardTitle>
              <CardContent className="relative h-[600px]">
                <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
                  {loading || !analyticsData ? (
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                      <Icons.spinner className="h-12 w-12 text-primary  ml-auto animate-spin " />
                    </div>
                  ) : (
                    <div className="grid grid-rows-[60%_50%] h-[600px]  w-[400px]">
                      <div className="relative  w-[400px] h-full ">
                        <PieOverview data={analyticsData.pageReferrerData} />
                      </div>
                      <ScrollArea className="h-[200px] w-[400px]  rounded-md   md:col-span-2 ">
                        {loading || !analyticsData ? (
                          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                            <Icons.spinner className="h-12 w-12 text-primary  ml-auto animate-spin " />
                          </div>
                        ) : (
                          <>
                            {analyticsData.pageReferrerData.map((tag) => (
                              <>
                                <div
                                  key={tag.title}
                                  className="justify-between w-[90%] mx-auto grid grid-cols-[80%_20%]"
                                >
                                  <div className="flex items-center gap-4 max-w-full overflow-hidden text-ellipsis">
                                    <h1 className="w-full text-ellipsis overflow-hidden whitespace-nowrap">
                                      {tag.title.length ? tag.title : "Direct"}
                                    </h1>
                                  </div>
                                  <h1 className="ml-auto">{tag.value}</h1>
                                </div>
                                <Separator className="my-2" />
                              </>
                            ))}
                          </>
                        )}
                      </ScrollArea>
                    </div>
                  )}
                </div>
              </CardContent>
            </CardHeader>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default SocialsReport;
