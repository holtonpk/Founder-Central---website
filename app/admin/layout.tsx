import React from "react";
import "./style.css";
import { ThemeProvider } from "@/app/admin/components/theme-provider";
import AdminNav from "./components/admin-nav";
import { Toaster } from "@/app/admin/components/ui/toaster";
import { AdminStorageProvider } from "@/app/admin/context/storage";
import { AuthProvider } from "@/app/admin/context/user-auth";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Admin Portal",
  description: "This is for use by admin only ",
};

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <AuthProvider>{children}</AuthProvider>;
}
