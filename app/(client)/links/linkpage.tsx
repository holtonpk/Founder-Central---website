"use client";
import React from "react";
import Image from "next/image";
import logo from "@/public/image/logo_pink.png";
import {Icons} from "@/app/(client)/components/icons";
import {siteConfig} from "@/config/site";
import {LinkButton} from "@/app/(client)/components/ui/link";
import {useRouter} from "next/navigation";
const LinkPageLayout = () => {
  type Link = {
    text: string;
    href: string;
    image?: string;
  };

  const links: Link[] = [
    {
      text: "Buy the book here",
      href: "/books/shop/snapshots-of-success-the-50-greatest-business-success-stories",
      image: "/image/cover.png",
    },
    {
      text: "Join 45k other founders like Yourself",
      href: "https://www.foundercentral.co/",
    },
    {
      text: "Job application",
      href: "https://docs.google.com/document/d/1KdRfDVAh-9iJfO0-ZqLxIh2OZ2GcF1WZ-gpE_qYv1eU/edit",
    },
    {
      text: "Contact Founder Central",
      href: "mailto:team@foundercentral.co",
    },
  ];

  const router = useRouter();

  const clickLink = (href: string) => {
    router.push(href);
  };

  return (
    <div className="bg-theme-blue h-screen flex pt-16 ">
      <div className="flex flex-col items-center max-auto w-[100%] md:w-[60%] md:container gap-2 h-fit">
        <div className="h-[100px] w-[100px] relative">
          <Image
            src={logo}
            alt="book cover"
            fill
            objectFit="contain"
            loading="eager"
          />
        </div>
        <h1 className="text-white text-xl text-center mt-2 font-head ">
          Founder Central
        </h1>
        <p className="text-white text-base text-center font-body w-[70%]">
          Where the next group of billionaires get their daily inspo
        </p>
        <div className="flex flex-col gap-4 mt-6 w-[85%] md:w-full">
          {links.map((link) => (
            <div
              onClick={() => clickLink(link.href)}
              key={link.text}
              className="w-full bg-white rounded-lg shadow-xl h-fit p-4 relative "
            >
              {link.image && (
                <div className="h-[80%] aspect-square absolute top-1/2 -translate-y-1/2 left-2">
                  <Image
                    src={link.image}
                    alt={link.text}
                    fill
                    objectFit="contain"
                    loading="eager"
                  />
                </div>
              )}
              <p className="text-black text-sm md:text-base text-center capitalize font-head">
                {link.text}
              </p>
            </div>
          ))}
        </div>
        <div className="mt-4  flex gap-4 " id="footer-social-links">
          <LinkButton
            variant={"secondaryOutline"}
            target="_blank"
            href={siteConfig.links.youtube}
            className="social-link border-none p-0 aspect-square"
          >
            <Icons.youtube
              className="h-8 w-8"
              id="footer-social-link-youtube"
            />
          </LinkButton>
          <LinkButton
            variant={"secondaryOutline"}
            target="_blank"
            href="mailto:team@foundercentral.co"
            className="social-link border-none p-0 aspect-square"
          >
            <Icons.mail className="h-8 w-8" id="footer-social-link-youtube" />
          </LinkButton>
          <LinkButton
            variant={"secondaryOutline"}
            target="_blank"
            href={siteConfig.links.instagram}
            className="social-link border-none p-0 aspect-square"
          >
            <Icons.instaGram
              className="h-8 w-8"
              id="footer-social-link-instagram"
            />
          </LinkButton>
          <LinkButton
            variant={"secondaryOutline"}
            target="_blank"
            href={siteConfig.links.tiktok}
            className="social-link border-none p-0 aspect-square"
          >
            <Icons.tiktok
              className="h-8 w-8"
              color="white"
              id="footer-social-link-tiktok"
            />
          </LinkButton>
        </div>
      </div>
    </div>
  );
};

export default LinkPageLayout;
