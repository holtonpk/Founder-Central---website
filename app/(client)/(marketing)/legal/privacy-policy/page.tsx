import React from "react";

const PrivacyPage = () => {
  return (
    <div className=" lg:mt-20 ">
      <h1 className="md:container text-theme-blue text-4xl text-center md:text-6xl  border-t p-10">
        Privacy Policy
      </h1>
      <div className="w-full container bg-theme-blue/20">
        <div className="w-full py-10 md:w-[60%] mx-auto flex flex-col gap-8">
          <h2>{privacy.introduction}</h2>
          {privacy.sections.map((section, i) => (
            <span key={i}>
              <h3 className="font-bold border-bottom">{section.header}</h3>

              <p>{section.content}</p>
            </span>
          ))}
          <p>
            <strong>Last Updated:</strong> {privacy.lastUpdated}
          </p>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPage;

const privacy = {
  lastUpdated: "11/7/2023",
  introduction:
    "At Founder Central, accessible from www.foundercentral.com, one of our main priorities is the privacy of our visitors. This Privacy Policy document contains types of information that is collected and recorded by Founder Central and how we use it.",
  sections: [
    {
      header: "Information We Collect",
      content:
        "Your name, Shipping address, Email address, Phone number, Payment information (please note that payment information is processed by our secure payment processor and is not stored by us)",
    },
    {
      header: "How We Use Your Information",
      content:
        "The information we collect is used for the following specific purposes:\n\n- To process and fulfill your book orders\n- To send you our weekly email newsletters, if you have subscribed\n- To communicate with you about your order or subscription, including confirmation and shipment updates",
    },
    {
      header: "Retention of Your Information",
      content:
        "We retain your personal information only for as long as necessary to provide you with our products and services and as described in this privacy policy.",
    },
    {
      header: "Non-Distribution of Information",
      content:
        "We do not sell, distribute, lease, or otherwise transfer your personal information to third parties unless we have your permission or are required by law to do so.",
    },
    {
      header: "Contact Information",
      content:
        "For any questions or concerns regarding this privacy policy, please contact us [Here](contact link)",
    },
  ],
};
