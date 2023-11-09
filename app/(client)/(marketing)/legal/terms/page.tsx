import React from "react";

const TermsPage = () => {
  return (
    <div className=" lg:mt-20 ">
      <h1 className="md:container text-theme-blue text-4xl text-center md:text-6xl  border-t p-10">
        Terms & Conditions
      </h1>
      <div className="w-full container bg-theme-blue/20">
        <div className="w-full py-10 md:w-[60%] mx-auto flex flex-col gap-8">
          <h2>{terms.WelcomeMessage}</h2>
          {terms.Sections.map((section, i) => (
            <span key={i}>
              <h3 className="font-bold">
                {section.SectionNumber + ". " + section.SectionTitle}
              </h3>
              <p>{section.Content}</p>
            </span>
          ))}
          <p>
            <strong>Last Updated:</strong> {terms.LastUpdated}
          </p>
        </div>
      </div>
    </div>
  );
};

export default TermsPage;

const terms = {
  LastUpdated: "11/7/2023",
  WelcomeMessage:
    "Welcome to Founder Central! These terms and conditions outline the rules and regulations for the use of Founder Central's Website, located at www.foundercentral.co. By accessing this website, we assume you accept these terms and conditions. Do not continue to use Founder Central if you do not agree to take all of the terms and conditions stated on this page.",
  Sections: [
    {
      SectionNumber: 1,
      SectionTitle: "Copyright Notice",
      Content:
        "Copyright © [2023] Founder Central. All rights reserved. Any redistribution or reproduction of part or all of the contents in any form is prohibited other than the following:\n\n- You may print or download to a local hard disk extracts for your personal and non-commercial use only.\n- You may copy the content to individual third parties for their personal use, but only if you acknowledge the website as the source of the material.",
    },
    {
      SectionNumber: 2,
      SectionTitle: "License",
      Content:
        "Unless otherwise stated, Founder Central and/or its licensors own the intellectual property rights for all material on Founder Central. All intellectual property rights are reserved. You may access this from Founder Central for your own personal use subjected to restrictions set in these terms and conditions.",
    },
    {
      SectionNumber: 3,
      SectionTitle: "User Comments",
      Content:
        "Certain parts of this website offer the opportunity for users to post and exchange opinions and information. Founder Central does not filter, edit, publish, or review Comments prior to their presence on the website. Comments do not reflect the views and opinions of Founder Central, its agents, or affiliates. Comments reflect the views and opinions of the person who post their views and opinions.",
    },
    {
      SectionNumber: 4,
      SectionTitle: "Reservation of Rights",
      Content:
        "We reserve the right to request that you remove all links or any particular link to our Website. You approve to immediately remove all links to our Website upon request.",
    },
    {
      SectionNumber: 5,
      SectionTitle: "Product Descriptions",
      Content:
        "Founder Central attempts to be as accurate as possible. However, Founder Central does not warrant that product descriptions or other content of this site is accurate, complete, reliable, current, or error-free.",
    },
    {
      SectionNumber: 6,
      SectionTitle: "Disclaimer",
      Content:
        "To the maximum extent permitted by applicable law, we exclude all representations, warranties, and conditions relating to our website and the use of this website.",
    },
  ],
};
