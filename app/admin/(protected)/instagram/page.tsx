import React from "react";
import InstagramUi from "./instagram-ui";
const InstagramPage = () => {
  return (
    <div>
      <div className="grid grid-cols-[75%_1fr]  gap-10 container  ">
        <InstagramUi />
      </div>
    </div>
  );
};

export default InstagramPage;
