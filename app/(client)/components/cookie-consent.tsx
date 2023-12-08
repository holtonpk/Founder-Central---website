"use client";
import React, {useEffect, useState} from "react";
import {Button} from "@/app/(client)/components/ui/button";
import {app} from "@/config/firebase";
import {getAnalytics} from "firebase/analytics";

interface CookieConsentProps {}
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

const CookieConsentBanner: React.FC<CookieConsentProps> = () => {
  const [consentGiven, setConsentGiven] = useState<boolean>(
    document.cookie.includes("myCookieConsentCookie=true") ||
      document.cookie.includes("myCookieConsentCookie=false")
  );

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
    <div className="fixed bottom-0 z-[100] flex max-h-screen w-full flex-col-reverse p-4 sm:bottom-0 sm:right-0 sm:top-auto sm:flex-col md:max-w-[500px]">
      <div className="group pointer-events-auto relative flex flex-col w-full items-left justify-between  overflow-hidden rounded-md border p-6 pr-8 shadow-lg cookie-consent bg-theme-blue  text-white">
        <h1 className="text-lg font-bold">We value your privacy</h1>
        <p className="text-sm">
          We use cookies to enhance your experience and to analyze site traffic
          By clicking &quot;I accept&quot;, you consent to the use of cookies
          detailed in the{" "}
          <a href="/privacy-policy" className="underline">
            Privacy policy
          </a>
        </p>

        <Button
          variant={"white"}
          onClick={handleConsent}
          className="text-theme-blue mt-2 hover:bg-transparent hover:text-white hover:border hover:border-white"
        >
          I accept
        </Button>
        <Button
          onClick={declineConsent}
          variant="ghost"
          className="text-white border-white absolute top-0 right-0 hover:bg-transparent hover:opacity-70 hover:text-white"
        >
          X
        </Button>
      </div>
    </div>
  );
};

export default CookieConsentBanner;
