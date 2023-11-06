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
  const salesDataRes = await fetch(
    `${siteConfig.url}/api/admin/shopify/sales-data`,
    {
      cache: "no-cache",
    }
  );

  if (!salesDataRes.ok) {
    throw new Error("Failed to fetch sales data");
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

  // Using Dummy Data
  useEffect(() => {
    async function getData() {
      try {
        const salesDataRes = await fetchData();
        setData(salesDataRes);
        setLoading(false);
      } catch (error) {
        console.error("Error:", error);
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

const DummyData = [
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
    totalShippingPriceSet: {shopMoney: {amount: "22.94", currencyCode: "USD"}},
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
    totalShippingPriceSet: {shopMoney: {amount: "22.94", currencyCode: "USD"}},
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
          __parentId: "gid://shopify/Order/5491982434620",
        },
      ],
    },
  },
];
