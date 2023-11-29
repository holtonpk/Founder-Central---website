"use client";
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
import {useToast} from "@/app/(client)/components/ui/use-toast";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/app/(client)/components/ui/form";
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import * as z from "zod";

export function SiteFooter({className}: React.HTMLAttributes<HTMLElement>) {
  const aboutLinks = [
    // {title: "About Us", link: "/about"},
    {
      title: "Careers",
      link: "https://docs.google.com/forms/d/e/1FAIpQLSebZ9ql01fz0d7OqhSfd2dEtcoyQDi9tXRIKMzhKgQG3YxTKw/viewform",
    },
    // {
    //   title: "Blog",
    //   link: "/blog",
    // },
    {
      title: "Contact Us",
      link: "/contact",
    },
    {title: "Work With Us", link: "/work-with-us"},
  ];

  const servicesLinks = [
    {
      title: "Books",
      link: "/books/shop/snapshots-of-success-the-50-greatest-business-success-stories",
    },
    // {title: "Agency", link: "/agency"},
    {title: "Newsletter", link: "/#newsletter"},
    {title: "Agency", link: "/work-with-us"},
  ];

  const [isLoading, setIsLoading] = React.useState<boolean>(false);

  // email form
  const {toast} = useToast();

  const EmailFormSchema = z.object({
    email: z
      .string({
        required_error: "Please enter your email.",
      })
      .email(),
  });

  type EmailFormValue = z.infer<typeof EmailFormSchema>;

  const form = useForm<EmailFormValue>({
    resolver: zodResolver(EmailFormSchema),
    mode: "onChange",
  });

  async function onSubmit(data: EmailFormValue, e?: React.BaseSyntheticEvent) {
    e?.preventDefault();
    setIsLoading(true);
    try {
      await fetch("/api/email-subscribe", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          LIST: siteConfig.emailLists.newsletter,
          EMAIL: data.email,
          SOURCE: document.referrer,
        }),
      });
      setIsLoading(false);
      form.reset({
        email: "",
      });
      toast({
        title: "Thanks signing up for our newsletter!",
        description:
          "Check your inbox for a confirmation email. (Check your spam folder too!)",
      });
    } catch (err) {
      setIsLoading(false);
      toast({
        variant: "destructive",
        title: "Oops! Something went wrong.",
        description: "Please try again later.",
      });
    }
  }

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
        {/* <div className="hidden md:flex flex-col md:flex-row justify-between items-center w-full pb-4 border-b gap-2 md:gap-0 ">
          <p className="text-xl md:text-2xl font-body text-white md:text-left text-center">
            Join our newsletter to keep up to date with us
          </p>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="flex gap-4">
              <FormField
                control={form.control}
                name="email"
                render={({field}) => (
                  <FormItem className="relative h-fit w-fit flex ">
                    <FormControl>
                      <>
                        <Input
                          {...field}
                          placeholder="Enter your email"
                          className="w-[250px] md:w-[300px]  border-white placeholder:text-white rounded-md bg-white/10 relative pl-10  "
                        />
                        <Icons.mails className="h-6 w-6 text-white absolute left-2 top-0 z-20" />
                      </>
                    </FormControl>
                  </FormItem>
                )}
              />

              <Button
                variant="white"
                className="w-fit rounded-md text-theme-blue"
              >
                Subscribe
                {isLoading && (
                  <Icons.spinner className="ml-2 h-4 w-4 animate-spin" />
                )}
              </Button>
            </form>
          </Form>
        </div> */}

        <span
          className="footer__logo text-2xl p-2 text-primary font-bold  w-full flex md:flex-row flex-col justify-between  items-center md:gap-10 "
          id="footer-logo"
        >
          <div className="flex flex-row items-center md:items-start md:flex-col gap-4">
            <Icons.fullLogo
              id="footer-logo-icon"
              className="text-white h-20 w-[150px] md:h-28 md:w-[250px] "
              color="rgb(255 255 255) "
            />

            {/* <p className="text-[12px] text-white max-w-[250px] leading-5">
              Where the next group of billionaires get their daily inspo.
            </p> */}
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
          <div className="flex flex-row items-center gap-2 md:gap-4 w-fit">
            <LinkButton
              href="/legal/terms"
              variant={"link"}
              className="text-white whitespace-nowrap"
            >
              Terms & Conditions
            </LinkButton>
            <LinkButton
              href="/legal/privacy-policy"
              variant={"link"}
              className="text-white whitespace-nowrap"
            >
              Privacy Policy
            </LinkButton>
            <Button
              // href="/Cookies"
              variant={"link"}
              className="text-white whitespace-nowrap"
            >
              Cookies
            </Button>
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
