import React from "react";
import Image from "next/image";
import bookImage from "@/public/image/bookCover-splatter.png";
import {LinkButton} from "@/app/(client)/components/ui/link";
import {Icons} from "@/app/(client)/components/icons";

const BookDisplay = () => {
  return (
    <div className="flex md:container w-full md:w-[80%] py-8 justify-between md:flex-row flex-col items-center">
      <div className="flex flex-col md:w-1/2 gap-2  h-fit p-4 rounded-md order-2 md:order-1">
        <h1 className="  font-head font-bold text-center md:text-left   text-4xl lg:text-5xl  text-theme-pink">
          Craving a little motivation?
        </h1>
        <p className="text-lg text-center md:text-left">
          Open this book to dive into a world of riveting tales and lessons from
          history&apos;s most influential entrepreneurs.
        </p>
        <LinkButton
          href="/books/shop/snapshots-of-success-the-50-greatest-business-success-stories"
          variant="pink"
          className="mt-3 text-base md:text-xl md:p-6 w-full md:w-fit"
        >
          Buy Now
          <Icons.arrowRight className="h-6 w-6 ml-2" />
        </LinkButton>
      </div>
      <div className="w-[80%] md:w-1/2 aspect-square relative order-1 md:order-2">
        <Image src={bookImage} alt="book-cover" fill objectFit="contain" />
      </div>
    </div>
  );
};

export default BookDisplay;
