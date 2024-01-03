import React from "react";
import FounderQuestionsForm from "./FounderQuestions";
import {constructMetadata} from "@/lib/utils";
import {siteConfig} from "@/config/site";

export const metadata = constructMetadata({
  title: siteConfig.pages.contact.title,
  description: siteConfig.pages.contact.description,
});
const page = () => {
  return <FounderQuestionsForm />;
};

export default page;
