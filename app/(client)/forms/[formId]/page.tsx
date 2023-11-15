import React from "react";
import FormPageLayout from "./form-layout";
import {constructMetadata} from "@/lib/utils";

export const metadata = constructMetadata({
  title: "Founder Central newsletter survey",
  description: "Help us shape the future of Founder Central",
});

const FormPage = () => {
  return <FormPageLayout />;
};

export default FormPage;
