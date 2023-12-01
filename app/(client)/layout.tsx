import React from "react";
import "./client-style.css";
import {Analytics} from "@vercel/analytics/react";
import {StorageProvider} from "@/context/storage";
import {CartProvider} from "@/context/cart";
import CartPreview from "@/app/(client)/components/cart-preview";
import {Toaster} from "@/app/(client)/components/ui/toaster";

interface MarketingLayoutProps {
  children: React.ReactNode;
}

export default async function MarketingLayout({
  children,
}: MarketingLayoutProps) {
  return (
    <div id="client" className="client">
      <StorageProvider>
        <CartProvider>
          <Analytics />
          <CartPreview />
          <Toaster />
          <main className="client">{children}</main>
        </CartProvider>
      </StorageProvider>
    </div>
  );
}
