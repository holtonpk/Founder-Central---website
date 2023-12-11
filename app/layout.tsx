import type {Metadata} from "next";
import "@/app/(client)/client-style.css";
import {siteConfig} from "@/config/site";
import {constructMetadata} from "@/lib/utils";
import Script from "next/script";

export const metadata = constructMetadata({
  title: siteConfig.name,
  description: siteConfig.description,
});

export default function RootLayout({children}: {children: React.ReactNode}) {
  return (
    <html lang="en">
      <Script>
        {`
!function(f,b,e,v,n,t,s)
{if(f.fbq)return;n=f.fbq=function(){n.callMethod?
n.callMethod.apply(n,arguments):n.queue.push(arguments)};
if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
n.queue=[];t=b.createElement(e);t.async=!0;
t.src=v;s=b.getElementsByTagName(e)[0];
s.parentNode.insertBefore(t,s)}(window, document,'script',
'https://connect.facebook.net/en_US/fbevents.js');
fbq('init', '350950157581468');
fbq('track', 'PageView')`}
      </Script>
      <noscript>
        <img
          height="1"
          width="1"
          className="hidden"
          src="https://www.facebook.com/tr?id=350950157581468&ev=PageView&noscript=1"
        />
      </noscript>

      <body className="">
        <main>{children}</main>
      </body>
    </html>
  );
}
