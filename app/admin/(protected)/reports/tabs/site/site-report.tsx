import React, {useEffect} from "react";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/app/admin/components/ui/card";

import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/app/admin/components/ui/tabs";
import {DateRange} from "react-day-picker";
import {Icons} from "@/app/admin/components/icons";
import {AnalyticsResponseData} from "@/app/admin/types";
import {Separator} from "@/app/admin/components/ui/separator";
import Image from "next/image";
import {ScrollArea} from "@/app/admin/components/ui/scroll-area";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/app/admin/components/ui/avatar";
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
    <div className=" flex-col flex  ">
      <div className="  pt-0 ">
        <div className="grid gap-4 grid-cols-1 md:grid-cols-6  ">
          <div className="flex flex-col gap-4 col-span-1 md:col-span-4">
            <div className="grid gap-4  md:grid-cols-3  w-full">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                    Page views
                  </CardTitle>
                  <Icons.showPassword className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">
                    {analyticsData
                      ? !loading
                        ? formatNumber(analyticsData.siteTrafficData.pageViews)
                        : "--"
                      : "--"}
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                    Visitors
                  </CardTitle>
                  <Icons.profile className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">
                    {analyticsData
                      ? !loading
                        ? formatNumber(analyticsData.siteTrafficData.users)
                        : "--"
                      : "--"}
                  </div>
                </CardContent>
              </Card>
            </div>
            <Card
              className={` relative max-w-full ${loading ? "h-full" : "h-fit"}`}
            >
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
          </div>

          <Card className=" relative w-full col-span-1 md:col-span-2">
            <Tabs defaultValue="source" className="space-y-4 ">
              <CardHeader className="md:pb-0 pb-6 z-20 relative">
                <TabsList className="w-fit">
                  <TabsTrigger value="source">Source</TabsTrigger>
                  <TabsTrigger value="pages">Top Pages</TabsTrigger>
                </TabsList>
              </CardHeader>
              <TabsContent
                value="source"
                className="space-y-4 w-full col-span-1 md:col-span-2 z-10 relative"
              >
                <CardContent className="relative h-[500px] w-full  ">
                  {loading || !analyticsData ? (
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                      <Icons.spinner className="h-12 w-12 text-primary  ml-auto animate-spin " />
                    </div>
                  ) : (
                    <div className="grid-cols-1 grid grid-rows-[60%_40%] space-y-4 h-full w-full relative  ">
                      <div className="relative  min-w-full h-full  ">
                        <PieOverview data={analyticsData.pageReferrerData} />
                      </div>
                      <div className="h- flex flex-col h-full justify-between space-y-1 w-full overflow-scroll rounded-md">
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
                                  className="justify-between  mx-auto grid grid-cols-[80%_20%]  py-1  w-full"
                                >
                                  <div className="flex items-center gap-4 max-w-full overflow-hidden text-ellipsis">
                                    <Avatar className="h-6 w-6">
                                      <AvatarImage
                                        src={`https://www.google.com/s2/favicons?domain=${tag.title}&sz=2000`}
                                        alt="Avatar"
                                      />
                                      <AvatarFallback>
                                        <Icons.globe className="h-4 w-4" />
                                      </AvatarFallback>
                                    </Avatar>

                                    <h3 className="w-full text-ellipsis overflow-hidden whitespace-nowrap">
                                      {tag.title.length
                                        ? tag.title
                                            .replace("https://www.", "")
                                            .replace("http://", "")
                                            .replace("https://", "")
                                            .split("/")[0]
                                        : "Direct"}
                                    </h3>
                                  </div>
                                  <h1 className="ml-auto">
                                    {formatNumber(tag.value)}
                                  </h1>
                                </div>
                                <Separator />
                              </>
                            ))}
                          </>
                        )}
                      </div>
                    </div>
                  )}
                </CardContent>
              </TabsContent>
              <TabsContent value="pages" className="space-y-4">
                <></>
              </TabsContent>
            </Tabs>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default SocialsReport;

function formatNumber(value: any): string {
  if (value >= 1000000) {
    return (value / 1000000).toFixed(1) + "m";
  } else if (value >= 1000) {
    return (value / 1000).toFixed(1) + "k";
  } else {
    return value.toString();
  }
}
