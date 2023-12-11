import type {Metadata} from "next";
import "@/app/(client)/client-style.css";
import {siteConfig} from "@/config/site";
import {constructMetadata} from "@/lib/utils";
s

export const metadata = constructMetadata({
  title: siteConfig.name,
  description: siteConfig.description,
});

export default function RootLayout({children}: {children: React.ReactNode}) {
  return (
    <html lang="en">
     

      <body className="">
        <main>{children}</main>
      </body>
    </html>
  );
}
