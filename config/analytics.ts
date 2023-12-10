import {useEffect, useState} from "react";
import {getAnalytics} from "firebase/analytics";
import {app} from "@/config/firebase";

const useFirebaseAnalytics = () => {
  const [analytics, setAnalytics] = useState<any>(null);

  useEffect(() => {
    const initializeAnalytics = () => {
      // Check if the user has given consent via cookie
      const hasConsent = document.cookie.includes("myCookieConsentCookie=true");

      if (hasConsent) {
        // Initialize Firebase Analytics
        const analyticsInstance = getAnalytics(app);
        setAnalytics(analyticsInstance);
      }
    };

    initializeAnalytics();

    // Add any cleanup logic here if needed

    return () => {
      // Clean up resources or event listeners if necessary
    };
  }, []);

  return analytics;
};

export default useFirebaseAnalytics;
