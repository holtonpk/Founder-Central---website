import * as React from "react";

import {siteConfig} from "@/config/site";
import {LinkButton} from "@/app/(client)/components/ui/link";
import {cn} from "@/lib/utils";
import {Icons} from "@/app/(client)/components/icons";
import Image from "next/image";
import {Input} from "@/app/(client)/components/ui/input";
import {Button} from "@/app/(client)/components/ui/button";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/app/(client)/components/ui/accordion";

export function SiteFooter({className}: React.HTMLAttributes<HTMLElement>) {
  const aboutLinks = [
    {title: "About Us", link: "/about"},
    {
      title: "Careers",
      link: "/careers",
    },
    {
      title: "Blog",
      link: "/blog",
    },
    {
      title: "Contact Us",
      link: "/contact",
    },
  ];

  const servicesLinks = [
    {title: "Books", link: "/books"},
    {title: "Agency", link: "/agency"},
    {title: "Newsletter", link: "/newsletter"},
  ];

  return (
    <footer
      className={cn(
        className,
        "footer bg-theme-blue text-white z-[40] border-t overflow-hidden"
      )}
      id="footer"
    >
      <div
        className="md:container flex flex-col items-center justify-between gap-4 pt-6 h-fit "
        id="footer-content"
      >
        <div className="hidden md:flex flex-col md:flex-row justify-between items-center w-full pb-4 border-b gap-2 md:gap-0 ">
          <p className="text-xl md:text-2xl font-body text-white md:text-left text-center">
            Join our newsletter to keep up to date with us
          </p>
          <div className="flex gap-4">
            <div className="w-fit relative">
              <Input
                placeholder="Enter your email"
                className="w-[250px] md:w-[300px]  border-white placeholder:text-white rounded-md bg-white/10 relative pl-10"
              />
              <Icons.mails className="h-6 w-6 text-white absolute left-2 top-1/2 -translate-y-1/2" />
            </div>
            <Button
              variant="white"
              className="w-fit rounded-md text-theme-blue"
            >
              Subscribe
            </Button>
          </div>
        </div>

        <span
          className="footer__logo text-2xl p-2 text-primary font-bold  w-full flex md:flex-row flex-col justify-between  items-center md:gap-10 "
          id="footer-logo"
        >
          <div className="flex flex-row items-center md:items-start md:flex-col gap-4">
            <Icons.logo
              id="footer-logo-icon"
              className="text-white h-28 w-[250px] "
              color="rgb(255 255 255) "
            />

            <p className="text-[12px] text-white max-w-[250px] leading-5">
              Where the next group of billionaires get their daily inspo.
            </p>
          </div>

          <div className="items-start  md:gap-20 w-full md:w-[60%]  justify-between hidden md:flex ">
            <div className="flex flex-col items-start gap-1">
              <h1 className="text-white text-2xl">About</h1>
              {aboutLinks.map((link) => (
                <LinkButton
                  key={link.title}
                  variant={"link"}
                  className="text-white px-0 py-0 h-fit text-base"
                  href={link.link}
                >
                  {link.title}
                </LinkButton>
              ))}
            </div>
            <div className="flex flex-col items-start gap-1">
              <h1 className="text-white">Services</h1>
              {servicesLinks.map((link) => (
                <LinkButton
                  key={link.title}
                  variant={"link"}
                  className="text-white px-0 py-0 h-fit"
                  href={link.link}
                >
                  {link.title}
                </LinkButton>
              ))}
            </div>
            <div className="flex flex-col items-start gap-1 ">
              <h1 className="text-white">Find us</h1>

              <div
                className="footer__social-links flex gap-4 "
                id="footer-social-links"
              >
                <LinkButton
                  variant={"secondaryOutline"}
                  target="_blank"
                  href={siteConfig.links.youtube}
                  className="footer__social-link border-none p-0 aspect-square"
                >
                  <Icons.youtube
                    className="md:h-8 md:w-8 h-6 w-6"
                    id="footer-social-link-youtube"
                  />
                </LinkButton>
                <LinkButton
                  variant={"secondaryOutline"}
                  target="_blank"
                  href={siteConfig.links.instagram}
                  className="footer__social-link border-none p-0 aspect-square"
                >
                  <Icons.instaGram
                    className="md:h-8 md:w-8 h-6 w-6"
                    id="footer-social-link-instagram"
                  />
                </LinkButton>
                <LinkButton
                  variant={"secondaryOutline"}
                  target="_blank"
                  href={siteConfig.links.tiktok}
                  className="footer__social-link border-none p-0 aspect-square"
                >
                  <Icons.tiktok
                    className="md:h-8 md:w-8 h-6 w-6"
                    color="white"
                    id="footer-social-link-tiktok"
                  />
                </LinkButton>
              </div>
            </div>
          </div>

          <Accordion type="single" collapsible className="w-full md:hidden">
            <AccordionItem value="item-1">
              <AccordionTrigger className="text-white font-bold">
                About
              </AccordionTrigger>
              <AccordionContent>
                <div className="flex flex-col gap-4 items-start">
                  {aboutLinks.map((link) => (
                    <LinkButton
                      key={link.title}
                      variant={"link"}
                      className="text-white px-0 py-0 h-fit text-base w-fit text-white/80"
                      href={link.link}
                    >
                      {link.title}
                    </LinkButton>
                  ))}
                </div>
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-2">
              <AccordionTrigger className="text-white font-bold">
                Services
              </AccordionTrigger>
              <AccordionContent>
                <div className="flex flex-col gap-4 items-start">
                  {servicesLinks.map((link) => (
                    <LinkButton
                      key={link.title}
                      variant={"link"}
                      className="text-white px-0 py-0 h-fit text-base w-fit text-white/80"
                      href={link.link}
                    >
                      {link.title}
                    </LinkButton>
                  ))}
                </div>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </span>

        <div
          className="mobile_footer__social-links  md:hidden flex gap-4 "
          id="mobile_footer-social-links"
        >
          <LinkButton
            variant={"secondaryOutline"}
            target="_blank"
            href={siteConfig.links.youtube}
            className="footer__social-link border-none p-0 aspect-square"
          >
            <Icons.youtube
              className="h-12 w-12"
              id="mobile_footer-social-link-youtube"
            />
          </LinkButton>
          <LinkButton
            variant={"secondaryOutline"}
            target="_blank"
            href={siteConfig.links.instagram}
            className="footer__social-link border-none p-0 aspect-square"
          >
            <Icons.instaGram
              className="h-12 w-12"
              id="mobile_footer-social-link-instagram"
            />
          </LinkButton>
          <LinkButton
            variant={"secondaryOutline"}
            target="_blank"
            href={siteConfig.links.tiktok}
            className="footer__social-link border-none p-0 aspect-square"
          >
            <Icons.tiktok
              className="h-12 w-12"
              color="white"
              id="mobile_footer-social-link-tiktok"
            />
          </LinkButton>
        </div>

        <div
          className="footer__copyright flex md:flex-row flex-col items-center gap-3 pb-2   md:gap-2 px-0 md:border-t  w-full justify-between"
          id="footer-copyright"
        >
          <div className="flex flex-col md:flex-row items-center gap-2 md:gap-4 w-fit">
            <LinkButton
              href="/terms"
              variant={"link"}
              className="text-white whitespace-nowrap"
            >
              Terms & Conditions
            </LinkButton>
            <LinkButton
              href="/privacy"
              variant={"link"}
              className="text-white whitespace-nowrap"
            >
              Privacy Policy
            </LinkButton>
            <LinkButton
              href="/Cookies"
              variant={"link"}
              className="text-white whitespace-nowrap"
            >
              Cookies
            </LinkButton>
          </div>
          <p
            className="footer__copyright-text text-center w-full md:w-fit text-sm md:text-[12px] md:text-sm leading-loose md:text-left pt-2 md:pt-0 border-t md:border-none"
            id="footer-copyright-text"
          >
            Copyright © 2023 {siteConfig.businessName}. All Rights Reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
