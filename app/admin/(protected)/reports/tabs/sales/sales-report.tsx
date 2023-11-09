"use client";
import {useEffect, useState} from "react";
import {Metadata} from "next";
import Image from "next/image";
import {Button} from "@/app/admin/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/app/admin/components/ui/card";
import {ScrollArea} from "@/app/admin/components/ui/scroll-area";
import {OverviewCard} from "@/app/admin/(protected)/reports/tabs/sales/components/overview";

import {RecentSales} from "@/app/admin/(protected)/reports/tabs/sales/components/recent-sales";
import {siteConfig} from "@/config/site";
import {SalesData} from "@/app/admin/types/index";
import {Icons} from "@/app/admin/components/icons";
import {DateRange} from "react-day-picker";

type SalesDataFull = {
  totalRevenue: number;
  totalProfit: number;
  totalSales: number;
  data: SalesData[];
};

const fetchData = async (): Promise<SalesDataFull> => {
  try {
    const salesDataRes = await fetch(
      `${siteConfig.url}/api/admin/shopify/sales-data`,
      {
        cache: "no-cache",
      }
    );

    if (!salesDataRes.ok) {
      throw new Error(`${salesDataRes}`);
    }

    const data = (await salesDataRes.json()) as SalesData[];

    // const data = DummyData as SalesData[];

    const totalRevenue = data.reduce((acc, curr) => acc + curr.revenue, 0);
    const totalProfit = data.reduce((acc, curr) => acc + curr.profit, 0);
    const totalSales = data.length;

    const salesData = {
      totalRevenue,
      totalProfit,
      totalSales,
      data,
    };

    return salesData as SalesDataFull;
  } catch (error) {
    // Handle the error (e.g., log it, show a user-friendly message, etc.)
    console.error("Error fetching sales data:", error);
    throw error; // Re-throw the error to propagate it further if needed
  }
};

// Example usage:
fetchData()
  .then((result) => {
    console.log("Sales Data:", result);
  })
  .catch((error) => {
    console.error("Error:", error);
  });

export default function SalesReport({date}: {date: DateRange | undefined}) {
  // const data = await getData();
  const [data, setData] = useState<SalesDataFull | undefined>(undefined);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<any | undefined>(undefined);

  // Using Dummy Data
  useEffect(() => {
    async function getData() {
      try {
        const salesDataRes = await fetchData();
        setData(salesDataRes);
        setLoading(false);
      } catch (error: any) {
        console.error("Error:", error);
        setError(error.message);
        setLoading(false); // Set loading to false even if there's an error
      }
    }

    getData();
  }, []);

  const revenuePercentChange = data?.data
    ? calculatePercentChange(data.data, "revenue")
    : "--";
  const profitPercentChange = data?.data
    ? calculatePercentChange(data.data, "profit")
    : "--";
  const totalSalesPercentChange = data?.data
    ? calculateTotalSalesPercentChange(data.data)
    : "--";

  return (
    <>
      {error && (
        <div className="w-full h-[200px] b-r flex justify-center items-center text-red-500 ">
          {JSON.stringify(error)}
        </div>
      )}
      <div className=" flex-col flex ">
        <div className="flex-1 space-y-4 pt-0 ">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Total Revenue
                </CardTitle>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  className="h-4 w-4 text-muted-foreground"
                >
                  <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
                </svg>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  ${data?.totalRevenue ? data.totalRevenue.toFixed(2) : "--"}
                </div>
                <p className="text-xs text-muted-foreground">
                  {typeof revenuePercentChange === "number"
                    ? (revenuePercentChange > 0 ? "+" : "") +
                      revenuePercentChange.toFixed(2) +
                      "% from last week"
                    : "--"}
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Profit</CardTitle>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  className="h-4 w-4 text-muted-foreground"
                >
                  <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
                </svg>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  ${data?.totalProfit ? data.totalProfit.toFixed(2) : "--"}
                </div>
                <p className="text-xs text-muted-foreground">
                  {typeof profitPercentChange === "number"
                    ? (profitPercentChange > 0 ? "+" : "") +
                      profitPercentChange.toFixed(2) +
                      "% from last week"
                    : "--"}
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Sales</CardTitle>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  className="h-4 w-4 text-muted-foreground"
                >
                  <rect width="20" height="14" x="2" y="5" rx="2" />
                  <path d="M2 10h20" />
                </svg>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {data?.totalSales ? data.totalSales : "--"}
                </div>
                <p className="text-xs text-muted-foreground">
                  {typeof totalSalesPercentChange === "number"
                    ? (totalSalesPercentChange > 0 ? "+" : "") +
                      totalSalesPercentChange.toFixed(2) +
                      "% from last week"
                    : "--"}
                </p>
              </CardContent>
            </Card>
          </div>
          <div className="grid gap-4 grid-cols-1 md:grid-cols-6 ">
            <Card className="col-span-1 md:col-span-3 relative max-w-full">
              <CardHeader>
                <CardTitle>Sales </CardTitle>
              </CardHeader>
              <CardContent className="pl-2 ">
                {data?.data && <OverviewCard salesData={data.data} />}
                {loading && (
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                    <Icons.spinner className="h-12 w-12 text-primary  ml-auto animate-spin " />
                  </div>
                )}
              </CardContent>
            </Card>
            <Card className="col-span-1 md:col-span-3 relative ">
              <CardHeader className="md:pb-0 pb-6">
                <CardTitle>Recent Sales</CardTitle>
                <CardDescription>
                  {data?.data ? getTodayTotalCount(data.data) : "--"} sales
                  today
                </CardDescription>
              </CardHeader>
              <ScrollArea className="h-[200px] md:h-[400px] w-full">
                <CardContent className="max-w-full ">
                  {data?.data && <RecentSales data={data.data} />}
                  {loading && (
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                      <Icons.spinner className="h-12 w-12 text-primary  ml-auto animate-spin " />
                    </div>
                  )}
                </CardContent>
              </ScrollArea>
            </Card>
          </div>
        </div>
      </div>
    </>
  );
}

function getWeeklyTotal(
  data: SalesData[],
  property: keyof SalesData,
  startDate: Date,
  endDate: Date
): number {
  const weeklyData = data.filter((item) => {
    const itemDate = new Date(item.createdAt);
    return itemDate >= startDate && itemDate <= endDate;
  });

  const weeklyTotal = weeklyData.reduce((acc, item) => {
    const propertyValue = item[property];

    // Check if the property is a number, then add it to the accumulator
    if (typeof propertyValue === "number") {
      return acc + propertyValue;
    }

    // Handle the case when the property is an object with firstName and lastName
    // You can decide how to calculate the total in this case.
    // For example, concatenate the first names and last names and count them.
    if (typeof propertyValue === "object") {
      // Example: Concatenate first names and last names and count characters
      return acc + (propertyValue.firstName + propertyValue.lastName).length;
    }

    // Handle other cases or return the accumulator as is
    return acc;
  }, 0);

  return weeklyTotal;
}

function calculatePercentChange(
  data: SalesData[],
  property: keyof SalesData
): number {
  const today = new Date();

  // Calculate the start and end of the previous week
  const previousWeekStart = new Date(today);
  previousWeekStart.setDate(today.getDate() - (today.getDay() + 7));
  previousWeekStart.setHours(0, 0, 0, 0);

  const previousWeekEnd = new Date(today);
  previousWeekEnd.setDate(today.getDate() - (today.getDay() + 1));
  previousWeekEnd.setHours(23, 59, 59, 999);

  // Calculate the start and end of the current week
  const currentWeekStart = new Date(today);
  currentWeekStart.setDate(today.getDate() - today.getDay());
  currentWeekStart.setHours(0, 0, 0, 0);

  const currentWeekEnd = new Date(today);
  currentWeekEnd.setDate(today.getDate() + (6 - today.getDay()));
  currentWeekEnd.setHours(23, 59, 59, 999);

  const previousWeekTotal = getWeeklyTotal(
    data,
    property,
    previousWeekStart,
    previousWeekEnd
  );
  const currentWeekTotal = getWeeklyTotal(
    data,
    property,
    currentWeekStart,
    currentWeekEnd
  );

  if (previousWeekTotal === 0) {
    return currentWeekTotal === 0 ? 0 : 100; // Avoid division by zero
  }

  const percentChange =
    ((currentWeekTotal - previousWeekTotal) / previousWeekTotal) * 100;

  return percentChange as number;
}

function getWeeklyDataCount(
  data: SalesData[],
  startDate: Date,
  endDate: Date
): number {
  const weeklyData = data.filter((item) => {
    const itemDate = new Date(item.createdAt);
    return itemDate >= startDate && itemDate <= endDate;
  });

  return weeklyData.length;
}

function calculateTotalSalesPercentChange(data: SalesData[]): number {
  const today = new Date();
  const startDate = new Date(today);
  startDate.setDate(today.getDate() - today.getDay());
  startDate.setHours(0, 0, 0, 0);
  const endDate = new Date(today);
  endDate.setDate(today.getDate() + (6 - today.getDay()));
  endDate.setHours(23, 59, 59, 999);

  const previousWeekStart = new Date(startDate);
  previousWeekStart.setDate(startDate.getDate() - 7);

  const currentWeekTotal = getWeeklyDataCount(data, startDate, endDate);
  const previousWeekTotal = getWeeklyDataCount(
    data,
    previousWeekStart,
    startDate
  );

  if (previousWeekTotal === 0) {
    return currentWeekTotal === 0 ? 0 : 100; // Avoid division by zero
  }

  const percentChange =
    ((currentWeekTotal - previousWeekTotal) / previousWeekTotal) * 100;

  return percentChange;
}

function getTodayTotalCount(data: SalesData[]): number {
  const today = new Date();
  const todayStart = new Date(today);
  todayStart.setHours(0, 0, 0, 0);

  const todayEnd = new Date(today);
  todayEnd.setHours(23, 59, 59, 999);

  const todayData = data.filter((item) => {
    const itemDate = new Date(item.createdAt);
    return itemDate >= todayStart && itemDate <= todayEnd;
  });

  return todayData.length;
}

