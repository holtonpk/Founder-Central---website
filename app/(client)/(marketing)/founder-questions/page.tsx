import React from "react";
import FounderQuestionsForm from "./FounderQuestions";
import {constructMetadata} from "@/lib/utils";
import {siteConfig} from "@/config/site";

export const metadata = constructMetadata({
  title: "Founder Questions",
  description:
    "If you are working on an interesting business and want to get featured, submit your answers below",
});
const page = () => {
  return <FounderQuestionsForm />;
};

export default page;
