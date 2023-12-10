"use client";
import React, {useContext, useState, useEffect, createContext} from "react";
import {app} from "@/config/firebase";
import {getAnalytics} from "firebase/analytics";

import {
  doc,
  setDoc,
  getFirestore,
  getDoc,
  getDocs,
  updateDoc,
  deleteDoc,
  collection,
  addDoc,
} from "firebase/firestore";

interface StorageContextType {
  CreateNewMessage: (
    name: string,
    email: string,
    subject: string,
    message: string
  ) => void;
  SaveReview: (
    name: string,
    productId: string,
    email: string,
    rating: number,
    date: number,
    title: string,
    body: string
  ) => void;
  FetchReviews: () => Promise<
    {
      name: string;
      email: string;
      productId: string;
      rating: number;
      date: number;
      title: string;
      body: string;
    }[]
  >;
  SubmitFormResponse: (formId: string, name: string, data: any) => void;
  consentGiven: boolean;
  setConsentGiven: (value: boolean) => void;
  analytics: any;
}

const StorageContext = createContext<StorageContextType | null>(null);

export const emailRef = React.createRef();

export function useStorage() {
  return useContext(StorageContext);
}

export const db = getFirestore(app);

export function StorageProvider({children}: {children: React.ReactNode}) {
  const CreateNewMessage = async (
    name: string,
    email: string,
    subject: string,
    message: string
  ) => {
    const d = await addDoc(collection(db, "messages"), {
      name: name,
      email: email,
      subject: subject,
      message: message,
    });
  };

  const SaveReview = async (
    name: string,
    productId: string,
    email: string,
    rating: number,
    date: number,
    title: string,
    body: string
  ) => {
    const d = await addDoc(collection(db, "reviews"), {
      name: name,
      email: email,
      productId: productId,
      rating: rating,
      date: date,
      title: title,
      body: body,
      live: false,
    });
    console.log("Document written with ID: ", d);
  };

  const FetchReviews = async () => {
    const reviews: {
      name: string;
      email: string;
      productId: string;
      rating: number;
      date: number;
      title: string;
      body: string;
    }[] = [];
    const querySnapshot = await getDocs(collection(db, "reviews"));
    querySnapshot.forEach((doc) => {
      reviews.push(doc.data() as any);
    });
    return reviews;
  };

  const SubmitFormResponse = async (
    formId: string,
    name: string,
    data: any
  ) => {
    const d = await addDoc(collection(db, `surveys/${formId}/results`), {
      name: name,
      date: new Date(),
      data,
    });
    console.log("Document written with ID: ", d);
  };
  const [consentGiven, setConsentGiven] = useState<boolean>(
    document.cookie.includes("myCookieConsentCookie=true") ||
      document.cookie.includes("myCookieConsentCookie=false")
  );

  const [analytics, setAnalytics] = useState<any>(null);
  useEffect(() => {
    if (
      typeof window !== "undefined" &&
      document.cookie.includes("myCookieConsentCookie=true")
    ) {
      setAnalytics(getAnalytics(app));
    }
  }, [consentGiven]);

  const value = {
    consentGiven,
    setConsentGiven,
    analytics,
    CreateNewMessage,
    SaveReview,
    FetchReviews,
    SubmitFormResponse,
  };

  return (
    <StorageContext.Provider value={value}>{children}</StorageContext.Provider>
  );
}