const DummyData = {
  totalRevenue: 1180.7500000000002,
  totalProfit: 709.0200000000001,
  totalSales: 88,
  data: [
    {
      id: "gid://shopify/Order/5517747683644",
      name: "#1095",
      email: "vitor.pineschi@gmail.com",
      customer: {firstName: "Vitor", lastName: "Pineschi"},
      totalPriceSet: {shopMoney: {amount: "4.99", currencyCode: "USD"}},
      totalShippingPriceSet: {shopMoney: {amount: "0.0", currencyCode: "USD"}},
      createdAt: "2023-11-08T21:45:03Z",
      lineItems: [
        {
          title: "The 50 Greatest Business Success Stories",
          quantity: 1,
          variant: {
            price: "4.99",
            product: {
              handle:
                "snapshots-of-success-the-50-greatest-business-success-stories",
            },
            inventoryItem: {unitCost: {amount: "0.0"}},
          },
        },
      ],
      revenue: 4.99,
      profit: 4.99,
      shippingPrice: 0,
      order: {
        id: "gid://shopify/Order/5517747683644",
        name: "#1095",
        email: "vitor.pineschi@gmail.com",
        customer: {firstName: "Vitor", lastName: "Pineschi"},
        totalPriceSet: {shopMoney: {amount: "4.99", currencyCode: "USD"}},
        totalShippingPriceSet: {
          shopMoney: {amount: "0.0", currencyCode: "USD"},
        },
        createdAt: "2023-11-08T21:45:03Z",
        lineItems: [
          {
            title: "The 50 Greatest Business Success Stories",
            quantity: 1,
            variant: {
              price: "4.99",
              product: {
                handle:
                  "snapshots-of-success-the-50-greatest-business-success-stories",
              },
              inventoryItem: {unitCost: {amount: "0.0"}},
            },
            __parentId: "gid://shopify/Order/5517747683644",
          },
        ],
      },
    },
    {
      id: "gid://shopify/Order/5517560709436",
      name: "#1094",
      email: "iec_association@yahoo.fr",
      customer: {firstName: "José", lastName: "NYOKA WANGA"},
      totalPriceSet: {shopMoney: {amount: "4.99", currencyCode: "USD"}},
      totalShippingPriceSet: {shopMoney: {amount: "0.0", currencyCode: "USD"}},
      createdAt: "2023-11-08T17:45:59Z",
      lineItems: [
        {
          title: "The 50 Greatest Business Success Stories",
          quantity: 1,
          variant: {
            price: "4.99",
            product: {
              handle:
                "snapshots-of-success-the-50-greatest-business-success-stories",
            },
            inventoryItem: {unitCost: {amount: "0.0"}},
          },
        },
      ],
      revenue: 4.99,
      profit: 4.99,
      shippingPrice: 0,
      order: {
        id: "gid://shopify/Order/5517560709436",
        name: "#1094",
        email: "iec_association@yahoo.fr",
        customer: {firstName: "José", lastName: "NYOKA WANGA"},
        totalPriceSet: {shopMoney: {amount: "4.99", currencyCode: "USD"}},
        totalShippingPriceSet: {
          shopMoney: {amount: "0.0", currencyCode: "USD"},
        },
        createdAt: "2023-11-08T17:45:59Z",
        lineItems: [
          {
            title: "The 50 Greatest Business Success Stories",
            quantity: 1,
            variant: {
              price: "4.99",
              product: {
                handle:
                  "snapshots-of-success-the-50-greatest-business-success-stories",
              },
              inventoryItem: {unitCost: {amount: "0.0"}},
            },
            __parentId: "gid://shopify/Order/5517560709436",
          },
        ],
      },
    },
    {
      id: "gid://shopify/Order/5517108117820",
      name: "#1093",
      email: "muema@bouncefm.com",
      customer: {firstName: "muema", lastName: "lombe"},
      totalPriceSet: {shopMoney: {amount: "4.99", currencyCode: "USD"}},
      totalShippingPriceSet: {shopMoney: {amount: "0.0", currencyCode: "USD"}},
      createdAt: "2023-11-08T11:50:23Z",
      lineItems: [
        {
          title: "The 50 Greatest Business Success Stories",
          quantity: 1,
          variant: {
            price: "4.99",
            product: {
              handle:
                "snapshots-of-success-the-50-greatest-business-success-stories",
            },
            inventoryItem: {unitCost: {amount: "0.0"}},
          },
        },
      ],
      revenue: 4.99,
      profit: 4.99,
      shippingPrice: 0,
      order: {
        id: "gid://shopify/Order/5517108117820",
        name: "#1093",
        email: "muema@bouncefm.com",
        customer: {firstName: "muema", lastName: "lombe"},
        totalPriceSet: {shopMoney: {amount: "4.99", currencyCode: "USD"}},
        totalShippingPriceSet: {
          shopMoney: {amount: "0.0", currencyCode: "USD"},
        },
        createdAt: "2023-11-08T11:50:23Z",
        lineItems: [
          {
            title: "The 50 Greatest Business Success Stories",
            quantity: 1,
            variant: {
              price: "4.99",
              product: {
                handle:
                  "snapshots-of-success-the-50-greatest-business-success-stories",
              },
              inventoryItem: {unitCost: {amount: "0.0"}},
            },
            __parentId: "gid://shopify/Order/5517108117820",
          },
        ],
      },
    },
    {
      id: "gid://shopify/Order/5516324995388",
      name: "#1092",
      email: "lucasduarte8@hotmail.com",
      customer: {firstName: "Lucas", lastName: "Nunes"},
      totalPriceSet: {shopMoney: {amount: "4.99", currencyCode: "USD"}},
      totalShippingPriceSet: {shopMoney: {amount: "0.0", currencyCode: "USD"}},
      createdAt: "2023-11-08T04:20:34Z",
      lineItems: [
        {
          title: "The 50 Greatest Business Success Stories",
          quantity: 1,
          variant: {
            price: "4.99",
            product: {
              handle:
                "snapshots-of-success-the-50-greatest-business-success-stories",
            },
            inventoryItem: {unitCost: {amount: "0.0"}},
          },
        },
      ],
      revenue: 4.99,
      profit: 4.99,
      shippingPrice: 0,
      order: {
        id: "gid://shopify/Order/5516324995388",
        name: "#1092",
        email: "lucasduarte8@hotmail.com",
        customer: {firstName: "Lucas", lastName: "Nunes"},
        totalPriceSet: {shopMoney: {amount: "4.99", currencyCode: "USD"}},
        totalShippingPriceSet: {
          shopMoney: {amount: "0.0", currencyCode: "USD"},
        },
        createdAt: "2023-11-08T04:20:34Z",
        lineItems: [
          {
            title: "The 50 Greatest Business Success Stories",
            quantity: 1,
            variant: {
              price: "4.99",
              product: {
                handle:
                  "snapshots-of-success-the-50-greatest-business-success-stories",
              },
              inventoryItem: {unitCost: {amount: "0.0"}},
            },
            __parentId: "gid://shopify/Order/5516324995388",
          },
        ],
      },
    },
    {
      id: "gid://shopify/Order/5515691065660",
      name: "#1091",
      email: "bojan_piki@hotmail.com",
      customer: {firstName: "Bojan", lastName: "Krsteski"},
      totalPriceSet: {shopMoney: {amount: "4.99", currencyCode: "USD"}},
      totalShippingPriceSet: {shopMoney: {amount: "0.0", currencyCode: "USD"}},
      createdAt: "2023-11-07T22:26:25Z",
      lineItems: [
        {
          title: "The 50 Greatest Business Success Stories",
          quantity: 1,
          variant: {
            price: "4.99",
            product: {
              handle:
                "snapshots-of-success-the-50-greatest-business-success-stories",
            },
            inventoryItem: {unitCost: {amount: "0.0"}},
          },
        },
      ],
      revenue: 4.99,
      profit: 4.99,
      shippingPrice: 0,
      order: {
        id: "gid://shopify/Order/5515691065660",
        name: "#1091",
        email: "bojan_piki@hotmail.com",
        customer: {firstName: "Bojan", lastName: "Krsteski"},
        totalPriceSet: {shopMoney: {amount: "4.99", currencyCode: "USD"}},
        totalShippingPriceSet: {
          shopMoney: {amount: "0.0", currencyCode: "USD"},
        },
        createdAt: "2023-11-07T22:26:25Z",
        lineItems: [
          {
            title: "The 50 Greatest Business Success Stories",
            quantity: 1,
            variant: {
              price: "4.99",
              product: {
                handle:
                  "snapshots-of-success-the-50-greatest-business-success-stories",
              },
              inventoryItem: {unitCost: {amount: "0.0"}},
            },
            __parentId: "gid://shopify/Order/5515691065660",
          },
        ],
      },
    },
    {
      id: "gid://shopify/Order/5515656757564",
      name: "#1090",
      email: "daniel.rusu8@gmail.com",
      customer: {firstName: "Daniel", lastName: "Rusu"},
      totalPriceSet: {shopMoney: {amount: "4.99", currencyCode: "USD"}},
      totalShippingPriceSet: {shopMoney: {amount: "0.0", currencyCode: "USD"}},
      createdAt: "2023-11-07T21:39:07Z",
      lineItems: [
        {
          title: "The 50 Greatest Business Success Stories",
          quantity: 1,
          variant: {
            price: "4.99",
            product: {
              handle:
                "snapshots-of-success-the-50-greatest-business-success-stories",
            },
            inventoryItem: {unitCost: {amount: "0.0"}},
          },
        },
      ],
      revenue: 4.99,
      profit: 4.99,
      shippingPrice: 0,
      order: {
        id: "gid://shopify/Order/5515656757564",
        name: "#1090",
        email: "daniel.rusu8@gmail.com",
        customer: {firstName: "Daniel", lastName: "Rusu"},
        totalPriceSet: {shopMoney: {amount: "4.99", currencyCode: "USD"}},
        totalShippingPriceSet: {
          shopMoney: {amount: "0.0", currencyCode: "USD"},
        },
        createdAt: "2023-11-07T21:39:07Z",
        lineItems: [
          {
            title: "The 50 Greatest Business Success Stories",
            quantity: 1,
            variant: {
              price: "4.99",
              product: {
                handle:
                  "snapshots-of-success-the-50-greatest-business-success-stories",
              },
              inventoryItem: {unitCost: {amount: "0.0"}},
            },
            __parentId: "gid://shopify/Order/5515656757564",
          },
        ],
      },
    },
    {
      id: "gid://shopify/Order/5515336548668",
      name: "#1089",
      email: "95.bozikis@gmail.com",
      customer: {firstName: "chris", lastName: "voz"},
      totalPriceSet: {shopMoney: {amount: "4.99", currencyCode: "USD"}},
      totalShippingPriceSet: {shopMoney: {amount: "0.0", currencyCode: "USD"}},
      createdAt: "2023-11-07T14:45:51Z",
      lineItems: [
        {
          title: "The 50 Greatest Business Success Stories",
          quantity: 1,
          variant: {
            price: "4.99",
            product: {
              handle:
                "snapshots-of-success-the-50-greatest-business-success-stories",
            },
            inventoryItem: {unitCost: {amount: "0.0"}},
          },
        },
      ],
      revenue: 4.99,
      profit: 4.99,
      shippingPrice: 0,
      order: {
        id: "gid://shopify/Order/5515336548668",
        name: "#1089",
        email: "95.bozikis@gmail.com",
        customer: {firstName: "chris", lastName: "voz"},
        totalPriceSet: {shopMoney: {amount: "4.99", currencyCode: "USD"}},
        totalShippingPriceSet: {
          shopMoney: {amount: "0.0", currencyCode: "USD"},
        },
        createdAt: "2023-11-07T14:45:51Z",
        lineItems: [
          {
            title: "The 50 Greatest Business Success Stories",
            quantity: 1,
            variant: {
              price: "4.99",
              product: {
                handle:
                  "snapshots-of-success-the-50-greatest-business-success-stories",
              },
              inventoryItem: {unitCost: {amount: "0.0"}},
            },
            __parentId: "gid://shopify/Order/5515336548668",
          },
        ],
      },
    },
    {
      id: "gid://shopify/Order/5514341712188",
      name: "#1088",
      email: "andrewplc@hotmail.com",
      customer: {
        firstName: "Private Label Confectionery",
        lastName: "(Pty) Ltd",
      },
      totalPriceSet: {shopMoney: {amount: "19.96", currencyCode: "USD"}},
      totalShippingPriceSet: {shopMoney: {amount: "0.0", currencyCode: "USD"}},
      createdAt: "2023-11-07T08:09:39Z",
      lineItems: [
        {
          title: "The 50 Greatest Business Success Stories",
          quantity: 4,
          variant: {
            price: "4.99",
            product: {
              handle:
                "snapshots-of-success-the-50-greatest-business-success-stories",
            },
            inventoryItem: {unitCost: {amount: "0.0"}},
          },
        },
      ],
      revenue: 19.96,
      profit: 19.96,
      shippingPrice: 0,
      order: {
        id: "gid://shopify/Order/5514341712188",
        name: "#1088",
        email: "andrewplc@hotmail.com",
        customer: {
          firstName: "Private Label Confectionery",
          lastName: "(Pty) Ltd",
        },
        totalPriceSet: {shopMoney: {amount: "19.96", currencyCode: "USD"}},
        totalShippingPriceSet: {
          shopMoney: {amount: "0.0", currencyCode: "USD"},
        },
        createdAt: "2023-11-07T08:09:39Z",
        lineItems: [
          {
            title: "The 50 Greatest Business Success Stories",
            quantity: 4,
            variant: {
              price: "4.99",
              product: {
                handle:
                  "snapshots-of-success-the-50-greatest-business-success-stories",
              },
              inventoryItem: {unitCost: {amount: "0.0"}},
            },
            __parentId: "gid://shopify/Order/5514341712188",
          },
        ],
      },
    },
    {
      id: "gid://shopify/Order/5512315404604",
      name: "#1087",
      email: "silonk@yahoo.com",
      customer: {firstName: "Scott", lastName: "Lonker"},
      totalPriceSet: {shopMoney: {amount: "22.93", currencyCode: "USD"}},
      totalShippingPriceSet: {shopMoney: {amount: "4.94", currencyCode: "USD"}},
      createdAt: "2023-11-06T21:32:34Z",
      lineItems: [
        {
          title: "The 50 Greatest Business Success Stories",
          quantity: 1,
          variant: {
            price: "17.99",
            product: {
              handle:
                "snapshots-of-success-the-50-greatest-business-success-stories",
            },
            inventoryItem: {unitCost: {amount: "6.73"}},
          },
        },
      ],
      revenue: 22.93,
      profit: 11.26,
      shippingPrice: 4.94,
      order: {
        id: "gid://shopify/Order/5512315404604",
        name: "#1087",
        email: "silonk@yahoo.com",
        customer: {firstName: "Scott", lastName: "Lonker"},
        totalPriceSet: {shopMoney: {amount: "22.93", currencyCode: "USD"}},
        totalShippingPriceSet: {
          shopMoney: {amount: "4.94", currencyCode: "USD"},
        },
        createdAt: "2023-11-06T21:32:34Z",
        lineItems: [
          {
            title: "The 50 Greatest Business Success Stories",
            quantity: 1,
            variant: {
              price: "17.99",
              product: {
                handle:
                  "snapshots-of-success-the-50-greatest-business-success-stories",
              },
              inventoryItem: {unitCost: {amount: "6.73"}},
            },
            __parentId: "gid://shopify/Order/5512315404604",
          },
        ],
      },
    },
    {
      id: "gid://shopify/Order/5511743209788",
      name: "#1086",
      email: "telecrubby@Gmail.com",
      customer: {firstName: "Albert", lastName: "Tse"},
      totalPriceSet: {shopMoney: {amount: "4.99", currencyCode: "USD"}},
      totalShippingPriceSet: {shopMoney: {amount: "0.0", currencyCode: "USD"}},
      createdAt: "2023-11-06T11:13:51Z",
      lineItems: [
        {
          title: "The 50 Greatest Business Success Stories",
          quantity: 1,
          variant: {
            price: "4.99",
            product: {
              handle:
                "snapshots-of-success-the-50-greatest-business-success-stories",
            },
            inventoryItem: {unitCost: {amount: "0.0"}},
          },
        },
      ],
      revenue: 4.99,
      profit: 4.99,
      shippingPrice: 0,
      order: {
        id: "gid://shopify/Order/5511743209788",
        name: "#1086",
        email: "telecrubby@Gmail.com",
        customer: {firstName: "Albert", lastName: "Tse"},
        totalPriceSet: {shopMoney: {amount: "4.99", currencyCode: "USD"}},
        totalShippingPriceSet: {
          shopMoney: {amount: "0.0", currencyCode: "USD"},
        },
        createdAt: "2023-11-06T11:13:51Z",
        lineItems: [
          {
            title: "The 50 Greatest Business Success Stories",
            quantity: 1,
            variant: {
              price: "4.99",
              product: {
                handle:
                  "snapshots-of-success-the-50-greatest-business-success-stories",
              },
              inventoryItem: {unitCost: {amount: "0.0"}},
            },
            __parentId: "gid://shopify/Order/5511743209788",
          },
        ],
      },
    },
    {
      id: "gid://shopify/Order/5511625212220",
      name: "#1085",
      email: "info@loluonline.com",
      customer: {firstName: "Omololu", lastName: "John Arokodare"},
      totalPriceSet: {shopMoney: {amount: "4.99", currencyCode: "USD"}},
      totalShippingPriceSet: {shopMoney: {amount: "0.0", currencyCode: "USD"}},
      createdAt: "2023-11-06T07:59:58Z",
      lineItems: [
        {
          title: "The 50 Greatest Business Success Stories",
          quantity: 1,
          variant: {
            price: "4.99",
            product: {
              handle:
                "snapshots-of-success-the-50-greatest-business-success-stories",
            },
            inventoryItem: {unitCost: {amount: "0.0"}},
          },
        },
      ],
      revenue: 4.99,
      profit: 4.99,
      shippingPrice: 0,
      order: {
        id: "gid://shopify/Order/5511625212220",
        name: "#1085",
        email: "info@loluonline.com",
        customer: {firstName: "Omololu", lastName: "John Arokodare"},
        totalPriceSet: {shopMoney: {amount: "4.99", currencyCode: "USD"}},
        totalShippingPriceSet: {
          shopMoney: {amount: "0.0", currencyCode: "USD"},
        },
        createdAt: "2023-11-06T07:59:58Z",
        lineItems: [
          {
            title: "The 50 Greatest Business Success Stories",
            quantity: 1,
            variant: {
              price: "4.99",
              product: {
                handle:
                  "snapshots-of-success-the-50-greatest-business-success-stories",
              },
              inventoryItem: {unitCost: {amount: "0.0"}},
            },
            __parentId: "gid://shopify/Order/5511625212220",
          },
        ],
      },
    },
    {
      id: "gid://shopify/Order/5511609090364",
      name: "#1084",
      email: "cale.dewar@gmail.com",
      customer: {firstName: "Cale", lastName: "Dewar"},
      totalPriceSet: {shopMoney: {amount: "4.99", currencyCode: "USD"}},
      totalShippingPriceSet: {shopMoney: {amount: "0.0", currencyCode: "USD"}},
      createdAt: "2023-11-06T07:29:19Z",
      lineItems: [
        {
          title: "The 50 Greatest Business Success Stories",
          quantity: 1,
          variant: {
            price: "4.99",
            product: {
              handle:
                "snapshots-of-success-the-50-greatest-business-success-stories",
            },
            inventoryItem: {unitCost: {amount: "0.0"}},
          },
        },
      ],
      revenue: 4.99,
      profit: 4.99,
      shippingPrice: 0,
      order: {
        id: "gid://shopify/Order/5511609090364",
        name: "#1084",
        email: "cale.dewar@gmail.com",
        customer: {firstName: "Cale", lastName: "Dewar"},
        totalPriceSet: {shopMoney: {amount: "4.99", currencyCode: "USD"}},
        totalShippingPriceSet: {
          shopMoney: {amount: "0.0", currencyCode: "USD"},
        },
        createdAt: "2023-11-06T07:29:19Z",
        lineItems: [
          {
            title: "The 50 Greatest Business Success Stories",
            quantity: 1,
            variant: {
              price: "4.99",
              product: {
                handle:
                  "snapshots-of-success-the-50-greatest-business-success-stories",
              },
              inventoryItem: {unitCost: {amount: "0.0"}},
            },
            __parentId: "gid://shopify/Order/5511609090364",
          },
        ],
      },
    },
    {
      id: "gid://shopify/Order/5511598211388",
      name: "#1083",
      email: "niedermier2@gmail.com",
      customer: {firstName: "Paul", lastName: "Niedermier"},
      totalPriceSet: {shopMoney: {amount: "22.93", currencyCode: "USD"}},
      totalShippingPriceSet: {shopMoney: {amount: "4.94", currencyCode: "USD"}},
      createdAt: "2023-11-06T07:08:56Z",
      lineItems: [
        {
          title: "The 50 Greatest Business Success Stories",
          quantity: 1,
          variant: {
            price: "17.99",
            product: {
              handle:
                "snapshots-of-success-the-50-greatest-business-success-stories",
            },
            inventoryItem: {unitCost: {amount: "6.73"}},
          },
        },
      ],
      revenue: 22.93,
      profit: 11.26,
      shippingPrice: 4.94,
      order: {
        id: "gid://shopify/Order/5511598211388",
        name: "#1083",
        email: "niedermier2@gmail.com",
        customer: {firstName: "Paul", lastName: "Niedermier"},
        totalPriceSet: {shopMoney: {amount: "22.93", currencyCode: "USD"}},
        totalShippingPriceSet: {
          shopMoney: {amount: "4.94", currencyCode: "USD"},
        },
        createdAt: "2023-11-06T07:08:56Z",
        lineItems: [
          {
            title: "The 50 Greatest Business Success Stories",
            quantity: 1,
            variant: {
              price: "17.99",
              product: {
                handle:
                  "snapshots-of-success-the-50-greatest-business-success-stories",
              },
              inventoryItem: {unitCost: {amount: "6.73"}},
            },
            __parentId: "gid://shopify/Order/5511598211388",
          },
        ],
      },
    },
    {
      id: "gid://shopify/Order/5511525171516",
      name: "#1082",
      email: "ryan.morfin@gmail.com",
      customer: {firstName: "Ryan", lastName: "Morfin"},
      totalPriceSet: {shopMoney: {amount: "32.93", currencyCode: "USD"}},
      totalShippingPriceSet: {shopMoney: {amount: "4.94", currencyCode: "USD"}},
      createdAt: "2023-11-06T05:04:01Z",
      lineItems: [
        {
          title: "The 50 Greatest Business Success Stories",
          quantity: 1,
          variant: {
            price: "27.99",
            product: {
              handle:
                "snapshots-of-success-the-50-greatest-business-success-stories",
            },
            inventoryItem: {unitCost: {amount: "16.28"}},
          },
        },
      ],
      revenue: 32.93,
      profit: 11.71,
      shippingPrice: 4.94,
      order: {
        id: "gid://shopify/Order/5511525171516",
        name: "#1082",
        email: "ryan.morfin@gmail.com",
        customer: {firstName: "Ryan", lastName: "Morfin"},
        totalPriceSet: {shopMoney: {amount: "32.93", currencyCode: "USD"}},
        totalShippingPriceSet: {
          shopMoney: {amount: "4.94", currencyCode: "USD"},
        },
        createdAt: "2023-11-06T05:04:01Z",
        lineItems: [
          {
            title: "The 50 Greatest Business Success Stories",
            quantity: 1,
            variant: {
              price: "27.99",
              product: {
                handle:
                  "snapshots-of-success-the-50-greatest-business-success-stories",
              },
              inventoryItem: {unitCost: {amount: "16.28"}},
            },
            __parentId: "gid://shopify/Order/5511525171516",
          },
        ],
      },
    },
    {
      id: "gid://shopify/Order/5510987219260",
      name: "#1081",
      email: "garett.smith2010@gmail.com",
      customer: {firstName: "Garett", lastName: "Smith"},
      totalPriceSet: {shopMoney: {amount: "4.99", currencyCode: "USD"}},
      totalShippingPriceSet: {shopMoney: {amount: "0.0", currencyCode: "USD"}},
      createdAt: "2023-11-05T16:52:56Z",
      lineItems: [
        {
          title: "The 50 Greatest Business Success Stories",
          quantity: 1,
          variant: {
            price: "4.99",
            product: {
              handle:
                "snapshots-of-success-the-50-greatest-business-success-stories",
            },
            inventoryItem: {unitCost: {amount: "0.0"}},
          },
        },
      ],
      revenue: 4.99,
      profit: 4.99,
      shippingPrice: 0,
      order: {
        id: "gid://shopify/Order/5510987219260",
        name: "#1081",
        email: "garett.smith2010@gmail.com",
        customer: {firstName: "Garett", lastName: "Smith"},
        totalPriceSet: {shopMoney: {amount: "4.99", currencyCode: "USD"}},
        totalShippingPriceSet: {
          shopMoney: {amount: "0.0", currencyCode: "USD"},
        },
        createdAt: "2023-11-05T16:52:56Z",
        lineItems: [
          {
            title: "The 50 Greatest Business Success Stories",
            quantity: 1,
            variant: {
              price: "4.99",
              product: {
                handle:
                  "snapshots-of-success-the-50-greatest-business-success-stories",
              },
              inventoryItem: {unitCost: {amount: "0.0"}},
            },
            __parentId: "gid://shopify/Order/5510987219260",
          },
        ],
      },
    },
    {
      id: "gid://shopify/Order/5510895796540",
      name: "#1080",
      email: "dmeveritt1@gmail.com",
      customer: {firstName: "David", lastName: "Everitt"},
      totalPriceSet: {shopMoney: {amount: "22.93", currencyCode: "USD"}},
      totalShippingPriceSet: {shopMoney: {amount: "4.94", currencyCode: "USD"}},
      createdAt: "2023-11-05T15:10:28Z",
      lineItems: [
        {
          title: "The 50 Greatest Business Success Stories",
          quantity: 1,
          variant: {
            price: "17.99",
            product: {
              handle:
                "snapshots-of-success-the-50-greatest-business-success-stories",
            },
            inventoryItem: {unitCost: {amount: "6.73"}},
          },
        },
      ],
      revenue: 22.93,
      profit: 11.26,
      shippingPrice: 4.94,
      order: {
        id: "gid://shopify/Order/5510895796540",
        name: "#1080",
        email: "dmeveritt1@gmail.com",
        customer: {firstName: "David", lastName: "Everitt"},
        totalPriceSet: {shopMoney: {amount: "22.93", currencyCode: "USD"}},
        totalShippingPriceSet: {
          shopMoney: {amount: "4.94", currencyCode: "USD"},
        },
        createdAt: "2023-11-05T15:10:28Z",
        lineItems: [
          {
            title: "The 50 Greatest Business Success Stories",
            quantity: 1,
            variant: {
              price: "17.99",
              product: {
                handle:
                  "snapshots-of-success-the-50-greatest-business-success-stories",
              },
              inventoryItem: {unitCost: {amount: "6.73"}},
            },
            __parentId: "gid://shopify/Order/5510895796540",
          },
        ],
      },
    },
    {
      id: "gid://shopify/Order/5510779896124",
      name: "#1079",
      email: "chirawutm@gmail.com",
      customer: {firstName: "Tanaka", lastName: "Chirawu"},
      totalPriceSet: {shopMoney: {amount: "4.99", currencyCode: "USD"}},
      totalShippingPriceSet: {shopMoney: {amount: "0.0", currencyCode: "USD"}},
      createdAt: "2023-11-05T12:50:28Z",
      lineItems: [
        {
          title: "The 50 Greatest Business Success Stories",
          quantity: 1,
          variant: {
            price: "4.99",
            product: {
              handle:
                "snapshots-of-success-the-50-greatest-business-success-stories",
            },
            inventoryItem: {unitCost: {amount: "0.0"}},
          },
        },
      ],
      revenue: 4.99,
      profit: 4.99,
      shippingPrice: 0,
      order: {
        id: "gid://shopify/Order/5510779896124",
        name: "#1079",
        email: "chirawutm@gmail.com",
        customer: {firstName: "Tanaka", lastName: "Chirawu"},
        totalPriceSet: {shopMoney: {amount: "4.99", currencyCode: "USD"}},
        totalShippingPriceSet: {
          shopMoney: {amount: "0.0", currencyCode: "USD"},
        },
        createdAt: "2023-11-05T12:50:28Z",
        lineItems: [
          {
            title: "The 50 Greatest Business Success Stories",
            quantity: 1,
            variant: {
              price: "4.99",
              product: {
                handle:
                  "snapshots-of-success-the-50-greatest-business-success-stories",
              },
              inventoryItem: {unitCost: {amount: "0.0"}},
            },
            __parentId: "gid://shopify/Order/5510779896124",
          },
        ],
      },
    },
    {
      id: "gid://shopify/Order/5510757843260",
      name: "#1078",
      email: "samzdroba@yahoo.com",
      customer: {firstName: "Samuel", lastName: "Zdroba"},
      totalPriceSet: {shopMoney: {amount: "4.99", currencyCode: "USD"}},
      totalShippingPriceSet: {shopMoney: {amount: "0.0", currencyCode: "USD"}},
      createdAt: "2023-11-05T12:19:43Z",
      lineItems: [
        {
          title: "The 50 Greatest Business Success Stories",
          quantity: 1,
          variant: {
            price: "4.99",
            product: {
              handle:
                "snapshots-of-success-the-50-greatest-business-success-stories",
            },
            inventoryItem: {unitCost: {amount: "0.0"}},
          },
        },
      ],
      revenue: 4.99,
      profit: 4.99,
      shippingPrice: 0,
      order: {
        id: "gid://shopify/Order/5510757843260",
        name: "#1078",
        email: "samzdroba@yahoo.com",
        customer: {firstName: "Samuel", lastName: "Zdroba"},
        totalPriceSet: {shopMoney: {amount: "4.99", currencyCode: "USD"}},
        totalShippingPriceSet: {
          shopMoney: {amount: "0.0", currencyCode: "USD"},
        },
        createdAt: "2023-11-05T12:19:43Z",
        lineItems: [
          {
            title: "The 50 Greatest Business Success Stories",
            quantity: 1,
            variant: {
              price: "4.99",
              product: {
                handle:
                  "snapshots-of-success-the-50-greatest-business-success-stories",
              },
              inventoryItem: {unitCost: {amount: "0.0"}},
            },
            __parentId: "gid://shopify/Order/5510757843260",
          },
        ],
      },
    },
    {
      id: "gid://shopify/Order/5510681362748",
      name: "#1077",
      email: "Filipko.warho@gmail.com",
      customer: {firstName: "Filip", lastName: "Varhanik"},
      totalPriceSet: {shopMoney: {amount: "4.99", currencyCode: "USD"}},
      totalShippingPriceSet: {shopMoney: {amount: "0.0", currencyCode: "USD"}},
      createdAt: "2023-11-05T10:25:50Z",
      lineItems: [
        {
          title: "The 50 Greatest Business Success Stories",
          quantity: 1,
          variant: {
            price: "4.99",
            product: {
              handle:
                "snapshots-of-success-the-50-greatest-business-success-stories",
            },
            inventoryItem: {unitCost: {amount: "0.0"}},
          },
        },
      ],
      revenue: 4.99,
      profit: 4.99,
      shippingPrice: 0,
      order: {
        id: "gid://shopify/Order/5510681362748",
        name: "#1077",
        email: "Filipko.warho@gmail.com",
        customer: {firstName: "Filip", lastName: "Varhanik"},
        totalPriceSet: {shopMoney: {amount: "4.99", currencyCode: "USD"}},
        totalShippingPriceSet: {
          shopMoney: {amount: "0.0", currencyCode: "USD"},
        },
        createdAt: "2023-11-05T10:25:50Z",
        lineItems: [
          {
            title: "The 50 Greatest Business Success Stories",
            quantity: 1,
            variant: {
              price: "4.99",
              product: {
                handle:
                  "snapshots-of-success-the-50-greatest-business-success-stories",
              },
              inventoryItem: {unitCost: {amount: "0.0"}},
            },
            __parentId: "gid://shopify/Order/5510681362748",
          },
        ],
      },
    },
    {
      id: "gid://shopify/Order/5510532301116",
      name: "#1076",
      email: "leandra_pdr@hotmail.com",
      customer: {firstName: "Leandra", lastName: "Pedro"},
      totalPriceSet: {shopMoney: {amount: "4.99", currencyCode: "USD"}},
      totalShippingPriceSet: {shopMoney: {amount: "0.0", currencyCode: "USD"}},
      createdAt: "2023-11-05T05:26:05Z",
      lineItems: [
        {
          title: "The 50 Greatest Business Success Stories",
          quantity: 1,
          variant: {
            price: "4.99",
            product: {
              handle:
                "snapshots-of-success-the-50-greatest-business-success-stories",
            },
            inventoryItem: {unitCost: {amount: "0.0"}},
          },
        },
      ],
      revenue: 4.99,
      profit: 4.99,
      shippingPrice: 0,
      order: {
        id: "gid://shopify/Order/5510532301116",
        name: "#1076",
        email: "leandra_pdr@hotmail.com",
        customer: {firstName: "Leandra", lastName: "Pedro"},
        totalPriceSet: {shopMoney: {amount: "4.99", currencyCode: "USD"}},
        totalShippingPriceSet: {
          shopMoney: {amount: "0.0", currencyCode: "USD"},
        },
        createdAt: "2023-11-05T05:26:05Z",
        lineItems: [
          {
            title: "The 50 Greatest Business Success Stories",
            quantity: 1,
            variant: {
              price: "4.99",
              product: {
                handle:
                  "snapshots-of-success-the-50-greatest-business-success-stories",
              },
              inventoryItem: {unitCost: {amount: "0.0"}},
            },
            __parentId: "gid://shopify/Order/5510532301116",
          },
        ],
      },
    },
    {
      id: "gid://shopify/Order/5510510805308",
      name: "#1075",
      email: "riminygi@gmail.com",
      customer: {firstName: "Vanshika", lastName: "Bisht"},
      totalPriceSet: {shopMoney: {amount: "4.99", currencyCode: "USD"}},
      totalShippingPriceSet: {shopMoney: {amount: "0.0", currencyCode: "USD"}},
      createdAt: "2023-11-05T04:37:49Z",
      lineItems: [
        {
          title: "The 50 Greatest Business Success Stories",
          quantity: 1,
          variant: {
            price: "4.99",
            product: {
              handle:
                "snapshots-of-success-the-50-greatest-business-success-stories",
            },
            inventoryItem: {unitCost: {amount: "0.0"}},
          },
        },
      ],
      revenue: 4.99,
      profit: 4.99,
      shippingPrice: 0,
      order: {
        id: "gid://shopify/Order/5510510805308",
        name: "#1075",
        email: "riminygi@gmail.com",
        customer: {firstName: "Vanshika", lastName: "Bisht"},
        totalPriceSet: {shopMoney: {amount: "4.99", currencyCode: "USD"}},
        totalShippingPriceSet: {
          shopMoney: {amount: "0.0", currencyCode: "USD"},
        },
        createdAt: "2023-11-05T04:37:49Z",
        lineItems: [
          {
            title: "The 50 Greatest Business Success Stories",
            quantity: 1,
            variant: {
              price: "4.99",
              product: {
                handle:
                  "snapshots-of-success-the-50-greatest-business-success-stories",
              },
              inventoryItem: {unitCost: {amount: "0.0"}},
            },
            __parentId: "gid://shopify/Order/5510510805308",
          },
        ],
      },
    },
    {
      id: "gid://shopify/Order/5510473154876",
      name: "#1074",
      email: "vicchapman@rocketmail.com",
      customer: {firstName: "vic", lastName: "chapman"},
      totalPriceSet: {shopMoney: {amount: "4.99", currencyCode: "USD"}},
      totalShippingPriceSet: {shopMoney: {amount: "0.0", currencyCode: "USD"}},
      createdAt: "2023-11-05T03:24:48Z",
      lineItems: [
        {
          title: "The 50 Greatest Business Success Stories",
          quantity: 1,
          variant: {
            price: "4.99",
            product: {
              handle:
                "snapshots-of-success-the-50-greatest-business-success-stories",
            },
            inventoryItem: {unitCost: {amount: "0.0"}},
          },
        },
      ],
      revenue: 4.99,
      profit: 4.99,
      shippingPrice: 0,
      order: {
        id: "gid://shopify/Order/5510473154876",
        name: "#1074",
        email: "vicchapman@rocketmail.com",
        customer: {firstName: "vic", lastName: "chapman"},
        totalPriceSet: {shopMoney: {amount: "4.99", currencyCode: "USD"}},
        totalShippingPriceSet: {
          shopMoney: {amount: "0.0", currencyCode: "USD"},
        },
        createdAt: "2023-11-05T03:24:48Z",
        lineItems: [
          {
            title: "The 50 Greatest Business Success Stories",
            quantity: 1,
            variant: {
              price: "4.99",
              product: {
                handle:
                  "snapshots-of-success-the-50-greatest-business-success-stories",
              },
              inventoryItem: {unitCost: {amount: "0.0"}},
            },
            __parentId: "gid://shopify/Order/5510473154876",
          },
        ],
      },
    },
    {
      id: "gid://shopify/Order/5510041600316",
      name: "#1073",
      email: "japn2000@live.com.mx",
      customer: {firstName: "Jesus", lastName: "Preciado Navarro"},
      totalPriceSet: {shopMoney: {amount: "4.99", currencyCode: "USD"}},
      totalShippingPriceSet: {shopMoney: {amount: "0.0", currencyCode: "USD"}},
      createdAt: "2023-11-04T17:44:29Z",
      lineItems: [
        {
          title: "The 50 Greatest Business Success Stories",
          quantity: 1,
          variant: {
            price: "4.99",
            product: {
              handle:
                "snapshots-of-success-the-50-greatest-business-success-stories",
            },
            inventoryItem: {unitCost: {amount: "0.0"}},
          },
        },
      ],
      revenue: 4.99,
      profit: 4.99,
      shippingPrice: 0,
      order: {
        id: "gid://shopify/Order/5510041600316",
        name: "#1073",
        email: "japn2000@live.com.mx",
        customer: {firstName: "Jesus", lastName: "Preciado Navarro"},
        totalPriceSet: {shopMoney: {amount: "4.99", currencyCode: "USD"}},
        totalShippingPriceSet: {
          shopMoney: {amount: "0.0", currencyCode: "USD"},
        },
        createdAt: "2023-11-04T17:44:29Z",
        lineItems: [
          {
            title: "The 50 Greatest Business Success Stories",
            quantity: 1,
            variant: {
              price: "4.99",
              product: {
                handle:
                  "snapshots-of-success-the-50-greatest-business-success-stories",
              },
              inventoryItem: {unitCost: {amount: "0.0"}},
            },
            __parentId: "gid://shopify/Order/5510041600316",
          },
        ],
      },
    },
    {
      id: "gid://shopify/Order/5510033703228",
      name: "#1072",
      email: "alvaro506@gmail.com",
      customer: {firstName: "Alvaro", lastName: "Chacon"},
      totalPriceSet: {shopMoney: {amount: "41.67", currencyCode: "USD"}},
      totalShippingPriceSet: {shopMoney: {amount: "5.69", currencyCode: "USD"}},
      createdAt: "2023-11-04T17:37:24Z",
      lineItems: [
        {
          title: "The 50 Greatest Business Success Stories",
          quantity: 2,
          variant: {
            price: "17.99",
            product: {
              handle:
                "snapshots-of-success-the-50-greatest-business-success-stories",
            },
            inventoryItem: {unitCost: {amount: "6.73"}},
          },
        },
      ],
      revenue: 41.67,
      profit: 29.25,
      shippingPrice: 5.69,
      order: {
        id: "gid://shopify/Order/5510033703228",
        name: "#1072",
        email: "alvaro506@gmail.com",
        customer: {firstName: "Alvaro", lastName: "Chacon"},
        totalPriceSet: {shopMoney: {amount: "41.67", currencyCode: "USD"}},
        totalShippingPriceSet: {
          shopMoney: {amount: "5.69", currencyCode: "USD"},
        },
        createdAt: "2023-11-04T17:37:24Z",
        lineItems: [
          {
            title: "The 50 Greatest Business Success Stories",
            quantity: 2,
            variant: {
              price: "17.99",
              product: {
                handle:
                  "snapshots-of-success-the-50-greatest-business-success-stories",
              },
              inventoryItem: {unitCost: {amount: "6.73"}},
            },
            __parentId: "gid://shopify/Order/5510033703228",
          },
        ],
      },
    },
    {
      id: "gid://shopify/Order/5510032752956",
      name: "#1071",
      email: "ekengewa@gmail.com",
      customer: {firstName: "Ekeng", lastName: "Ekeng"},
      totalPriceSet: {shopMoney: {amount: "32.93", currencyCode: "USD"}},
      totalShippingPriceSet: {shopMoney: {amount: "4.94", currencyCode: "USD"}},
      createdAt: "2023-11-04T17:36:23Z",
      lineItems: [
        {
          title: "The 50 Greatest Business Success Stories",
          quantity: 1,
          variant: {
            price: "27.99",
            product: {
              handle:
                "snapshots-of-success-the-50-greatest-business-success-stories",
            },
            inventoryItem: {unitCost: {amount: "16.28"}},
          },
        },
      ],
      revenue: 32.93,
      profit: 11.71,
      shippingPrice: 4.94,
      order: {
        id: "gid://shopify/Order/5510032752956",
        name: "#1071",
        email: "ekengewa@gmail.com",
        customer: {firstName: "Ekeng", lastName: "Ekeng"},
        totalPriceSet: {shopMoney: {amount: "32.93", currencyCode: "USD"}},
        totalShippingPriceSet: {
          shopMoney: {amount: "4.94", currencyCode: "USD"},
        },
        createdAt: "2023-11-04T17:36:23Z",
        lineItems: [
          {
            title: "The 50 Greatest Business Success Stories",
            quantity: 1,
            variant: {
              price: "27.99",
              product: {
                handle:
                  "snapshots-of-success-the-50-greatest-business-success-stories",
              },
              inventoryItem: {unitCost: {amount: "16.28"}},
            },
            __parentId: "gid://shopify/Order/5510032752956",
          },
        ],
      },
    },
    {
      id: "gid://shopify/Order/5509952373052",
      name: "#1070",
      email: "fabio507@gmail.com",
      customer: {firstName: "Fabio", lastName: "Rodrigues"},
      totalPriceSet: {shopMoney: {amount: "4.99", currencyCode: "USD"}},
      totalShippingPriceSet: {shopMoney: {amount: "0.0", currencyCode: "USD"}},
      createdAt: "2023-11-04T16:19:02Z",
      lineItems: [
        {
          title: "The 50 Greatest Business Success Stories",
          quantity: 1,
          variant: {
            price: "4.99",
            product: {
              handle:
                "snapshots-of-success-the-50-greatest-business-success-stories",
            },
            inventoryItem: {unitCost: {amount: "0.0"}},
          },
        },
      ],
      revenue: 4.99,
      profit: 4.99,
      shippingPrice: 0,
      order: {
        id: "gid://shopify/Order/5509952373052",
        name: "#1070",
        email: "fabio507@gmail.com",
        customer: {firstName: "Fabio", lastName: "Rodrigues"},
        totalPriceSet: {shopMoney: {amount: "4.99", currencyCode: "USD"}},
        totalShippingPriceSet: {
          shopMoney: {amount: "0.0", currencyCode: "USD"},
        },
        createdAt: "2023-11-04T16:19:02Z",
        lineItems: [
          {
            title: "The 50 Greatest Business Success Stories",
            quantity: 1,
            variant: {
              price: "4.99",
              product: {
                handle:
                  "snapshots-of-success-the-50-greatest-business-success-stories",
              },
              inventoryItem: {unitCost: {amount: "0.0"}},
            },
            __parentId: "gid://shopify/Order/5509952373052",
          },
        ],
      },
    },
    {
      id: "gid://shopify/Order/5509834244412",
      name: "#1069",
      email: "mateolopez55@gmail.com",
      customer: {firstName: "Mateo", lastName: "Lopez"},
      totalPriceSet: {shopMoney: {amount: "22.93", currencyCode: "USD"}},
      totalShippingPriceSet: {shopMoney: {amount: "4.94", currencyCode: "USD"}},
      createdAt: "2023-11-04T14:30:47Z",
      lineItems: [
        {
          title: "The 50 Greatest Business Success Stories",
          quantity: 1,
          variant: {
            price: "17.99",
            product: {
              handle:
                "snapshots-of-success-the-50-greatest-business-success-stories",
            },
            inventoryItem: {unitCost: {amount: "6.73"}},
          },
        },
      ],
      revenue: 22.93,
      profit: 11.26,
      shippingPrice: 4.94,
      order: {
        id: "gid://shopify/Order/5509834244412",
        name: "#1069",
        email: "mateolopez55@gmail.com",
        customer: {firstName: "Mateo", lastName: "Lopez"},
        totalPriceSet: {shopMoney: {amount: "22.93", currencyCode: "USD"}},
        totalShippingPriceSet: {
          shopMoney: {amount: "4.94", currencyCode: "USD"},
        },
        createdAt: "2023-11-04T14:30:47Z",
        lineItems: [
          {
            title: "The 50 Greatest Business Success Stories",
            quantity: 1,
            variant: {
              price: "17.99",
              product: {
                handle:
                  "snapshots-of-success-the-50-greatest-business-success-stories",
              },
              inventoryItem: {unitCost: {amount: "6.73"}},
            },
            __parentId: "gid://shopify/Order/5509834244412",
          },
        ],
      },
    },
    {
      id: "gid://shopify/Order/5509544968508",
      name: "#1068",
      email: "sven.machielsen@vanoirschot.be",
      customer: {firstName: "Sven", lastName: "Machielsen"},
      totalPriceSet: {shopMoney: {amount: "4.99", currencyCode: "USD"}},
      totalShippingPriceSet: {shopMoney: {amount: "0.0", currencyCode: "USD"}},
      createdAt: "2023-11-04T08:52:31Z",
      lineItems: [
        {
          title: "The 50 Greatest Business Success Stories",
          quantity: 1,
          variant: {
            price: "4.99",
            product: {
              handle:
                "snapshots-of-success-the-50-greatest-business-success-stories",
            },
            inventoryItem: {unitCost: {amount: "0.0"}},
          },
        },
      ],
      revenue: 4.99,
      profit: 4.99,
      shippingPrice: 0,
      order: {
        id: "gid://shopify/Order/5509544968508",
        name: "#1068",
        email: "sven.machielsen@vanoirschot.be",
        customer: {firstName: "Sven", lastName: "Machielsen"},
        totalPriceSet: {shopMoney: {amount: "4.99", currencyCode: "USD"}},
        totalShippingPriceSet: {
          shopMoney: {amount: "0.0", currencyCode: "USD"},
        },
        createdAt: "2023-11-04T08:52:31Z",
        lineItems: [
          {
            title: "The 50 Greatest Business Success Stories",
            quantity: 1,
            variant: {
              price: "4.99",
              product: {
                handle:
                  "snapshots-of-success-the-50-greatest-business-success-stories",
              },
              inventoryItem: {unitCost: {amount: "0.0"}},
            },
            __parentId: "gid://shopify/Order/5509544968508",
          },
        ],
      },
    },
    {
      id: "gid://shopify/Order/5509481759036",
      name: "#1067",
      email: "cjmix718@gmail.com",
      customer: {firstName: "Cassius", lastName: "Jennings"},
      totalPriceSet: {shopMoney: {amount: "22.93", currencyCode: "USD"}},
      totalShippingPriceSet: {shopMoney: {amount: "4.94", currencyCode: "USD"}},
      createdAt: "2023-11-04T06:53:47Z",
      lineItems: [
        {
          title: "The 50 Greatest Business Success Stories",
          quantity: 1,
          variant: {
            price: "17.99",
            product: {
              handle:
                "snapshots-of-success-the-50-greatest-business-success-stories",
            },
            inventoryItem: {unitCost: {amount: "6.73"}},
          },
        },
      ],
      revenue: 22.93,
      profit: 11.26,
      shippingPrice: 4.94,
      order: {
        id: "gid://shopify/Order/5509481759036",
        name: "#1067",
        email: "cjmix718@gmail.com",
        customer: {firstName: "Cassius", lastName: "Jennings"},
        totalPriceSet: {shopMoney: {amount: "22.93", currencyCode: "USD"}},
        totalShippingPriceSet: {
          shopMoney: {amount: "4.94", currencyCode: "USD"},
        },
        createdAt: "2023-11-04T06:53:47Z",
        lineItems: [
          {
            title: "The 50 Greatest Business Success Stories",
            quantity: 1,
            variant: {
              price: "17.99",
              product: {
                handle:
                  "snapshots-of-success-the-50-greatest-business-success-stories",
              },
              inventoryItem: {unitCost: {amount: "6.73"}},
            },
            __parentId: "gid://shopify/Order/5509481759036",
          },
        ],
      },
    },
    {
      id: "gid://shopify/Order/5508646273340",
      name: "#1066",
      email: "Shellirai@gmail.com",
      customer: {firstName: "Shelli", lastName: "Rai"},
      totalPriceSet: {shopMoney: {amount: "4.99", currencyCode: "USD"}},
      totalShippingPriceSet: {shopMoney: {amount: "0.0", currencyCode: "USD"}},
      createdAt: "2023-11-04T01:42:26Z",
      lineItems: [
        {
          title: "The 50 Greatest Business Success Stories",
          quantity: 1,
          variant: {
            price: "4.99",
            product: {
              handle:
                "snapshots-of-success-the-50-greatest-business-success-stories",
            },
            inventoryItem: {unitCost: {amount: "0.0"}},
          },
        },
      ],
      revenue: 4.99,
      profit: 4.99,
      shippingPrice: 0,
      order: {
        id: "gid://shopify/Order/5508646273340",
        name: "#1066",
        email: "Shellirai@gmail.com",
        customer: {firstName: "Shelli", lastName: "Rai"},
        totalPriceSet: {shopMoney: {amount: "4.99", currencyCode: "USD"}},
        totalShippingPriceSet: {
          shopMoney: {amount: "0.0", currencyCode: "USD"},
        },
        createdAt: "2023-11-04T01:42:26Z",
        lineItems: [
          {
            title: "The 50 Greatest Business Success Stories",
            quantity: 1,
            variant: {
              price: "4.99",
              product: {
                handle:
                  "snapshots-of-success-the-50-greatest-business-success-stories",
              },
              inventoryItem: {unitCost: {amount: "0.0"}},
            },
            __parentId: "gid://shopify/Order/5508646273340",
          },
        ],
      },
    },
    {
      id: "gid://shopify/Order/5507929833788",
      name: "#1065",
      email: "Konate1@gmx.de",
      customer: {firstName: "Aboubacar", lastName: "Konate"},
      totalPriceSet: {shopMoney: {amount: "4.99", currencyCode: "USD"}},
      totalShippingPriceSet: {shopMoney: {amount: "0.0", currencyCode: "USD"}},
      createdAt: "2023-11-03T21:09:10Z",
      lineItems: [
        {
          title: "The 50 Greatest Business Success Stories",
          quantity: 1,
          variant: {
            price: "4.99",
            product: {
              handle:
                "snapshots-of-success-the-50-greatest-business-success-stories",
            },
            inventoryItem: {unitCost: {amount: "0.0"}},
          },
        },
      ],
      revenue: 4.99,
      profit: 4.99,
      shippingPrice: 0,
      order: {
        id: "gid://shopify/Order/5507929833788",
        name: "#1065",
        email: "Konate1@gmx.de",
        customer: {firstName: "Aboubacar", lastName: "Konate"},
        totalPriceSet: {shopMoney: {amount: "4.99", currencyCode: "USD"}},
        totalShippingPriceSet: {
          shopMoney: {amount: "0.0", currencyCode: "USD"},
        },
        createdAt: "2023-11-03T21:09:10Z",
        lineItems: [
          {
            title: "The 50 Greatest Business Success Stories",
            quantity: 1,
            variant: {
              price: "4.99",
              product: {
                handle:
                  "snapshots-of-success-the-50-greatest-business-success-stories",
              },
              inventoryItem: {unitCost: {amount: "0.0"}},
            },
            __parentId: "gid://shopify/Order/5507929833788",
          },
        ],
      },
    },
    {
      id: "gid://shopify/Order/5507897131324",
      name: "#1064",
      email: "contact.austinj@gmail.com",
      customer: {firstName: "Austin", lastName: "Jiang"},
      totalPriceSet: {shopMoney: {amount: "4.99", currencyCode: "USD"}},
      totalShippingPriceSet: {shopMoney: {amount: "0.0", currencyCode: "USD"}},
      createdAt: "2023-11-03T20:36:03Z",
      lineItems: [
        {
          title: "The 50 Greatest Business Success Stories",
          quantity: 1,
          variant: {
            price: "4.99",
            product: {
              handle:
                "snapshots-of-success-the-50-greatest-business-success-stories",
            },
            inventoryItem: {unitCost: {amount: "0.0"}},
          },
        },
      ],
      revenue: 4.99,
      profit: 4.99,
      shippingPrice: 0,
      order: {
        id: "gid://shopify/Order/5507897131324",
        name: "#1064",
        email: "contact.austinj@gmail.com",
        customer: {firstName: "Austin", lastName: "Jiang"},
        totalPriceSet: {shopMoney: {amount: "4.99", currencyCode: "USD"}},
        totalShippingPriceSet: {
          shopMoney: {amount: "0.0", currencyCode: "USD"},
        },
        createdAt: "2023-11-03T20:36:03Z",
        lineItems: [
          {
            title: "The 50 Greatest Business Success Stories",
            quantity: 1,
            variant: {
              price: "4.99",
              product: {
                handle:
                  "snapshots-of-success-the-50-greatest-business-success-stories",
              },
              inventoryItem: {unitCost: {amount: "0.0"}},
            },
            __parentId: "gid://shopify/Order/5507897131324",
          },
        ],
      },
    },
    {
      id: "gid://shopify/Order/5507558015292",
      name: "#1063",
      email: "tiagoaraujo@workin.pro",
      customer: {firstName: "Tiago", lastName: "Carvalho Araujo"},
      totalPriceSet: {shopMoney: {amount: "4.99", currencyCode: "USD"}},
      totalShippingPriceSet: {shopMoney: {amount: "0.0", currencyCode: "USD"}},
      createdAt: "2023-11-03T15:45:56Z",
      lineItems: [
        {
          title: "The 50 Greatest Business Success Stories",
          quantity: 1,
          variant: {
            price: "4.99",
            product: {
              handle:
                "snapshots-of-success-the-50-greatest-business-success-stories",
            },
            inventoryItem: {unitCost: {amount: "0.0"}},
          },
        },
      ],
      revenue: 4.99,
      profit: 4.99,
      shippingPrice: 0,
      order: {
        id: "gid://shopify/Order/5507558015292",
        name: "#1063",
        email: "tiagoaraujo@workin.pro",
        customer: {firstName: "Tiago", lastName: "Carvalho Araujo"},
        totalPriceSet: {shopMoney: {amount: "4.99", currencyCode: "USD"}},
        totalShippingPriceSet: {
          shopMoney: {amount: "0.0", currencyCode: "USD"},
        },
        createdAt: "2023-11-03T15:45:56Z",
        lineItems: [
          {
            title: "The 50 Greatest Business Success Stories",
            quantity: 1,
            variant: {
              price: "4.99",
              product: {
                handle:
                  "snapshots-of-success-the-50-greatest-business-success-stories",
              },
              inventoryItem: {unitCost: {amount: "0.0"}},
            },
            __parentId: "gid://shopify/Order/5507558015292",
          },
        ],
      },
    },
    {
      id: "gid://shopify/Order/5507540320572",
      name: "#1062",
      email: "tjdefabrizio@yahoo.com",
      customer: {firstName: "Thomas", lastName: "D"},
      totalPriceSet: {shopMoney: {amount: "22.93", currencyCode: "USD"}},
      totalShippingPriceSet: {shopMoney: {amount: "4.94", currencyCode: "USD"}},
      createdAt: "2023-11-03T15:30:30Z",
      lineItems: [
        {
          title: "The 50 Greatest Business Success Stories",
          quantity: 1,
          variant: {
            price: "17.99",
            product: {
              handle:
                "snapshots-of-success-the-50-greatest-business-success-stories",
            },
            inventoryItem: {unitCost: {amount: "6.73"}},
          },
        },
      ],
      revenue: 22.93,
      profit: 11.26,
      shippingPrice: 4.94,
      order: {
        id: "gid://shopify/Order/5507540320572",
        name: "#1062",
        email: "tjdefabrizio@yahoo.com",
        customer: {firstName: "Thomas", lastName: "D"},
        totalPriceSet: {shopMoney: {amount: "22.93", currencyCode: "USD"}},
        totalShippingPriceSet: {
          shopMoney: {amount: "4.94", currencyCode: "USD"},
        },
        createdAt: "2023-11-03T15:30:30Z",
        lineItems: [
          {
            title: "The 50 Greatest Business Success Stories",
            quantity: 1,
            variant: {
              price: "17.99",
              product: {
                handle:
                  "snapshots-of-success-the-50-greatest-business-success-stories",
              },
              inventoryItem: {unitCost: {amount: "6.73"}},
            },
            __parentId: "gid://shopify/Order/5507540320572",
          },
        ],
      },
    },
    {
      id: "gid://shopify/Order/5507453649212",
      name: "#1061",
      email: "kennedy@clientsvalley.com",
      customer: {firstName: "Kennedy", lastName: "Chukwuka"},
      totalPriceSet: {shopMoney: {amount: "4.99", currencyCode: "USD"}},
      totalShippingPriceSet: {shopMoney: {amount: "0.0", currencyCode: "USD"}},
      createdAt: "2023-11-03T14:43:16Z",
      lineItems: [
        {
          title: "The 50 Greatest Business Success Stories",
          quantity: 1,
          variant: {
            price: "4.99",
            product: {
              handle:
                "snapshots-of-success-the-50-greatest-business-success-stories",
            },
            inventoryItem: {unitCost: {amount: "0.0"}},
          },
        },
      ],
      revenue: 4.99,
      profit: 4.99,
      shippingPrice: 0,
      order: {
        id: "gid://shopify/Order/5507453649212",
        name: "#1061",
        email: "kennedy@clientsvalley.com",
        customer: {firstName: "Kennedy", lastName: "Chukwuka"},
        totalPriceSet: {shopMoney: {amount: "4.99", currencyCode: "USD"}},
        totalShippingPriceSet: {
          shopMoney: {amount: "0.0", currencyCode: "USD"},
        },
        createdAt: "2023-11-03T14:43:16Z",
        lineItems: [
          {
            title: "The 50 Greatest Business Success Stories",
            quantity: 1,
            variant: {
              price: "4.99",
              product: {
                handle:
                  "snapshots-of-success-the-50-greatest-business-success-stories",
              },
              inventoryItem: {unitCost: {amount: "0.0"}},
            },
            __parentId: "gid://shopify/Order/5507453649212",
          },
        ],
      },
    },
    {
      id: "gid://shopify/Order/5507415212348",
      name: "#1060",
      email: "luca.bifolco@gmail.com",
      customer: {firstName: "Luca", lastName: "Bifolco"},
      totalPriceSet: {shopMoney: {amount: "4.99", currencyCode: "USD"}},
      totalShippingPriceSet: {shopMoney: {amount: "0.0", currencyCode: "USD"}},
      createdAt: "2023-11-03T14:20:10Z",
      lineItems: [
        {
          title: "The 50 Greatest Business Success Stories",
          quantity: 1,
          variant: {
            price: "4.99",
            product: {
              handle:
                "snapshots-of-success-the-50-greatest-business-success-stories",
            },
            inventoryItem: {unitCost: {amount: "0.0"}},
          },
        },
      ],
      revenue: 4.99,
      profit: 4.99,
      shippingPrice: 0,
      order: {
        id: "gid://shopify/Order/5507415212348",
        name: "#1060",
        email: "luca.bifolco@gmail.com",
        customer: {firstName: "Luca", lastName: "Bifolco"},
        totalPriceSet: {shopMoney: {amount: "4.99", currencyCode: "USD"}},
        totalShippingPriceSet: {
          shopMoney: {amount: "0.0", currencyCode: "USD"},
        },
        createdAt: "2023-11-03T14:20:10Z",
        lineItems: [
          {
            title: "The 50 Greatest Business Success Stories",
            quantity: 1,
            variant: {
              price: "4.99",
              product: {
                handle:
                  "snapshots-of-success-the-50-greatest-business-success-stories",
              },
              inventoryItem: {unitCost: {amount: "0.0"}},
            },
            __parentId: "gid://shopify/Order/5507415212348",
          },
        ],
      },
    },
    {
      id: "gid://shopify/Order/5507296461116",
      name: "#1059",
      email: "artenio.palmira@gmail.com",
      customer: {firstName: "Artenio", lastName: "Palmira"},
      totalPriceSet: {shopMoney: {amount: "4.99", currencyCode: "USD"}},
      totalShippingPriceSet: {shopMoney: {amount: "0.0", currencyCode: "USD"}},
      createdAt: "2023-11-03T12:49:36Z",
      lineItems: [
        {
          title: "The 50 Greatest Business Success Stories",
          quantity: 1,
          variant: {
            price: "4.99",
            product: {
              handle:
                "snapshots-of-success-the-50-greatest-business-success-stories",
            },
            inventoryItem: {unitCost: {amount: "0.0"}},
          },
        },
      ],
      revenue: 4.99,
      profit: 4.99,
      shippingPrice: 0,
      order: {
        id: "gid://shopify/Order/5507296461116",
        name: "#1059",
        email: "artenio.palmira@gmail.com",
        customer: {firstName: "Artenio", lastName: "Palmira"},
        totalPriceSet: {shopMoney: {amount: "4.99", currencyCode: "USD"}},
        totalShippingPriceSet: {
          shopMoney: {amount: "0.0", currencyCode: "USD"},
        },
        createdAt: "2023-11-03T12:49:36Z",
        lineItems: [
          {
            title: "The 50 Greatest Business Success Stories",
            quantity: 1,
            variant: {
              price: "4.99",
              product: {
                handle:
                  "snapshots-of-success-the-50-greatest-business-success-stories",
              },
              inventoryItem: {unitCost: {amount: "0.0"}},
            },
            __parentId: "gid://shopify/Order/5507296461116",
          },
        ],
      },
    },
    {
      id: "gid://shopify/Order/5507176628540",
      name: "#1058",
      email: "sai.rudramaina@gmail.com",
      customer: {firstName: "Sai", lastName: "Rudramaina"},
      totalPriceSet: {shopMoney: {amount: "4.99", currencyCode: "USD"}},
      totalShippingPriceSet: {shopMoney: {amount: "0.0", currencyCode: "USD"}},
      createdAt: "2023-11-03T10:04:04Z",
      lineItems: [
        {
          title: "The 50 Greatest Business Success Stories",
          quantity: 1,
          variant: {
            price: "4.99",
            product: {
              handle:
                "snapshots-of-success-the-50-greatest-business-success-stories",
            },
            inventoryItem: {unitCost: {amount: "0.0"}},
          },
        },
      ],
      revenue: 4.99,
      profit: 4.99,
      shippingPrice: 0,
      order: {
        id: "gid://shopify/Order/5507176628540",
        name: "#1058",
        email: "sai.rudramaina@gmail.com",
        customer: {firstName: "Sai", lastName: "Rudramaina"},
        totalPriceSet: {shopMoney: {amount: "4.99", currencyCode: "USD"}},
        totalShippingPriceSet: {
          shopMoney: {amount: "0.0", currencyCode: "USD"},
        },
        createdAt: "2023-11-03T10:04:04Z",
        lineItems: [
          {
            title: "The 50 Greatest Business Success Stories",
            quantity: 1,
            variant: {
              price: "4.99",
              product: {
                handle:
                  "snapshots-of-success-the-50-greatest-business-success-stories",
              },
              inventoryItem: {unitCost: {amount: "0.0"}},
            },
            __parentId: "gid://shopify/Order/5507176628540",
          },
        ],
      },
    },
    {
      id: "gid://shopify/Order/5506947285308",
      name: "#1057",
      email: "alberthluk1@gmail.com",
      customer: {firstName: "Albert", lastName: "Luk"},
      totalPriceSet: {shopMoney: {amount: "4.99", currencyCode: "USD"}},
      totalShippingPriceSet: {shopMoney: {amount: "0.0", currencyCode: "USD"}},
      createdAt: "2023-11-03T02:25:37Z",
      lineItems: [
        {
          title: "The 50 Greatest Business Success Stories",
          quantity: 1,
          variant: {
            price: "4.99",
            product: {
              handle:
                "snapshots-of-success-the-50-greatest-business-success-stories",
            },
            inventoryItem: {unitCost: {amount: "0.0"}},
          },
        },
      ],
      revenue: 4.99,
      profit: 4.99,
      shippingPrice: 0,
      order: {
        id: "gid://shopify/Order/5506947285308",
        name: "#1057",
        email: "alberthluk1@gmail.com",
        customer: {firstName: "Albert", lastName: "Luk"},
        totalPriceSet: {shopMoney: {amount: "4.99", currencyCode: "USD"}},
        totalShippingPriceSet: {
          shopMoney: {amount: "0.0", currencyCode: "USD"},
        },
        createdAt: "2023-11-03T02:25:37Z",
        lineItems: [
          {
            title: "The 50 Greatest Business Success Stories",
            quantity: 1,
            variant: {
              price: "4.99",
              product: {
                handle:
                  "snapshots-of-success-the-50-greatest-business-success-stories",
              },
              inventoryItem: {unitCost: {amount: "0.0"}},
            },
            __parentId: "gid://shopify/Order/5506947285308",
          },
        ],
      },
    },
    {
      id: "gid://shopify/Order/5506511995196",
      name: "#1056",
      email: "gabriel@gabrielerwin.com",
      customer: {firstName: "Gabriel", lastName: "Erwin"},
      totalPriceSet: {shopMoney: {amount: "4.99", currencyCode: "USD"}},
      totalShippingPriceSet: {shopMoney: {amount: "0.0", currencyCode: "USD"}},
      createdAt: "2023-11-02T16:44:41Z",
      lineItems: [
        {
          title: "The 50 Greatest Business Success Stories",
          quantity: 1,
          variant: {
            price: "4.99",
            product: {
              handle:
                "snapshots-of-success-the-50-greatest-business-success-stories",
            },
            inventoryItem: {unitCost: {amount: "0.0"}},
          },
        },
      ],
      revenue: 4.99,
      profit: 4.99,
      shippingPrice: 0,
      order: {
        id: "gid://shopify/Order/5506511995196",
        name: "#1056",
        email: "gabriel@gabrielerwin.com",
        customer: {firstName: "Gabriel", lastName: "Erwin"},
        totalPriceSet: {shopMoney: {amount: "4.99", currencyCode: "USD"}},
        totalShippingPriceSet: {
          shopMoney: {amount: "0.0", currencyCode: "USD"},
        },
        createdAt: "2023-11-02T16:44:41Z",
        lineItems: [
          {
            title: "The 50 Greatest Business Success Stories",
            quantity: 1,
            variant: {
              price: "4.99",
              product: {
                handle:
                  "snapshots-of-success-the-50-greatest-business-success-stories",
              },
              inventoryItem: {unitCost: {amount: "0.0"}},
            },
            __parentId: "gid://shopify/Order/5506511995196",
          },
        ],
      },
    },
    {
      id: "gid://shopify/Order/5506438332732",
      name: "#1055",
      email: "autominate@gmail.com",
      customer: {firstName: "Andy", lastName: "Willis"},
      totalPriceSet: {shopMoney: {amount: "4.99", currencyCode: "USD"}},
      totalShippingPriceSet: {shopMoney: {amount: "0.0", currencyCode: "USD"}},
      createdAt: "2023-11-02T15:36:15Z",
      lineItems: [
        {
          title: "The 50 Greatest Business Success Stories",
          quantity: 1,
          variant: {
            price: "4.99",
            product: {
              handle:
                "snapshots-of-success-the-50-greatest-business-success-stories",
            },
            inventoryItem: {unitCost: {amount: "0.0"}},
          },
        },
      ],
      revenue: 4.99,
      profit: 4.99,
      shippingPrice: 0,
      order: {
        id: "gid://shopify/Order/5506438332732",
        name: "#1055",
        email: "autominate@gmail.com",
        customer: {firstName: "Andy", lastName: "Willis"},
        totalPriceSet: {shopMoney: {amount: "4.99", currencyCode: "USD"}},
        totalShippingPriceSet: {
          shopMoney: {amount: "0.0", currencyCode: "USD"},
        },
        createdAt: "2023-11-02T15:36:15Z",
        lineItems: [
          {
            title: "The 50 Greatest Business Success Stories",
            quantity: 1,
            variant: {
              price: "4.99",
              product: {
                handle:
                  "snapshots-of-success-the-50-greatest-business-success-stories",
              },
              inventoryItem: {unitCost: {amount: "0.0"}},
            },
            __parentId: "gid://shopify/Order/5506438332732",
          },
        ],
      },
    },
    {
      id: "gid://shopify/Order/5505924006204",
      name: "#1054",
      email: "paypal@davidx.net",
      customer: {firstName: "David", lastName: "Segura"},
      totalPriceSet: {shopMoney: {amount: "22.93", currencyCode: "USD"}},
      totalShippingPriceSet: {shopMoney: {amount: "4.94", currencyCode: "USD"}},
      createdAt: "2023-11-02T04:08:32Z",
      lineItems: [
        {
          title: "The 50 Greatest Business Success Stories",
          quantity: 1,
          variant: {
            price: "17.99",
            product: {
              handle:
                "snapshots-of-success-the-50-greatest-business-success-stories",
            },
            inventoryItem: {unitCost: {amount: "6.73"}},
          },
        },
      ],
      revenue: 22.93,
      profit: 11.26,
      shippingPrice: 4.94,
      order: {
        id: "gid://shopify/Order/5505924006204",
        name: "#1054",
        email: "paypal@davidx.net",
        customer: {firstName: "David", lastName: "Segura"},
        totalPriceSet: {shopMoney: {amount: "22.93", currencyCode: "USD"}},
        totalShippingPriceSet: {
          shopMoney: {amount: "4.94", currencyCode: "USD"},
        },
        createdAt: "2023-11-02T04:08:32Z",
        lineItems: [
          {
            title: "The 50 Greatest Business Success Stories",
            quantity: 1,
            variant: {
              price: "17.99",
              product: {
                handle:
                  "snapshots-of-success-the-50-greatest-business-success-stories",
              },
              inventoryItem: {unitCost: {amount: "6.73"}},
            },
            __parentId: "gid://shopify/Order/5505924006204",
          },
        ],
      },
    },
    {
      id: "gid://shopify/Order/5505712128316",
      name: "#1053",
      email: "jamilvelji0@gmail.com",
      customer: {firstName: "jamil", lastName: "velji"},
      totalPriceSet: {shopMoney: {amount: "4.99", currencyCode: "USD"}},
      totalShippingPriceSet: {shopMoney: {amount: "0.0", currencyCode: "USD"}},
      createdAt: "2023-11-01T21:59:58Z",
      lineItems: [
        {
          title: "The 50 Greatest Business Success Stories",
          quantity: 1,
          variant: {
            price: "4.99",
            product: {
              handle:
                "snapshots-of-success-the-50-greatest-business-success-stories",
            },
            inventoryItem: {unitCost: {amount: "0.0"}},
          },
        },
      ],
      revenue: 4.99,
      profit: 4.99,
      shippingPrice: 0,
      order: {
        id: "gid://shopify/Order/5505712128316",
        name: "#1053",
        email: "jamilvelji0@gmail.com",
        customer: {firstName: "jamil", lastName: "velji"},
        totalPriceSet: {shopMoney: {amount: "4.99", currencyCode: "USD"}},
        totalShippingPriceSet: {
          shopMoney: {amount: "0.0", currencyCode: "USD"},
        },
        createdAt: "2023-11-01T21:59:58Z",
        lineItems: [
          {
            title: "The 50 Greatest Business Success Stories",
            quantity: 1,
            variant: {
              price: "4.99",
              product: {
                handle:
                  "snapshots-of-success-the-50-greatest-business-success-stories",
              },
              inventoryItem: {unitCost: {amount: "0.0"}},
            },
            __parentId: "gid://shopify/Order/5505712128316",
          },
        ],
      },
    },
    {
      id: "gid://shopify/Order/5505686372668",
      name: "#1052",
      email: "bhasin1@gmail.com",
      customer: {firstName: "Rajat", lastName: "Bhasin"},
      totalPriceSet: {shopMoney: {amount: "22.93", currencyCode: "USD"}},
      totalShippingPriceSet: {shopMoney: {amount: "4.94", currencyCode: "USD"}},
      createdAt: "2023-11-01T21:23:36Z",
      lineItems: [
        {
          title: "The 50 Greatest Business Success Stories",
          quantity: 1,
          variant: {
            price: "17.99",
            product: {
              handle:
                "snapshots-of-success-the-50-greatest-business-success-stories",
            },
            inventoryItem: {unitCost: {amount: "6.73"}},
          },
        },
      ],
      revenue: 22.93,
      profit: 11.26,
      shippingPrice: 4.94,
      order: {
        id: "gid://shopify/Order/5505686372668",
        name: "#1052",
        email: "bhasin1@gmail.com",
        customer: {firstName: "Rajat", lastName: "Bhasin"},
        totalPriceSet: {shopMoney: {amount: "22.93", currencyCode: "USD"}},
        totalShippingPriceSet: {
          shopMoney: {amount: "4.94", currencyCode: "USD"},
        },
        createdAt: "2023-11-01T21:23:36Z",
        lineItems: [
          {
            title: "The 50 Greatest Business Success Stories",
            quantity: 1,
            variant: {
              price: "17.99",
              product: {
                handle:
                  "snapshots-of-success-the-50-greatest-business-success-stories",
              },
              inventoryItem: {unitCost: {amount: "6.73"}},
            },
            __parentId: "gid://shopify/Order/5505686372668",
          },
        ],
      },
    },
    {
      id: "gid://shopify/Order/5505625915708",
      name: "#1051",
      email: "a.orbaekwhite@gmail.com",
      customer: {firstName: "Alvin", lastName: "Orbaek white"},
      totalPriceSet: {shopMoney: {amount: "4.99", currencyCode: "USD"}},
      totalShippingPriceSet: {shopMoney: {amount: "0.0", currencyCode: "USD"}},
      createdAt: "2023-11-01T19:59:15Z",
      lineItems: [
        {
          title: "The 50 Greatest Business Success Stories",
          quantity: 1,
          variant: {
            price: "4.99",
            product: {
              handle:
                "snapshots-of-success-the-50-greatest-business-success-stories",
            },
            inventoryItem: {unitCost: {amount: "0.0"}},
          },
        },
      ],
      revenue: 4.99,
      profit: 4.99,
      shippingPrice: 0,
      order: {
        id: "gid://shopify/Order/5505625915708",
        name: "#1051",
        email: "a.orbaekwhite@gmail.com",
        customer: {firstName: "Alvin", lastName: "Orbaek white"},
        totalPriceSet: {shopMoney: {amount: "4.99", currencyCode: "USD"}},
        totalShippingPriceSet: {
          shopMoney: {amount: "0.0", currencyCode: "USD"},
        },
        createdAt: "2023-11-01T19:59:15Z",
        lineItems: [
          {
            title: "The 50 Greatest Business Success Stories",
            quantity: 1,
            variant: {
              price: "4.99",
              product: {
                handle:
                  "snapshots-of-success-the-50-greatest-business-success-stories",
              },
              inventoryItem: {unitCost: {amount: "0.0"}},
            },
            __parentId: "gid://shopify/Order/5505625915708",
          },
        ],
      },
    },
    {
      id: "gid://shopify/Order/5505573323068",
      name: "#1050",
      email: "alexanderwagner211@gmail.com",
      customer: {firstName: "Kathleen", lastName: "Klotz"},
      totalPriceSet: {shopMoney: {amount: "22.93", currencyCode: "USD"}},
      totalShippingPriceSet: {shopMoney: {amount: "4.94", currencyCode: "USD"}},
      createdAt: "2023-11-01T18:49:34Z",
      lineItems: [
        {
          title: "The 50 Greatest Business Success Stories",
          quantity: 1,
          variant: {
            price: "17.99",
            product: {
              handle:
                "snapshots-of-success-the-50-greatest-business-success-stories",
            },
            inventoryItem: {unitCost: {amount: "6.73"}},
          },
        },
      ],
      revenue: 22.93,
      profit: 11.26,
      shippingPrice: 4.94,
      order: {
        id: "gid://shopify/Order/5505573323068",
        name: "#1050",
        email: "alexanderwagner211@gmail.com",
        customer: {firstName: "Kathleen", lastName: "Klotz"},
        totalPriceSet: {shopMoney: {amount: "22.93", currencyCode: "USD"}},
        totalShippingPriceSet: {
          shopMoney: {amount: "4.94", currencyCode: "USD"},
        },
        createdAt: "2023-11-01T18:49:34Z",
        lineItems: [
          {
            title: "The 50 Greatest Business Success Stories",
            quantity: 1,
            variant: {
              price: "17.99",
              product: {
                handle:
                  "snapshots-of-success-the-50-greatest-business-success-stories",
              },
              inventoryItem: {unitCost: {amount: "6.73"}},
            },
            __parentId: "gid://shopify/Order/5505573323068",
          },
        ],
      },
    },
    {
      id: "gid://shopify/Order/5504542605628",
      name: "#1049",
      email: "yitzy30@gmail.com",
      customer: {firstName: "isak", lastName: "stern"},
      totalPriceSet: {shopMoney: {amount: "22.93", currencyCode: "USD"}},
      totalShippingPriceSet: {shopMoney: {amount: "4.94", currencyCode: "USD"}},
      createdAt: "2023-10-31T18:39:51Z",
      lineItems: [
        {
          title: "The 50 Greatest Business Success Stories",
          quantity: 1,
          variant: {
            price: "17.99",
            product: {
              handle:
                "snapshots-of-success-the-50-greatest-business-success-stories",
            },
            inventoryItem: {unitCost: {amount: "6.73"}},
          },
        },
      ],
      revenue: 22.93,
      profit: 11.26,
      shippingPrice: 4.94,
      order: {
        id: "gid://shopify/Order/5504542605628",
        name: "#1049",
        email: "yitzy30@gmail.com",
        customer: {firstName: "isak", lastName: "stern"},
        totalPriceSet: {shopMoney: {amount: "22.93", currencyCode: "USD"}},
        totalShippingPriceSet: {
          shopMoney: {amount: "4.94", currencyCode: "USD"},
        },
        createdAt: "2023-10-31T18:39:51Z",
        lineItems: [
          {
            title: "The 50 Greatest Business Success Stories",
            quantity: 1,
            variant: {
              price: "17.99",
              product: {
                handle:
                  "snapshots-of-success-the-50-greatest-business-success-stories",
              },
              inventoryItem: {unitCost: {amount: "6.73"}},
            },
            __parentId: "gid://shopify/Order/5504542605628",
          },
        ],
      },
    },
    {
      id: "gid://shopify/Order/5504272892220",
      name: "#1048",
      email: "jefftingey@hotmail.com",
      customer: {firstName: "Jefferson", lastName: "Tingey"},
      totalPriceSet: {shopMoney: {amount: "32.93", currencyCode: "USD"}},
      totalShippingPriceSet: {shopMoney: {amount: "4.94", currencyCode: "USD"}},
      createdAt: "2023-10-31T13:39:12Z",
      lineItems: [
        {
          title: "The 50 Greatest Business Success Stories",
          quantity: 1,
          variant: {
            price: "27.99",
            product: {
              handle:
                "snapshots-of-success-the-50-greatest-business-success-stories",
            },
            inventoryItem: {unitCost: {amount: "16.28"}},
          },
        },
      ],
      revenue: 32.93,
      profit: 11.71,
      shippingPrice: 4.94,
      order: {
        id: "gid://shopify/Order/5504272892220",
        name: "#1048",
        email: "jefftingey@hotmail.com",
        customer: {firstName: "Jefferson", lastName: "Tingey"},
        totalPriceSet: {shopMoney: {amount: "32.93", currencyCode: "USD"}},
        totalShippingPriceSet: {
          shopMoney: {amount: "4.94", currencyCode: "USD"},
        },
        createdAt: "2023-10-31T13:39:12Z",
        lineItems: [
          {
            title: "The 50 Greatest Business Success Stories",
            quantity: 1,
            variant: {
              price: "27.99",
              product: {
                handle:
                  "snapshots-of-success-the-50-greatest-business-success-stories",
              },
              inventoryItem: {unitCost: {amount: "16.28"}},
            },
            __parentId: "gid://shopify/Order/5504272892220",
          },
        ],
      },
    },
    {
      id: "gid://shopify/Order/5502823268668",
      name: "#1047",
      email: "eduardocasares@gmail.com",
      customer: {firstName: "Eduardo", lastName: "Casares"},
      totalPriceSet: {shopMoney: {amount: "4.99", currencyCode: "USD"}},
      totalShippingPriceSet: {shopMoney: {amount: "0.0", currencyCode: "USD"}},
      createdAt: "2023-10-30T05:12:53Z",
      lineItems: [
        {
          title: "The 50 Greatest Business Success Stories",
          quantity: 1,
          variant: {
            price: "4.99",
            product: {
              handle:
                "snapshots-of-success-the-50-greatest-business-success-stories",
            },
            inventoryItem: {unitCost: {amount: "0.0"}},
          },
        },
      ],
      revenue: 4.99,
      profit: 4.99,
      shippingPrice: 0,
      order: {
        id: "gid://shopify/Order/5502823268668",
        name: "#1047",
        email: "eduardocasares@gmail.com",
        customer: {firstName: "Eduardo", lastName: "Casares"},
        totalPriceSet: {shopMoney: {amount: "4.99", currencyCode: "USD"}},
        totalShippingPriceSet: {
          shopMoney: {amount: "0.0", currencyCode: "USD"},
        },
        createdAt: "2023-10-30T05:12:53Z",
        lineItems: [
          {
            title: "The 50 Greatest Business Success Stories",
            quantity: 1,
            variant: {
              price: "4.99",
              product: {
                handle:
                  "snapshots-of-success-the-50-greatest-business-success-stories",
              },
              inventoryItem: {unitCost: {amount: "0.0"}},
            },
            __parentId: "gid://shopify/Order/5502823268668",
          },
        ],
      },
    },
    {
      id: "gid://shopify/Order/5502581309756",
      name: "#1046",
      email: "mtaylor@litplatforms.io",
      customer: {firstName: "Matthew", lastName: "Taylor"},
      totalPriceSet: {shopMoney: {amount: "4.99", currencyCode: "USD"}},
      totalShippingPriceSet: {shopMoney: {amount: "0.0", currencyCode: "USD"}},
      createdAt: "2023-10-29T21:10:24Z",
      lineItems: [
        {
          title: "The 50 Greatest Business Success Stories",
          quantity: 1,
          variant: {
            price: "4.99",
            product: {
              handle:
                "snapshots-of-success-the-50-greatest-business-success-stories",
            },
            inventoryItem: {unitCost: {amount: "0.0"}},
          },
        },
      ],
      revenue: 4.99,
      profit: 4.99,
      shippingPrice: 0,
      order: {
        id: "gid://shopify/Order/5502581309756",
        name: "#1046",
        email: "mtaylor@litplatforms.io",
        customer: {firstName: "Matthew", lastName: "Taylor"},
        totalPriceSet: {shopMoney: {amount: "4.99", currencyCode: "USD"}},
        totalShippingPriceSet: {
          shopMoney: {amount: "0.0", currencyCode: "USD"},
        },
        createdAt: "2023-10-29T21:10:24Z",
        lineItems: [
          {
            title: "The 50 Greatest Business Success Stories",
            quantity: 1,
            variant: {
              price: "4.99",
              product: {
                handle:
                  "snapshots-of-success-the-50-greatest-business-success-stories",
              },
              inventoryItem: {unitCost: {amount: "0.0"}},
            },
            __parentId: "gid://shopify/Order/5502581309756",
          },
        ],
      },
    },
    {
      id: "gid://shopify/Order/5502471405884",
      name: "#1045",
      email: "nelsonnectoux@gmail.com",
      customer: {firstName: "Nelson", lastName: "Nectoux"},
      totalPriceSet: {shopMoney: {amount: "4.99", currencyCode: "USD"}},
      totalShippingPriceSet: {shopMoney: {amount: "0.0", currencyCode: "USD"}},
      createdAt: "2023-10-29T18:31:53Z",
      lineItems: [
        {
          title: "The 50 Greatest Business Success Stories",
          quantity: 1,
          variant: {
            price: "4.99",
            product: {
              handle:
                "snapshots-of-success-the-50-greatest-business-success-stories",
            },
            inventoryItem: {unitCost: {amount: "0.0"}},
          },
        },
      ],
      revenue: 4.99,
      profit: 4.99,
      shippingPrice: 0,
      order: {
        id: "gid://shopify/Order/5502471405884",
        name: "#1045",
        email: "nelsonnectoux@gmail.com",
        customer: {firstName: "Nelson", lastName: "Nectoux"},
        totalPriceSet: {shopMoney: {amount: "4.99", currencyCode: "USD"}},
        totalShippingPriceSet: {
          shopMoney: {amount: "0.0", currencyCode: "USD"},
        },
        createdAt: "2023-10-29T18:31:53Z",
        lineItems: [
          {
            title: "The 50 Greatest Business Success Stories",
            quantity: 1,
            variant: {
              price: "4.99",
              product: {
                handle:
                  "snapshots-of-success-the-50-greatest-business-success-stories",
              },
              inventoryItem: {unitCost: {amount: "0.0"}},
            },
            __parentId: "gid://shopify/Order/5502471405884",
          },
        ],
      },
    },
    {
      id: "gid://shopify/Order/5502450893116",
      name: "#1044",
      email: "alexanderchillemi@gmail.com",
      customer: {firstName: "Alexander", lastName: "Chillemi"},
      totalPriceSet: {shopMoney: {amount: "22.93", currencyCode: "USD"}},
      totalShippingPriceSet: {shopMoney: {amount: "4.94", currencyCode: "USD"}},
      createdAt: "2023-10-29T18:07:21Z",
      lineItems: [
        {
          title: "The 50 Greatest Business Success Stories",
          quantity: 1,
          variant: {
            price: "17.99",
            product: {
              handle:
                "snapshots-of-success-the-50-greatest-business-success-stories",
            },
            inventoryItem: {unitCost: {amount: "6.73"}},
          },
        },
      ],
      revenue: 22.93,
      profit: 11.26,
      shippingPrice: 4.94,
      order: {
        id: "gid://shopify/Order/5502450893116",
        name: "#1044",
        email: "alexanderchillemi@gmail.com",
        customer: {firstName: "Alexander", lastName: "Chillemi"},
        totalPriceSet: {shopMoney: {amount: "22.93", currencyCode: "USD"}},
        totalShippingPriceSet: {
          shopMoney: {amount: "4.94", currencyCode: "USD"},
        },
        createdAt: "2023-10-29T18:07:21Z",
        lineItems: [
          {
            title: "The 50 Greatest Business Success Stories",
            quantity: 1,
            variant: {
              price: "17.99",
              product: {
                handle:
                  "snapshots-of-success-the-50-greatest-business-success-stories",
              },
              inventoryItem: {unitCost: {amount: "6.73"}},
            },
            __parentId: "gid://shopify/Order/5502450893116",
          },
        ],
      },
    },
    {
      id: "gid://shopify/Order/5502291837244",
      name: "#1043",
      email: "pamela.bowman1142@gmail.com",
      customer: {firstName: "Pamela", lastName: "Bowman"},
      totalPriceSet: {shopMoney: {amount: "22.93", currencyCode: "USD"}},
      totalShippingPriceSet: {shopMoney: {amount: "4.94", currencyCode: "USD"}},
      createdAt: "2023-10-29T14:47:04Z",
      lineItems: [
        {
          title: "The 50 Greatest Business Success Stories",
          quantity: 1,
          variant: {
            price: "17.99",
            product: {
              handle:
                "snapshots-of-success-the-50-greatest-business-success-stories",
            },
            inventoryItem: {unitCost: {amount: "6.73"}},
          },
        },
      ],
      revenue: 22.93,
      profit: 11.26,
      shippingPrice: 4.94,
      order: {
        id: "gid://shopify/Order/5502291837244",
        name: "#1043",
        email: "pamela.bowman1142@gmail.com",
        customer: {firstName: "Pamela", lastName: "Bowman"},
        totalPriceSet: {shopMoney: {amount: "22.93", currencyCode: "USD"}},
        totalShippingPriceSet: {
          shopMoney: {amount: "4.94", currencyCode: "USD"},
        },
        createdAt: "2023-10-29T14:47:04Z",
        lineItems: [
          {
            title: "The 50 Greatest Business Success Stories",
            quantity: 1,
            variant: {
              price: "17.99",
              product: {
                handle:
                  "snapshots-of-success-the-50-greatest-business-success-stories",
              },
              inventoryItem: {unitCost: {amount: "6.73"}},
            },
            __parentId: "gid://shopify/Order/5502291837244",
          },
        ],
      },
    },
    {
      id: "gid://shopify/Order/5502218567996",
      name: "#1042",
      email: "ofobeji@gmail.com",
      customer: {firstName: "Ofoluwa", lastName: "Beji"},
      totalPriceSet: {shopMoney: {amount: "4.99", currencyCode: "USD"}},
      totalShippingPriceSet: {shopMoney: {amount: "0.0", currencyCode: "USD"}},
      createdAt: "2023-10-29T13:09:07Z",
      lineItems: [
        {
          title: "The 50 Greatest Business Success Stories",
          quantity: 1,
          variant: {
            price: "4.99",
            product: {
              handle:
                "snapshots-of-success-the-50-greatest-business-success-stories",
            },
            inventoryItem: {unitCost: {amount: "0.0"}},
          },
        },
      ],
      revenue: 4.99,
      profit: 4.99,
      shippingPrice: 0,
      order: {
        id: "gid://shopify/Order/5502218567996",
        name: "#1042",
        email: "ofobeji@gmail.com",
        customer: {firstName: "Ofoluwa", lastName: "Beji"},
        totalPriceSet: {shopMoney: {amount: "4.99", currencyCode: "USD"}},
        totalShippingPriceSet: {
          shopMoney: {amount: "0.0", currencyCode: "USD"},
        },
        createdAt: "2023-10-29T13:09:07Z",
        lineItems: [
          {
            title: "The 50 Greatest Business Success Stories",
            quantity: 1,
            variant: {
              price: "4.99",
              product: {
                handle:
                  "snapshots-of-success-the-50-greatest-business-success-stories",
              },
              inventoryItem: {unitCost: {amount: "0.0"}},
            },
            __parentId: "gid://shopify/Order/5502218567996",
          },
        ],
      },
    },
    {
      id: "gid://shopify/Order/5502000070972",
      name: "#1041",
      email: "pablomarco.pmc@gmail.com",
      customer: {firstName: "Vidhi", lastName: "A"},
      totalPriceSet: {shopMoney: {amount: "4.99", currencyCode: "USD"}},
      totalShippingPriceSet: {shopMoney: {amount: "0.0", currencyCode: "USD"}},
      createdAt: "2023-10-29T06:50:03Z",
      lineItems: [
        {
          title: "The 50 Greatest Business Success Stories",
          quantity: 1,
          variant: {
            price: "4.99",
            product: {
              handle:
                "snapshots-of-success-the-50-greatest-business-success-stories",
            },
            inventoryItem: {unitCost: {amount: "0.0"}},
          },
        },
      ],
      revenue: 4.99,
      profit: 4.99,
      shippingPrice: 0,
      order: {
        id: "gid://shopify/Order/5502000070972",
        name: "#1041",
        email: "pablomarco.pmc@gmail.com",
        customer: {firstName: "Vidhi", lastName: "A"},
        totalPriceSet: {shopMoney: {amount: "4.99", currencyCode: "USD"}},
        totalShippingPriceSet: {
          shopMoney: {amount: "0.0", currencyCode: "USD"},
        },
        createdAt: "2023-10-29T06:50:03Z",
        lineItems: [
          {
            title: "The 50 Greatest Business Success Stories",
            quantity: 1,
            variant: {
              price: "4.99",
              product: {
                handle:
                  "snapshots-of-success-the-50-greatest-business-success-stories",
              },
              inventoryItem: {unitCost: {amount: "0.0"}},
            },
            __parentId: "gid://shopify/Order/5502000070972",
          },
        ],
      },
    },
    {
      id: "gid://shopify/Order/5501994402108",
      name: "#1040",
      email: "coreymhone35@gmail.com",
      customer: {firstName: "Aubrey", lastName: "Corey Mavuka Junior/LLW21400"},
      totalPriceSet: {shopMoney: {amount: "4.99", currencyCode: "USD"}},
      totalShippingPriceSet: {shopMoney: {amount: "0.0", currencyCode: "USD"}},
      createdAt: "2023-10-29T06:36:25Z",
      lineItems: [
        {
          title: "The 50 Greatest Business Success Stories",
          quantity: 1,
          variant: {
            price: "4.99",
            product: {
              handle:
                "snapshots-of-success-the-50-greatest-business-success-stories",
            },
            inventoryItem: {unitCost: {amount: "0.0"}},
          },
        },
      ],
      revenue: 4.99,
      profit: 4.99,
      shippingPrice: 0,
      order: {
        id: "gid://shopify/Order/5501994402108",
        name: "#1040",
        email: "coreymhone35@gmail.com",
        customer: {
          firstName: "Aubrey",
          lastName: "Corey Mavuka Junior/LLW21400",
        },
        totalPriceSet: {shopMoney: {amount: "4.99", currencyCode: "USD"}},
        totalShippingPriceSet: {
          shopMoney: {amount: "0.0", currencyCode: "USD"},
        },
        createdAt: "2023-10-29T06:36:25Z",
        lineItems: [
          {
            title: "The 50 Greatest Business Success Stories",
            quantity: 1,
            variant: {
              price: "4.99",
              product: {
                handle:
                  "snapshots-of-success-the-50-greatest-business-success-stories",
              },
              inventoryItem: {unitCost: {amount: "0.0"}},
            },
            __parentId: "gid://shopify/Order/5501994402108",
          },
        ],
      },
    },
    {
      id: "gid://shopify/Order/5501911433532",
      name: "#1039",
      email: "cbelerique@gmail.com",
      customer: {firstName: "Chad", lastName: "Belerique"},
      totalPriceSet: {shopMoney: {amount: "4.99", currencyCode: "USD"}},
      totalShippingPriceSet: {shopMoney: {amount: "0.0", currencyCode: "USD"}},
      createdAt: "2023-10-29T03:26:52Z",
      lineItems: [
        {
          title: "The 50 Greatest Business Success Stories",
          quantity: 1,
          variant: {
            price: "4.99",
            product: {
              handle:
                "snapshots-of-success-the-50-greatest-business-success-stories",
            },
            inventoryItem: {unitCost: {amount: "0.0"}},
          },
        },
      ],
      revenue: 4.99,
      profit: 4.99,
      shippingPrice: 0,
      order: {
        id: "gid://shopify/Order/5501911433532",
        name: "#1039",
        email: "cbelerique@gmail.com",
        customer: {firstName: "Chad", lastName: "Belerique"},
        totalPriceSet: {shopMoney: {amount: "4.99", currencyCode: "USD"}},
        totalShippingPriceSet: {
          shopMoney: {amount: "0.0", currencyCode: "USD"},
        },
        createdAt: "2023-10-29T03:26:52Z",
        lineItems: [
          {
            title: "The 50 Greatest Business Success Stories",
            quantity: 1,
            variant: {
              price: "4.99",
              product: {
                handle:
                  "snapshots-of-success-the-50-greatest-business-success-stories",
              },
              inventoryItem: {unitCost: {amount: "0.0"}},
            },
            __parentId: "gid://shopify/Order/5501911433532",
          },
        ],
      },
    },
    {
      id: "gid://shopify/Order/5501214097724",
      name: "#1038",
      email: "mairi.kutberg@gmail.com",
      customer: {firstName: "Mairi", lastName: "Kutberg"},
      totalPriceSet: {shopMoney: {amount: "4.99", currencyCode: "USD"}},
      totalShippingPriceSet: {shopMoney: {amount: "0.0", currencyCode: "USD"}},
      createdAt: "2023-10-28T10:34:06Z",
      lineItems: [
        {
          title: "The 50 Greatest Business Success Stories",
          quantity: 1,
          variant: {
            price: "4.99",
            product: {
              handle:
                "snapshots-of-success-the-50-greatest-business-success-stories",
            },
            inventoryItem: {unitCost: {amount: "0.0"}},
          },
        },
      ],
      revenue: 4.99,
      profit: 4.99,
      shippingPrice: 0,
      order: {
        id: "gid://shopify/Order/5501214097724",
        name: "#1038",
        email: "mairi.kutberg@gmail.com",
        customer: {firstName: "Mairi", lastName: "Kutberg"},
        totalPriceSet: {shopMoney: {amount: "4.99", currencyCode: "USD"}},
        totalShippingPriceSet: {
          shopMoney: {amount: "0.0", currencyCode: "USD"},
        },
        createdAt: "2023-10-28T10:34:06Z",
        lineItems: [
          {
            title: "The 50 Greatest Business Success Stories",
            quantity: 1,
            variant: {
              price: "4.99",
              product: {
                handle:
                  "snapshots-of-success-the-50-greatest-business-success-stories",
              },
              inventoryItem: {unitCost: {amount: "0.0"}},
            },
            __parentId: "gid://shopify/Order/5501214097724",
          },
        ],
      },
    },
    {
      id: "gid://shopify/Order/5500892184892",
      name: "#1037",
      email: "tejastc@outlook.com",
      customer: {firstName: "Tejas", lastName: "Chakrapani"},
      totalPriceSet: {shopMoney: {amount: "22.93", currencyCode: "USD"}},
      totalShippingPriceSet: {shopMoney: {amount: "4.94", currencyCode: "USD"}},
      createdAt: "2023-10-27T23:21:00Z",
      lineItems: [
        {
          title: "The 50 Greatest Business Success Stories",
          quantity: 1,
          variant: {
            price: "17.99",
            product: {
              handle:
                "snapshots-of-success-the-50-greatest-business-success-stories",
            },
            inventoryItem: {unitCost: {amount: "6.73"}},
          },
        },
      ],
      revenue: 22.93,
      profit: 11.26,
      shippingPrice: 4.94,
      order: {
        id: "gid://shopify/Order/5500892184892",
        name: "#1037",
        email: "tejastc@outlook.com",
        customer: {firstName: "Tejas", lastName: "Chakrapani"},
        totalPriceSet: {shopMoney: {amount: "22.93", currencyCode: "USD"}},
        totalShippingPriceSet: {
          shopMoney: {amount: "4.94", currencyCode: "USD"},
        },
        createdAt: "2023-10-27T23:21:00Z",
        lineItems: [
          {
            title: "The 50 Greatest Business Success Stories",
            quantity: 1,
            variant: {
              price: "17.99",
              product: {
                handle:
                  "snapshots-of-success-the-50-greatest-business-success-stories",
              },
              inventoryItem: {unitCost: {amount: "6.73"}},
            },
            __parentId: "gid://shopify/Order/5500892184892",
          },
        ],
      },
    },
    {
      id: "gid://shopify/Order/5500336701756",
      name: "#1036",
      email: "engelbert.john@gmail.com",
      customer: {firstName: "John", lastName: "Engelbert"},
      totalPriceSet: {shopMoney: {amount: "4.99", currencyCode: "USD"}},
      totalShippingPriceSet: {shopMoney: {amount: "0.0", currencyCode: "USD"}},
      createdAt: "2023-10-27T11:58:01Z",
      lineItems: [
        {
          title: "The 50 Greatest Business Success Stories",
          quantity: 1,
          variant: {
            price: "4.99",
            product: {
              handle:
                "snapshots-of-success-the-50-greatest-business-success-stories",
            },
            inventoryItem: {unitCost: {amount: "0.0"}},
          },
        },
      ],
      revenue: 4.99,
      profit: 4.99,
      shippingPrice: 0,
      order: {
        id: "gid://shopify/Order/5500336701756",
        name: "#1036",
        email: "engelbert.john@gmail.com",
        customer: {firstName: "John", lastName: "Engelbert"},
        totalPriceSet: {shopMoney: {amount: "4.99", currencyCode: "USD"}},
        totalShippingPriceSet: {
          shopMoney: {amount: "0.0", currencyCode: "USD"},
        },
        createdAt: "2023-10-27T11:58:01Z",
        lineItems: [
          {
            title: "The 50 Greatest Business Success Stories",
            quantity: 1,
            variant: {
              price: "4.99",
              product: {
                handle:
                  "snapshots-of-success-the-50-greatest-business-success-stories",
              },
              inventoryItem: {unitCost: {amount: "0.0"}},
            },
            __parentId: "gid://shopify/Order/5500336701756",
          },
        ],
      },
    },
    {
      id: "gid://shopify/Order/5499933720892",
      name: "#1035",
      email: "finnsells@gmail.com",
      customer: {firstName: "Matthew", lastName: "Finneran"},
      totalPriceSet: {shopMoney: {amount: "4.99", currencyCode: "USD"}},
      totalShippingPriceSet: {shopMoney: {amount: "0.0", currencyCode: "USD"}},
      createdAt: "2023-10-27T00:12:38Z",
      lineItems: [
        {
          title: "The 50 Greatest Business Success Stories",
          quantity: 1,
          variant: {
            price: "4.99",
            product: {
              handle:
                "snapshots-of-success-the-50-greatest-business-success-stories",
            },
            inventoryItem: {unitCost: {amount: "0.0"}},
          },
        },
      ],
      revenue: 4.99,
      profit: 4.99,
      shippingPrice: 0,
      order: {
        id: "gid://shopify/Order/5499933720892",
        name: "#1035",
        email: "finnsells@gmail.com",
        customer: {firstName: "Matthew", lastName: "Finneran"},
        totalPriceSet: {shopMoney: {amount: "4.99", currencyCode: "USD"}},
        totalShippingPriceSet: {
          shopMoney: {amount: "0.0", currencyCode: "USD"},
        },
        createdAt: "2023-10-27T00:12:38Z",
        lineItems: [
          {
            title: "The 50 Greatest Business Success Stories",
            quantity: 1,
            variant: {
              price: "4.99",
              product: {
                handle:
                  "snapshots-of-success-the-50-greatest-business-success-stories",
              },
              inventoryItem: {unitCost: {amount: "0.0"}},
            },
            __parentId: "gid://shopify/Order/5499933720892",
          },
        ],
      },
    },
    {
      id: "gid://shopify/Order/5499748876604",
      name: "#1034",
      email: "tolu913@gmail.com",
      customer: {firstName: "Omofolahanmi", lastName: "Owoyemi"},
      totalPriceSet: {shopMoney: {amount: "4.99", currencyCode: "USD"}},
      totalShippingPriceSet: {shopMoney: {amount: "0.0", currencyCode: "USD"}},
      createdAt: "2023-10-26T19:14:56Z",
      lineItems: [
        {
          title: "The 50 Greatest Business Success Stories",
          quantity: 1,
          variant: {
            price: "4.99",
            product: {
              handle:
                "snapshots-of-success-the-50-greatest-business-success-stories",
            },
            inventoryItem: {unitCost: {amount: "0.0"}},
          },
        },
      ],
      revenue: 4.99,
      profit: 4.99,
      shippingPrice: 0,
      order: {
        id: "gid://shopify/Order/5499748876604",
        name: "#1034",
        email: "tolu913@gmail.com",
        customer: {firstName: "Omofolahanmi", lastName: "Owoyemi"},
        totalPriceSet: {shopMoney: {amount: "4.99", currencyCode: "USD"}},
        totalShippingPriceSet: {
          shopMoney: {amount: "0.0", currencyCode: "USD"},
        },
        createdAt: "2023-10-26T19:14:56Z",
        lineItems: [
          {
            title: "The 50 Greatest Business Success Stories",
            quantity: 1,
            variant: {
              price: "4.99",
              product: {
                handle:
                  "snapshots-of-success-the-50-greatest-business-success-stories",
              },
              inventoryItem: {unitCost: {amount: "0.0"}},
            },
            __parentId: "gid://shopify/Order/5499748876604",
          },
        ],
      },
    },
    {
      id: "gid://shopify/Order/5499233927484",
      name: "#1033",
      email: "sserikzhan@gmail.com",
      customer: {firstName: "Серікжан", lastName: "Seitov"},
      totalPriceSet: {shopMoney: {amount: "4.99", currencyCode: "USD"}},
      totalShippingPriceSet: {shopMoney: {amount: "0.0", currencyCode: "USD"}},
      createdAt: "2023-10-26T05:51:17Z",
      lineItems: [
        {
          title: "The 50 Greatest Business Success Stories",
          quantity: 1,
          variant: {
            price: "4.99",
            product: {
              handle:
                "snapshots-of-success-the-50-greatest-business-success-stories",
            },
            inventoryItem: {unitCost: {amount: "0.0"}},
          },
        },
      ],
      revenue: 4.99,
      profit: 4.99,
      shippingPrice: 0,
      order: {
        id: "gid://shopify/Order/5499233927484",
        name: "#1033",
        email: "sserikzhan@gmail.com",
        customer: {firstName: "Серікжан", lastName: "Seitov"},
        totalPriceSet: {shopMoney: {amount: "4.99", currencyCode: "USD"}},
        totalShippingPriceSet: {
          shopMoney: {amount: "0.0", currencyCode: "USD"},
        },
        createdAt: "2023-10-26T05:51:17Z",
        lineItems: [
          {
            title: "The 50 Greatest Business Success Stories",
            quantity: 1,
            variant: {
              price: "4.99",
              product: {
                handle:
                  "snapshots-of-success-the-50-greatest-business-success-stories",
              },
              inventoryItem: {unitCost: {amount: "0.0"}},
            },
            __parentId: "gid://shopify/Order/5499233927484",
          },
        ],
      },
    },
    {
      id: "gid://shopify/Order/5497691504956",
      name: "#1032",
      email: "sterling.macdonell@gmail.com",
      customer: {firstName: "Sterling", lastName: "Macdonell"},
      totalPriceSet: {shopMoney: {amount: "4.99", currencyCode: "USD"}},
      totalShippingPriceSet: {shopMoney: {amount: "0.0", currencyCode: "USD"}},
      createdAt: "2023-10-25T19:10:13Z",
      lineItems: [
        {
          title: "The 50 Greatest Business Success Stories",
          quantity: 1,
          variant: {
            price: "4.99",
            product: {
              handle:
                "snapshots-of-success-the-50-greatest-business-success-stories",
            },
            inventoryItem: {unitCost: {amount: "0.0"}},
          },
        },
      ],
      revenue: 4.99,
      profit: 4.99,
      shippingPrice: 0,
      order: {
        id: "gid://shopify/Order/5497691504956",
        name: "#1032",
        email: "sterling.macdonell@gmail.com",
        customer: {firstName: "Sterling", lastName: "Macdonell"},
        totalPriceSet: {shopMoney: {amount: "4.99", currencyCode: "USD"}},
        totalShippingPriceSet: {
          shopMoney: {amount: "0.0", currencyCode: "USD"},
        },
        createdAt: "2023-10-25T19:10:13Z",
        lineItems: [
          {
            title: "The 50 Greatest Business Success Stories",
            quantity: 1,
            variant: {
              price: "4.99",
              product: {
                handle:
                  "snapshots-of-success-the-50-greatest-business-success-stories",
              },
              inventoryItem: {unitCost: {amount: "0.0"}},
            },
            __parentId: "gid://shopify/Order/5497691504956",
          },
        ],
      },
    },
    {
      id: "gid://shopify/Order/5497455968572",
      name: "#1031",
      email: "ajibadewale1@gmail.com",
      customer: {firstName: "Wale", lastName: "Ajibade"},
      totalPriceSet: {shopMoney: {amount: "4.99", currencyCode: "USD"}},
      totalShippingPriceSet: {shopMoney: {amount: "0.0", currencyCode: "USD"}},
      createdAt: "2023-10-25T14:28:10Z",
      lineItems: [
        {
          title: "The 50 Greatest Business Success Stories",
          quantity: 1,
          variant: {
            price: "4.99",
            product: {
              handle:
                "snapshots-of-success-the-50-greatest-business-success-stories",
            },
            inventoryItem: {unitCost: {amount: "0.0"}},
          },
        },
      ],
      revenue: 4.99,
      profit: 4.99,
      shippingPrice: 0,
      order: {
        id: "gid://shopify/Order/5497455968572",
        name: "#1031",
        email: "ajibadewale1@gmail.com",
        customer: {firstName: "Wale", lastName: "Ajibade"},
        totalPriceSet: {shopMoney: {amount: "4.99", currencyCode: "USD"}},
        totalShippingPriceSet: {
          shopMoney: {amount: "0.0", currencyCode: "USD"},
        },
        createdAt: "2023-10-25T14:28:10Z",
        lineItems: [
          {
            title: "The 50 Greatest Business Success Stories",
            quantity: 1,
            variant: {
              price: "4.99",
              product: {
                handle:
                  "snapshots-of-success-the-50-greatest-business-success-stories",
              },
              inventoryItem: {unitCost: {amount: "0.0"}},
            },
            __parentId: "gid://shopify/Order/5497455968572",
          },
        ],
      },
    },
    {
      id: "gid://shopify/Order/5497211846972",
      name: "#1030",
      email: "almuhaidebnoor@gmail.com",
      customer: {firstName: "Noor", lastName: "Al Muhaideb"},
      totalPriceSet: {shopMoney: {amount: "4.99", currencyCode: "USD"}},
      totalShippingPriceSet: {shopMoney: {amount: "0.0", currencyCode: "USD"}},
      createdAt: "2023-10-25T06:59:05Z",
      lineItems: [
        {
          title: "The 50 Greatest Business Success Stories",
          quantity: 1,
          variant: {
            price: "4.99",
            product: {
              handle:
                "snapshots-of-success-the-50-greatest-business-success-stories",
            },
            inventoryItem: {unitCost: {amount: "0.0"}},
          },
        },
      ],
      revenue: 4.99,
      profit: 4.99,
      shippingPrice: 0,
      order: {
        id: "gid://shopify/Order/5497211846972",
        name: "#1030",
        email: "almuhaidebnoor@gmail.com",
        customer: {firstName: "Noor", lastName: "Al Muhaideb"},
        totalPriceSet: {shopMoney: {amount: "4.99", currencyCode: "USD"}},
        totalShippingPriceSet: {
          shopMoney: {amount: "0.0", currencyCode: "USD"},
        },
        createdAt: "2023-10-25T06:59:05Z",
        lineItems: [
          {
            title: "The 50 Greatest Business Success Stories",
            quantity: 1,
            variant: {
              price: "4.99",
              product: {
                handle:
                  "snapshots-of-success-the-50-greatest-business-success-stories",
              },
              inventoryItem: {unitCost: {amount: "0.0"}},
            },
            __parentId: "gid://shopify/Order/5497211846972",
          },
        ],
      },
    },
    {
      id: "gid://shopify/Order/5497161810236",
      name: "#1029",
      email: "erick.kagere@gmail.com",
      customer: {firstName: "Erick", lastName: "Kagere"},
      totalPriceSet: {shopMoney: {amount: "9.98", currencyCode: "USD"}},
      totalShippingPriceSet: {shopMoney: {amount: "0.0", currencyCode: "USD"}},
      createdAt: "2023-10-25T05:25:00Z",
      lineItems: [
        {
          title: "The 50 Greatest Business Success Stories",
          quantity: 2,
          variant: {
            price: "4.99",
            product: {
              handle:
                "snapshots-of-success-the-50-greatest-business-success-stories",
            },
            inventoryItem: {unitCost: {amount: "0.0"}},
          },
        },
      ],
      revenue: 9.98,
      profit: 9.98,
      shippingPrice: 0,
      order: {
        id: "gid://shopify/Order/5497161810236",
        name: "#1029",
        email: "erick.kagere@gmail.com",
        customer: {firstName: "Erick", lastName: "Kagere"},
        totalPriceSet: {shopMoney: {amount: "9.98", currencyCode: "USD"}},
        totalShippingPriceSet: {
          shopMoney: {amount: "0.0", currencyCode: "USD"},
        },
        createdAt: "2023-10-25T05:25:00Z",
        lineItems: [
          {
            title: "The 50 Greatest Business Success Stories",
            quantity: 2,
            variant: {
              price: "4.99",
              product: {
                handle:
                  "snapshots-of-success-the-50-greatest-business-success-stories",
              },
              inventoryItem: {unitCost: {amount: "0.0"}},
            },
            __parentId: "gid://shopify/Order/5497161810236",
          },
        ],
      },
    },
    {
      id: "gid://shopify/Order/5497103876412",
      name: "#1028",
      email: "nazihahzaib@yahoo.com",
      customer: {firstName: "Datin Nazihah", lastName: "Zaib"},
      totalPriceSet: {shopMoney: {amount: "19.96", currencyCode: "USD"}},
      totalShippingPriceSet: {shopMoney: {amount: "0.0", currencyCode: "USD"}},
      createdAt: "2023-10-25T04:01:43Z",
      lineItems: [
        {
          title: "The 50 Greatest Business Success Stories",
          quantity: 4,
          variant: {
            price: "4.99",
            product: {
              handle:
                "snapshots-of-success-the-50-greatest-business-success-stories",
            },
            inventoryItem: {unitCost: {amount: "0.0"}},
          },
        },
      ],
      revenue: 19.96,
      profit: 19.96,
      shippingPrice: 0,
      order: {
        id: "gid://shopify/Order/5497103876412",
        name: "#1028",
        email: "nazihahzaib@yahoo.com",
        customer: {firstName: "Datin Nazihah", lastName: "Zaib"},
        totalPriceSet: {shopMoney: {amount: "19.96", currencyCode: "USD"}},
        totalShippingPriceSet: {
          shopMoney: {amount: "0.0", currencyCode: "USD"},
        },
        createdAt: "2023-10-25T04:01:43Z",
        lineItems: [
          {
            title: "The 50 Greatest Business Success Stories",
            quantity: 4,
            variant: {
              price: "4.99",
              product: {
                handle:
                  "snapshots-of-success-the-50-greatest-business-success-stories",
              },
              inventoryItem: {unitCost: {amount: "0.0"}},
            },
            __parentId: "gid://shopify/Order/5497103876412",
          },
        ],
      },
    },
    {
      id: "gid://shopify/Order/5497032769852",
      name: "#1027",
      email: "infuscius@live.com",
      customer: {firstName: "Steeve", lastName: "Joseph"},
      totalPriceSet: {shopMoney: {amount: "4.99", currencyCode: "USD"}},
      totalShippingPriceSet: {shopMoney: {amount: "0.0", currencyCode: "USD"}},
      createdAt: "2023-10-25T01:50:12Z",
      lineItems: [
        {
          title: "The 50 Greatest Business Success Stories",
          quantity: 1,
          variant: {
            price: "4.99",
            product: {
              handle:
                "snapshots-of-success-the-50-greatest-business-success-stories",
            },
            inventoryItem: {unitCost: {amount: "0.0"}},
          },
        },
      ],
      revenue: 4.99,
      profit: 4.99,
      shippingPrice: 0,
      order: {
        id: "gid://shopify/Order/5497032769852",
        name: "#1027",
        email: "infuscius@live.com",
        customer: {firstName: "Steeve", lastName: "Joseph"},
        totalPriceSet: {shopMoney: {amount: "4.99", currencyCode: "USD"}},
        totalShippingPriceSet: {
          shopMoney: {amount: "0.0", currencyCode: "USD"},
        },
        createdAt: "2023-10-25T01:50:12Z",
        lineItems: [
          {
            title: "The 50 Greatest Business Success Stories",
            quantity: 1,
            variant: {
              price: "4.99",
              product: {
                handle:
                  "snapshots-of-success-the-50-greatest-business-success-stories",
              },
              inventoryItem: {unitCost: {amount: "0.0"}},
            },
            __parentId: "gid://shopify/Order/5497032769852",
          },
        ],
      },
    },
    {
      id: "gid://shopify/Order/5497010749756",
      name: "#1026",
      email: "lashonjames22@icloud.com",
      customer: {firstName: "Lashon", lastName: "James"},
      totalPriceSet: {shopMoney: {amount: "4.99", currencyCode: "USD"}},
      totalShippingPriceSet: {shopMoney: {amount: "0.0", currencyCode: "USD"}},
      createdAt: "2023-10-25T01:07:23Z",
      lineItems: [
        {
          title: "The 50 Greatest Business Success Stories",
          quantity: 1,
          variant: {
            price: "4.99",
            product: {
              handle:
                "snapshots-of-success-the-50-greatest-business-success-stories",
            },
            inventoryItem: {unitCost: {amount: "0.0"}},
          },
        },
      ],
      revenue: 4.99,
      profit: 4.99,
      shippingPrice: 0,
      order: {
        id: "gid://shopify/Order/5497010749756",
        name: "#1026",
        email: "lashonjames22@icloud.com",
        customer: {firstName: "Lashon", lastName: "James"},
        totalPriceSet: {shopMoney: {amount: "4.99", currencyCode: "USD"}},
        totalShippingPriceSet: {
          shopMoney: {amount: "0.0", currencyCode: "USD"},
        },
        createdAt: "2023-10-25T01:07:23Z",
        lineItems: [
          {
            title: "The 50 Greatest Business Success Stories",
            quantity: 1,
            variant: {
              price: "4.99",
              product: {
                handle:
                  "snapshots-of-success-the-50-greatest-business-success-stories",
              },
              inventoryItem: {unitCost: {amount: "0.0"}},
            },
            __parentId: "gid://shopify/Order/5497010749756",
          },
        ],
      },
    },
    {
      id: "gid://shopify/Order/5496828166460",
      name: "#1025",
      email: "channingallen@gmail.com",
      customer: {firstName: "Channing", lastName: "Allen"},
      totalPriceSet: {shopMoney: {amount: "4.99", currencyCode: "USD"}},
      totalShippingPriceSet: {shopMoney: {amount: "0.0", currencyCode: "USD"}},
      createdAt: "2023-10-24T19:22:45Z",
      lineItems: [
        {
          title: "The 50 Greatest Business Success Stories",
          quantity: 1,
          variant: {
            price: "4.99",
            product: {
              handle:
                "snapshots-of-success-the-50-greatest-business-success-stories",
            },
            inventoryItem: {unitCost: {amount: "0.0"}},
          },
        },
      ],
      revenue: 4.99,
      profit: 4.99,
      shippingPrice: 0,
      order: {
        id: "gid://shopify/Order/5496828166460",
        name: "#1025",
        email: "channingallen@gmail.com",
        customer: {firstName: "Channing", lastName: "Allen"},
        totalPriceSet: {shopMoney: {amount: "4.99", currencyCode: "USD"}},
        totalShippingPriceSet: {
          shopMoney: {amount: "0.0", currencyCode: "USD"},
        },
        createdAt: "2023-10-24T19:22:45Z",
        lineItems: [
          {
            title: "The 50 Greatest Business Success Stories",
            quantity: 1,
            variant: {
              price: "4.99",
              product: {
                handle:
                  "snapshots-of-success-the-50-greatest-business-success-stories",
              },
              inventoryItem: {unitCost: {amount: "0.0"}},
            },
            __parentId: "gid://shopify/Order/5496828166460",
          },
        ],
      },
    },
    {
      id: "gid://shopify/Order/5496759877948",
      name: "#1024",
      email: "glen@glend.com",
      customer: {firstName: "Glen", lastName: "DiGirolamo"},
      totalPriceSet: {shopMoney: {amount: "22.93", currencyCode: "USD"}},
      totalShippingPriceSet: {shopMoney: {amount: "4.94", currencyCode: "USD"}},
      createdAt: "2023-10-24T17:46:06Z",
      lineItems: [
        {
          title: "The 50 Greatest Business Success Stories",
          quantity: 1,
          variant: {
            price: "17.99",
            product: {
              handle:
                "snapshots-of-success-the-50-greatest-business-success-stories",
            },
            inventoryItem: {unitCost: {amount: "6.73"}},
          },
        },
      ],
      revenue: 22.93,
      profit: 11.26,
      shippingPrice: 4.94,
      order: {
        id: "gid://shopify/Order/5496759877948",
        name: "#1024",
        email: "glen@glend.com",
        customer: {firstName: "Glen", lastName: "DiGirolamo"},
        totalPriceSet: {shopMoney: {amount: "22.93", currencyCode: "USD"}},
        totalShippingPriceSet: {
          shopMoney: {amount: "4.94", currencyCode: "USD"},
        },
        createdAt: "2023-10-24T17:46:06Z",
        lineItems: [
          {
            title: "The 50 Greatest Business Success Stories",
            quantity: 1,
            variant: {
              price: "17.99",
              product: {
                handle:
                  "snapshots-of-success-the-50-greatest-business-success-stories",
              },
              inventoryItem: {unitCost: {amount: "6.73"}},
            },
            __parentId: "gid://shopify/Order/5496759877948",
          },
        ],
      },
    },
    {
      id: "gid://shopify/Order/5496409817404",
      name: "#1020",
      email: "greg@theoaksgourmet.com",
      customer: {firstName: "Greg", lastName: "Morris"},
      totalPriceSet: {shopMoney: {amount: "22.93", currencyCode: "USD"}},
      totalShippingPriceSet: {shopMoney: {amount: "4.94", currencyCode: "USD"}},
      createdAt: "2023-10-24T09:04:36Z",
      lineItems: [
        {
          title: "The 50 Greatest Business Success Stories",
          quantity: 1,
          variant: {
            price: "17.99",
            product: {
              handle:
                "snapshots-of-success-the-50-greatest-business-success-stories",
            },
            inventoryItem: {unitCost: {amount: "6.73"}},
          },
        },
      ],
      revenue: 22.93,
      profit: 11.26,
      shippingPrice: 4.94,
      order: {
        id: "gid://shopify/Order/5496409817404",
        name: "#1020",
        email: "greg@theoaksgourmet.com",
        customer: {firstName: "Greg", lastName: "Morris"},
        totalPriceSet: {shopMoney: {amount: "22.93", currencyCode: "USD"}},
        totalShippingPriceSet: {
          shopMoney: {amount: "4.94", currencyCode: "USD"},
        },
        createdAt: "2023-10-24T09:04:36Z",
        lineItems: [
          {
            title: "The 50 Greatest Business Success Stories",
            quantity: 1,
            variant: {
              price: "17.99",
              product: {
                handle:
                  "snapshots-of-success-the-50-greatest-business-success-stories",
              },
              inventoryItem: {unitCost: {amount: "6.73"}},
            },
            __parentId: "gid://shopify/Order/5496409817404",
          },
        ],
      },
    },
    {
      id: "gid://shopify/Order/5494301491516",
      name: "#1018",
      email: "freshprinceatl2@yahoo.com",
      customer: {firstName: "marquis", lastName: "wilbourn"},
      totalPriceSet: {shopMoney: {amount: "22.93", currencyCode: "USD"}},
      totalShippingPriceSet: {shopMoney: {amount: "4.94", currencyCode: "USD"}},
      createdAt: "2023-10-21T15:25:34Z",
      lineItems: [
        {
          title: "The 50 Greatest Business Success Stories",
          quantity: 1,
          variant: {
            price: "17.99",
            product: {
              handle:
                "snapshots-of-success-the-50-greatest-business-success-stories",
            },
            inventoryItem: {unitCost: {amount: "6.73"}},
          },
        },
      ],
      revenue: 22.93,
      profit: 11.26,
      shippingPrice: 4.94,
      order: {
        id: "gid://shopify/Order/5494301491516",
        name: "#1018",
        email: "freshprinceatl2@yahoo.com",
        customer: {firstName: "marquis", lastName: "wilbourn"},
        totalPriceSet: {shopMoney: {amount: "22.93", currencyCode: "USD"}},
        totalShippingPriceSet: {
          shopMoney: {amount: "4.94", currencyCode: "USD"},
        },
        createdAt: "2023-10-21T15:25:34Z",
        lineItems: [
          {
            title: "The 50 Greatest Business Success Stories",
            quantity: 1,
            variant: {
              price: "17.99",
              product: {
                handle:
                  "snapshots-of-success-the-50-greatest-business-success-stories",
              },
              inventoryItem: {unitCost: {amount: "6.73"}},
            },
            __parentId: "gid://shopify/Order/5494301491516",
          },
        ],
      },
    },
    {
      id: "gid://shopify/Order/5494148694332",
      name: "#1017",
      email: "romanrusev@gmail.com",
      customer: {firstName: "Roman", lastName: "Rusev"},
      totalPriceSet: {shopMoney: {amount: "22.93", currencyCode: "USD"}},
      totalShippingPriceSet: {shopMoney: {amount: "4.94", currencyCode: "USD"}},
      createdAt: "2023-10-21T11:37:48Z",
      lineItems: [
        {
          title: "The 50 Greatest Business Success Stories",
          quantity: 1,
          variant: {
            price: "17.99",
            product: {
              handle:
                "snapshots-of-success-the-50-greatest-business-success-stories",
            },
            inventoryItem: {unitCost: {amount: "6.73"}},
          },
        },
      ],
      revenue: 22.93,
      profit: 11.26,
      shippingPrice: 4.94,
      order: {
        id: "gid://shopify/Order/5494148694332",
        name: "#1017",
        email: "romanrusev@gmail.com",
        customer: {firstName: "Roman", lastName: "Rusev"},
        totalPriceSet: {shopMoney: {amount: "22.93", currencyCode: "USD"}},
        totalShippingPriceSet: {
          shopMoney: {amount: "4.94", currencyCode: "USD"},
        },
        createdAt: "2023-10-21T11:37:48Z",
        lineItems: [
          {
            title: "The 50 Greatest Business Success Stories",
            quantity: 1,
            variant: {
              price: "17.99",
              product: {
                handle:
                  "snapshots-of-success-the-50-greatest-business-success-stories",
              },
              inventoryItem: {unitCost: {amount: "6.73"}},
            },
            __parentId: "gid://shopify/Order/5494148694332",
          },
        ],
      },
    },
    {
      id: "gid://shopify/Order/5494099673404",
      name: "#1016",
      email: "adamsord@icloud.com",
      customer: {firstName: "James", lastName: "Adams"},
      totalPriceSet: {shopMoney: {amount: "22.93", currencyCode: "USD"}},
      totalShippingPriceSet: {shopMoney: {amount: "4.94", currencyCode: "USD"}},
      createdAt: "2023-10-21T10:12:39Z",
      lineItems: [
        {
          title: "The 50 Greatest Business Success Stories",
          quantity: 1,
          variant: {
            price: "17.99",
            product: {
              handle:
                "snapshots-of-success-the-50-greatest-business-success-stories",
            },
            inventoryItem: {unitCost: {amount: "6.73"}},
          },
        },
      ],
      revenue: 22.93,
      profit: 11.26,
      shippingPrice: 4.94,
      order: {
        id: "gid://shopify/Order/5494099673404",
        name: "#1016",
        email: "adamsord@icloud.com",
        customer: {firstName: "James", lastName: "Adams"},
        totalPriceSet: {shopMoney: {amount: "22.93", currencyCode: "USD"}},
        totalShippingPriceSet: {
          shopMoney: {amount: "4.94", currencyCode: "USD"},
        },
        createdAt: "2023-10-21T10:12:39Z",
        lineItems: [
          {
            title: "The 50 Greatest Business Success Stories",
            quantity: 1,
            variant: {
              price: "17.99",
              product: {
                handle:
                  "snapshots-of-success-the-50-greatest-business-success-stories",
              },
              inventoryItem: {unitCost: {amount: "6.73"}},
            },
            __parentId: "gid://shopify/Order/5494099673404",
          },
        ],
      },
    },
    {
      id: "gid://shopify/Order/5494017720636",
      name: "#1015",
      email: "attiehsalman@me.com",
      customer: {firstName: "Salman", lastName: "Attieh"},
      totalPriceSet: {shopMoney: {amount: "52.93", currencyCode: "USD"}},
      totalShippingPriceSet: {
        shopMoney: {amount: "22.94", currencyCode: "USD"},
      },
      createdAt: "2023-10-21T07:14:03Z",
      lineItems: [
        {
          title: "The 50 Greatest Business Success Stories",
          quantity: 1,
          variant: {
            price: "27.99",
            product: {
              handle:
                "snapshots-of-success-the-50-greatest-business-success-stories",
            },
            inventoryItem: {unitCost: {amount: "16.28"}},
          },
        },
      ],
      revenue: 52.93,
      profit: 13.71,
      shippingPrice: 22.94,
      order: {
        id: "gid://shopify/Order/5494017720636",
        name: "#1015",
        email: "attiehsalman@me.com",
        customer: {firstName: "Salman", lastName: "Attieh"},
        totalPriceSet: {shopMoney: {amount: "52.93", currencyCode: "USD"}},
        totalShippingPriceSet: {
          shopMoney: {amount: "22.94", currencyCode: "USD"},
        },
        createdAt: "2023-10-21T07:14:03Z",
        lineItems: [
          {
            title: "The 50 Greatest Business Success Stories",
            quantity: 1,
            variant: {
              price: "27.99",
              product: {
                handle:
                  "snapshots-of-success-the-50-greatest-business-success-stories",
              },
              inventoryItem: {unitCost: {amount: "16.28"}},
            },
            __parentId: "gid://shopify/Order/5494017720636",
          },
        ],
      },
    },
    {
      id: "gid://shopify/Order/5493407023420",
      name: "#1013",
      email: "channingfinance@gmail.com",
      customer: {firstName: "Channing", lastName: "Allen"},
      totalPriceSet: {shopMoney: {amount: "40.93", currencyCode: "USD"}},
      totalShippingPriceSet: {
        shopMoney: {amount: "22.94", currencyCode: "USD"},
      },
      createdAt: "2023-10-20T13:33:26Z",
      lineItems: [
        {
          title: "The 50 Greatest Business Success Stories",
          quantity: 1,
          variant: {
            price: "17.99",
            product: {
              handle:
                "snapshots-of-success-the-50-greatest-business-success-stories",
            },
            inventoryItem: {unitCost: {amount: "6.73"}},
          },
        },
      ],
      revenue: 40.93,
      profit: 11.26,
      shippingPrice: 22.94,
      order: {
        id: "gid://shopify/Order/5493407023420",
        name: "#1013",
        email: "channingfinance@gmail.com",
        customer: {firstName: "Channing", lastName: "Allen"},
        totalPriceSet: {shopMoney: {amount: "40.93", currencyCode: "USD"}},
        totalShippingPriceSet: {
          shopMoney: {amount: "22.94", currencyCode: "USD"},
        },
        createdAt: "2023-10-20T13:33:26Z",
        lineItems: [
          {
            title: "The 50 Greatest Business Success Stories",
            quantity: 1,
            variant: {
              price: "17.99",
              product: {
                handle:
                  "snapshots-of-success-the-50-greatest-business-success-stories",
              },
              inventoryItem: {unitCost: {amount: "6.73"}},
            },
            __parentId: "gid://shopify/Order/5493407023420",
          },
        ],
      },
    },
    {
      id: "gid://shopify/Order/5493366784316",
      name: "#1012",
      email: "sally.ratigan@gmail.com",
      customer: {firstName: "Sally", lastName: "Ratigan"},
      totalPriceSet: {shopMoney: {amount: "22.93", currencyCode: "USD"}},
      totalShippingPriceSet: {shopMoney: {amount: "4.94", currencyCode: "USD"}},
      createdAt: "2023-10-20T12:24:32Z",
      lineItems: [
        {
          title: "The 50 Greatest Business Success Stories",
          quantity: 1,
          variant: {
            price: "17.99",
            product: {
              handle:
                "snapshots-of-success-the-50-greatest-business-success-stories",
            },
            inventoryItem: {unitCost: {amount: "6.73"}},
          },
        },
      ],
      revenue: 22.93,
      profit: 11.26,
      shippingPrice: 4.94,
      order: {
        id: "gid://shopify/Order/5493366784316",
        name: "#1012",
        email: "sally.ratigan@gmail.com",
        customer: {firstName: "Sally", lastName: "Ratigan"},
        totalPriceSet: {shopMoney: {amount: "22.93", currencyCode: "USD"}},
        totalShippingPriceSet: {
          shopMoney: {amount: "4.94", currencyCode: "USD"},
        },
        createdAt: "2023-10-20T12:24:32Z",
        lineItems: [
          {
            title: "The 50 Greatest Business Success Stories",
            quantity: 1,
            variant: {
              price: "17.99",
              product: {
                handle:
                  "snapshots-of-success-the-50-greatest-business-success-stories",
              },
              inventoryItem: {unitCost: {amount: "6.73"}},
            },
            __parentId: "gid://shopify/Order/5493366784316",
          },
        ],
      },
    },
    {
      id: "gid://shopify/Order/5493110702396",
      name: "#1011",
      email: "muftisaeed369@gmail.com",
      customer: {firstName: "Said", lastName: "Mohamed"},
      totalPriceSet: {shopMoney: {amount: "22.93", currencyCode: "USD"}},
      totalShippingPriceSet: {shopMoney: {amount: "4.94", currencyCode: "USD"}},
      createdAt: "2023-10-20T03:07:57Z",
      lineItems: [
        {
          title: "The 50 Greatest Business Success Stories",
          quantity: 1,
          variant: {
            price: "17.99",
            product: {
              handle:
                "snapshots-of-success-the-50-greatest-business-success-stories",
            },
            inventoryItem: {unitCost: {amount: "6.73"}},
          },
        },
      ],
      revenue: 22.93,
      profit: 11.26,
      shippingPrice: 4.94,
      order: {
        id: "gid://shopify/Order/5493110702396",
        name: "#1011",
        email: "muftisaeed369@gmail.com",
        customer: {firstName: "Said", lastName: "Mohamed"},
        totalPriceSet: {shopMoney: {amount: "22.93", currencyCode: "USD"}},
        totalShippingPriceSet: {
          shopMoney: {amount: "4.94", currencyCode: "USD"},
        },
        createdAt: "2023-10-20T03:07:57Z",
        lineItems: [
          {
            title: "The 50 Greatest Business Success Stories",
            quantity: 1,
            variant: {
              price: "17.99",
              product: {
                handle:
                  "snapshots-of-success-the-50-greatest-business-success-stories",
              },
              inventoryItem: {unitCost: {amount: "6.73"}},
            },
            __parentId: "gid://shopify/Order/5493110702396",
          },
        ],
      },
    },
    {
      id: "gid://shopify/Order/5492658536764",
      name: "#1010",
      email: "sunshinedelay@ymail.com",
      customer: {firstName: "Brandon", lastName: "DeLay"},
      totalPriceSet: {shopMoney: {amount: "22.93", currencyCode: "USD"}},
      totalShippingPriceSet: {shopMoney: {amount: "4.94", currencyCode: "USD"}},
      createdAt: "2023-10-19T15:02:12Z",
      lineItems: [
        {
          title: "The 50 Greatest Business Success Stories",
          quantity: 1,
          variant: {
            price: "17.99",
            product: {
              handle:
                "snapshots-of-success-the-50-greatest-business-success-stories",
            },
            inventoryItem: {unitCost: {amount: "6.73"}},
          },
        },
      ],
      revenue: 22.93,
      profit: 11.26,
      shippingPrice: 4.94,
      order: {
        id: "gid://shopify/Order/5492658536764",
        name: "#1010",
        email: "sunshinedelay@ymail.com",
        customer: {firstName: "Brandon", lastName: "DeLay"},
        totalPriceSet: {shopMoney: {amount: "22.93", currencyCode: "USD"}},
        totalShippingPriceSet: {
          shopMoney: {amount: "4.94", currencyCode: "USD"},
        },
        createdAt: "2023-10-19T15:02:12Z",
        lineItems: [
          {
            title: "The 50 Greatest Business Success Stories",
            quantity: 1,
            variant: {
              price: "17.99",
              product: {
                handle:
                  "snapshots-of-success-the-50-greatest-business-success-stories",
              },
              inventoryItem: {unitCost: {amount: "6.73"}},
            },
            __parentId: "gid://shopify/Order/5492658536764",
          },
        ],
      },
    },
    {
      id: "gid://shopify/Order/5492640317756",
      name: "#1009",
      email: "rebecca.ratigan@gmail.com",
      customer: {firstName: "Rebecca", lastName: "Ratigan"},
      totalPriceSet: {shopMoney: {amount: "22.93", currencyCode: "USD"}},
      totalShippingPriceSet: {shopMoney: {amount: "4.94", currencyCode: "USD"}},
      createdAt: "2023-10-19T14:35:14Z",
      lineItems: [
        {
          title: "The 50 Greatest Business Success Stories",
          quantity: 1,
          variant: {
            price: "17.99",
            product: {
              handle:
                "snapshots-of-success-the-50-greatest-business-success-stories",
            },
            inventoryItem: {unitCost: {amount: "6.73"}},
          },
        },
      ],
      revenue: 22.93,
      profit: 11.26,
      shippingPrice: 4.94,
      order: {
        id: "gid://shopify/Order/5492640317756",
        name: "#1009",
        email: "rebecca.ratigan@gmail.com",
        customer: {firstName: "Rebecca", lastName: "Ratigan"},
        totalPriceSet: {shopMoney: {amount: "22.93", currencyCode: "USD"}},
        totalShippingPriceSet: {
          shopMoney: {amount: "4.94", currencyCode: "USD"},
        },
        createdAt: "2023-10-19T14:35:14Z",
        lineItems: [
          {
            title: "The 50 Greatest Business Success Stories",
            quantity: 1,
            variant: {
              price: "17.99",
              product: {
                handle:
                  "snapshots-of-success-the-50-greatest-business-success-stories",
              },
              inventoryItem: {unitCost: {amount: "6.73"}},
            },
            __parentId: "gid://shopify/Order/5492640317756",
          },
        ],
      },
    },
    {
      id: "gid://shopify/Order/5492110557500",
      name: "#1006",
      email: "ssmith129@gmail.com",
      customer: {firstName: "Stephanie", lastName: "Smith"},
      totalPriceSet: {shopMoney: {amount: "22.93", currencyCode: "USD"}},
      totalShippingPriceSet: {shopMoney: {amount: "4.94", currencyCode: "USD"}},
      createdAt: "2023-10-18T21:00:22Z",
      lineItems: [
        {
          title: "The 50 Greatest Business Success Stories",
          quantity: 1,
          variant: {
            price: "17.99",
            product: {
              handle:
                "snapshots-of-success-the-50-greatest-business-success-stories",
            },
            inventoryItem: {unitCost: {amount: "6.73"}},
          },
        },
      ],
      revenue: 22.93,
      profit: 11.26,
      shippingPrice: 4.94,
      order: {
        id: "gid://shopify/Order/5492110557500",
        name: "#1006",
        email: "ssmith129@gmail.com",
        customer: {firstName: "Stephanie", lastName: "Smith"},
        totalPriceSet: {shopMoney: {amount: "22.93", currencyCode: "USD"}},
        totalShippingPriceSet: {
          shopMoney: {amount: "4.94", currencyCode: "USD"},
        },
        createdAt: "2023-10-18T21:00:22Z",
        lineItems: [
          {
            title: "The 50 Greatest Business Success Stories",
            quantity: 1,
            variant: {
              price: "17.99",
              product: {
                handle:
                  "snapshots-of-success-the-50-greatest-business-success-stories",
              },
              inventoryItem: {unitCost: {amount: "6.73"}},
            },
            __parentId: "gid://shopify/Order/5492110557500",
          },
        ],
      },
    },
    {
      id: "gid://shopify/Order/5492086866236",
      name: "#1005",
      email: "ktferrari99@gmail.com",
      customer: {firstName: "Kevin", lastName: "Ferrari"},
      totalPriceSet: {shopMoney: {amount: "22.93", currencyCode: "USD"}},
      totalShippingPriceSet: {shopMoney: {amount: "4.94", currencyCode: "USD"}},
      createdAt: "2023-10-18T20:24:12Z",
      lineItems: [
        {
          title: "The 50 Greatest Business Success Stories",
          quantity: 1,
          variant: {
            price: "17.99",
            product: {
              handle:
                "snapshots-of-success-the-50-greatest-business-success-stories",
            },
            inventoryItem: {unitCost: {amount: "6.73"}},
          },
        },
      ],
      revenue: 22.93,
      profit: 11.26,
      shippingPrice: 4.94,
      order: {
        id: "gid://shopify/Order/5492086866236",
        name: "#1005",
        email: "ktferrari99@gmail.com",
        customer: {firstName: "Kevin", lastName: "Ferrari"},
        totalPriceSet: {shopMoney: {amount: "22.93", currencyCode: "USD"}},
        totalShippingPriceSet: {
          shopMoney: {amount: "4.94", currencyCode: "USD"},
        },
        createdAt: "2023-10-18T20:24:12Z",
        lineItems: [
          {
            title: "The 50 Greatest Business Success Stories",
            quantity: 1,
            variant: {
              price: "17.99",
              product: {
                handle:
                  "snapshots-of-success-the-50-greatest-business-success-stories",
              },
              inventoryItem: {unitCost: {amount: "6.73"}},
            },
            __parentId: "gid://shopify/Order/5492086866236",
          },
        ],
      },
    },
    {
      id: "gid://shopify/Order/5492009369916",
      name: "#1004",
      email: "dylanjcolwell29@gmai.com",
      customer: {firstName: "Dylan", lastName: "Colwell"},
      totalPriceSet: {shopMoney: {amount: "22.93", currencyCode: "USD"}},
      totalShippingPriceSet: {shopMoney: {amount: "4.94", currencyCode: "USD"}},
      createdAt: "2023-10-18T18:33:17Z",
      lineItems: [
        {
          title: "The 50 Greatest Business Success Stories",
          quantity: 1,
          variant: {
            price: "17.99",
            product: {
              handle:
                "snapshots-of-success-the-50-greatest-business-success-stories",
            },
            inventoryItem: {unitCost: {amount: "6.73"}},
          },
        },
      ],
      revenue: 22.93,
      profit: 11.26,
      shippingPrice: 4.94,
      order: {
        id: "gid://shopify/Order/5492009369916",
        name: "#1004",
        email: "dylanjcolwell29@gmai.com",
        customer: {firstName: "Dylan", lastName: "Colwell"},
        totalPriceSet: {shopMoney: {amount: "22.93", currencyCode: "USD"}},
        totalShippingPriceSet: {
          shopMoney: {amount: "4.94", currencyCode: "USD"},
        },
        createdAt: "2023-10-18T18:33:17Z",
        lineItems: [
          {
            title: "The 50 Greatest Business Success Stories",
            quantity: 1,
            variant: {
              price: "17.99",
              product: {
                handle:
                  "snapshots-of-success-the-50-greatest-business-success-stories",
              },
              inventoryItem: {unitCost: {amount: "6.73"}},
            },
            __parentId: "gid://shopify/Order/5492009369916",
          },
        ],
      },
    },
    {
      id: "gid://shopify/Order/5491988627772",
      name: "#1003",
      email: "gabischles@gmail.com",
      customer: {firstName: "gabi", lastName: "schles"},
      totalPriceSet: {shopMoney: {amount: "22.93", currencyCode: "USD"}},
      totalShippingPriceSet: {shopMoney: {amount: "4.94", currencyCode: "USD"}},
      createdAt: "2023-10-18T18:01:57Z",
      lineItems: [
        {
          title: "The 50 Greatest Business Success Stories",
          quantity: 1,
          variant: {
            price: "17.99",
            product: {
              handle:
                "snapshots-of-success-the-50-greatest-business-success-stories",
            },
            inventoryItem: {unitCost: {amount: "6.73"}},
          },
        },
      ],
      revenue: 22.93,
      profit: 11.26,
      shippingPrice: 4.94,
      order: {
        id: "gid://shopify/Order/5491988627772",
        name: "#1003",
        email: "gabischles@gmail.com",
        customer: {firstName: "gabi", lastName: "schles"},
        totalPriceSet: {shopMoney: {amount: "22.93", currencyCode: "USD"}},
        totalShippingPriceSet: {
          shopMoney: {amount: "4.94", currencyCode: "USD"},
        },
        createdAt: "2023-10-18T18:01:57Z",
        lineItems: [
          {
            title: "The 50 Greatest Business Success Stories",
            quantity: 1,
            variant: {
              price: "17.99",
              product: {
                handle:
                  "snapshots-of-success-the-50-greatest-business-success-stories",
              },
              inventoryItem: {unitCost: {amount: "6.73"}},
            },
            __parentId: "gid://shopify/Order/5491988627772",
          },
        ],
      },
    },
    {
      id: "gid://shopify/Order/5491983843644",
      name: "#1002",
      email: "gabischles@gmail.com",
      customer: {firstName: "gabi", lastName: "schles"},
      totalPriceSet: {shopMoney: {amount: "22.93", currencyCode: "USD"}},
      totalShippingPriceSet: {shopMoney: {amount: "4.94", currencyCode: "USD"}},
      createdAt: "2023-10-18T17:55:37Z",
      lineItems: [
        {
          title: "The 50 Greatest Business Success Stories",
          quantity: 1,
          variant: {
            price: "17.99",
            product: {
              handle:
                "snapshots-of-success-the-50-greatest-business-success-stories",
            },
            inventoryItem: {unitCost: {amount: "6.73"}},
          },
        },
      ],
      revenue: 22.93,
      profit: 11.26,
      shippingPrice: 4.94,
      order: {
        id: "gid://shopify/Order/5491983843644",
        name: "#1002",
        email: "gabischles@gmail.com",
        customer: {firstName: "gabi", lastName: "schles"},
        totalPriceSet: {shopMoney: {amount: "22.93", currencyCode: "USD"}},
        totalShippingPriceSet: {
          shopMoney: {amount: "4.94", currencyCode: "USD"},
        },
        createdAt: "2023-10-18T17:55:37Z",
        lineItems: [
          {
            title: "The 50 Greatest Business Success Stories",
            quantity: 1,
            variant: {
              price: "17.99",
              product: {
                handle:
                  "snapshots-of-success-the-50-greatest-business-success-stories",
              },
              inventoryItem: {unitCost: {amount: "6.73"}},
            },
            __parentId: "gid://shopify/Order/5491983843644",
          },
        ],
      },
    },
    {
      id: "gid://shopify/Order/5491982434620",
      name: "#1001",
      email: "ferrari.bman@gmail.com",
      customer: {firstName: "Brian", lastName: "Ferrari"},
      totalPriceSet: {shopMoney: {amount: "22.93", currencyCode: "USD"}},
      totalShippingPriceSet: {shopMoney: {amount: "4.94", currencyCode: "USD"}},
      createdAt: "2023-10-18T17:53:40Z",
      lineItems: [
        {
          title: "The 50 Greatest Business Success Stories",
          quantity: 1,
          variant: {
            price: "17.99",
            product: {
              handle:
                "snapshots-of-success-the-50-greatest-business-success-stories",
            },
            inventoryItem: {unitCost: {amount: "6.73"}},
          },
        },
      ],
      revenue: 22.93,
      profit: 11.26,
      shippingPrice: 4.94,
      order: {
        id: "gid://shopify/Order/5491982434620",
        name: "#1001",
        email: "ferrari.bman@gmail.com",
        customer: {firstName: "Brian", lastName: "Ferrari"},
        totalPriceSet: {shopMoney: {amount: "22.93", currencyCode: "USD"}},
        totalShippingPriceSet: {
          shopMoney: {amount: "4.94", currencyCode: "USD"},
        },
        createdAt: "2023-10-18T17:53:40Z",
        lineItems: [
          {
            title: "The 50 Greatest Business Success Stories",
            quantity: 1,
            variant: {
              price: "17.99",
              product: {
                handle:
                  "snapshots-of-success-the-50-greatest-business-success-stories",
              },
              inventoryItem: {unitCost: {amount: "6.73"}},
            },
            __parentId: "gid://shopify/Order/5491982434620",
          },
        ],
      },
    },
  ],
};
