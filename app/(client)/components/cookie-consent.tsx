"use client";

import React, {useEffect, useState} from "react";
import {Button} from "@/app/(client)/components/ui/button";
import {app} from "@/config/firebase";
import {getAnalytics} from "firebase/analytics";
import {useStorage} from "@/context/storage";

interface CookieConsentProps {}

const CookieConsentBanner: React.FC<CookieConsentProps> = () => {
  const handleCookieConsent = () => {
    // Set a cookie to indicate consent
    document.cookie =
      "myCookieConsentCookie=true; expires=Fri, 31 Dec 9999 23:59:59 GMT; path=/";
  };

  const handleDeclineConsent = () => {
    // Set a cookie to indicate consent
    document.cookie =
      "myCookieConsentCookie=false; expires=Fri, 31 Dec 9999 23:59:59 GMT; path=/";
  };

  console.log("CookieConsentBanner ===============<");

  // const [consentGiven, setConsentGiven] = useState<boolean>(false);
  // useEffect(() => {
  //   if (typeof window !== "undefined") {
  //     setConsentGiven(
  //       document.cookie.includes("myCookieConsentCookie=true") ||
  //         document.cookie.includes("myCookieConsentCookie=false")
  //     );
  //   }
  // }, []);

  // const [consentGiven, setConsentGiven] = useState<boolean>(
  //   document.cookie.includes("myCookieConsentCookie=true") ||
  //     document.cookie.includes("myCookieConsentCookie=false")
  // );

  const {consentGiven, setConsentGiven} = useStorage()!;

  const handleConsent = () => {
    setConsentGiven(true);
    handleCookieConsent();
  };

  useEffect(() => {
    if (
      typeof window !== "undefined" &&
      document.cookie.includes("myCookieConsentCookie=true")
    ) {
      getAnalytics(app);
    }
  }, [consentGiven]);

  if (consentGiven) {
    return null; // Do not render the banner if consent is given
  }

  const declineConsent = () => {
    handleDeclineConsent();
    setConsentGiven(true);
  };

  return (
    <div className="fixed top-0 left-0 h-screen w-screen z-[999] flex max-h-screen   p-4  flex-col ">
      <div className="absolute w-screen h-screen bg-black/20 z-[998] top-0 left-0 blurBack cookie-consent-overlay" />
      <div className="left-1/2 -translate-x-1/2 top-0  pointer-events-auto relative flex z-[999] flex-col w-full items-left justify-between  overflow-hidden rounded-xl border p-6 pr-8 shadow-lg cookie-consent bg-white  text-theme-blue md:max-w-[800px]">
        {/* <h1 className="text-lg font-bold">We value your privacy</h1> */}
        <p className="text-sm">
          This website stores cookies on your computer. These cookies are used
          to improve your website experience and provide more personalized
          services to you, both on this website and through other media. To find
          out more about the cookies we use, see our{" "}
          <a href="/privacy-policy" className="underline">
            Privacy policy
          </a>
          .
          <br />
          <br />
          We won&apos;t track your information when you visit our site. But in
          order to comply with your preferences, we&apos;ll have to use just one
          tiny cookie so that you&apos;re not asked to make this choice again.
        </p>
        <div className="flex gap-4 items-center ml-auto mt-2">
          <Button variant={"blue"} size="lg" onClick={handleConsent}>
            Accept
          </Button>
          <Button
            size="lg"
            variant={"blueOutline"}
            onClick={handleConsent}
            className="text-theme-blue   "
          >
            Decline
          </Button>
        </div>
        <Button
          onClick={declineConsent}
          variant="ghost"
          className="text-theme-blue border-white absolute top-0 right-0 hover:bg-transparent hover:opacity-70 hover:text-theme-blue"
        >
          X
        </Button>
      </div>
    </div>
  );
};

export default CookieConsentBanner;
