import {Metadata} from "next";
import Reports from "@/app/admin/(protected)/reports/reports-client";

export const metadata: Metadata = {
  title: "Dashboard",
  description: "Example dashboard app built using the components.",
};

export default function DashboardPage() {
  return <Reports />;
}
