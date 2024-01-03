"use client";
import React from "react";
import {Icons} from "@/app/(client)/components/icons";
import {Button} from "@/app/(client)/components/ui/button";
import {LinkButton} from "@/app/(client)/components/ui/link";
import Image from "next/image";
import useScroll from "@/lib/hooks/use-scroll";
import {Input} from "@/app/(client)/components/ui/input";
import {useStorage} from "@/context/storage";
import {useToast} from "@/app/(client)/components/ui/use-toast";
import {siteConfig} from "@/config/site";
import coverImage from "@/public/image/cover-shadow2.png";
import heroImage from "@/public/image/heroImage.png";
import Background from "@/app/(client)/components/noise";

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/app/(client)/components/ui/form";
import {useFieldArray, useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import SubscribePopup from "@/app/(client)/components/subscribe-popup";
import {useRouter} from "next/navigation";
import * as z from "zod";

const Hero = () => {
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

  const router = useRouter();

  const goToBook = () => {
    router.push(
      "/books/shop/snapshots-of-success-the-50-greatest-business-success-stories"
    );
  };

  return (
    <>
      <div
        className="hero relative overflow-visible z-40 min-h-fit   lg:pt-20 "
        id="hero"
      >
        <div className="grid grid-rows-[40%_60%]  lg:grid-rows-1 sm:grid-rows-[40%_60%] md:grid-rows-[60%_40%] gap-y-4 md:gap-y-6 lg:grid-cols-[70%_1fr] lg:p-8 gap-x-6 px-2   lg:container h-fit    lg:h-[90vh]  lg:max-h-[650px] z-1 relative">
          <div className=" h-full w-full bg-theme-blue rounded-lg relative p-4  md:p-8 flex  overflow-hidden">
            <div className="flex max-h-full  flex-col relative z-20">
              <h1 className="text-xl  xsm:text-xl sm:text-[42px] sm:leading-[1] md:text-6xl lg:text-6xl xl:text-7xl font-head font-bold  text-white w-[70%] sm:w-[60%] xl:w-[65%]  capitalize">
                Where the next group of billionaires get their daily inspo.
              </h1>

              <SubscribePopup
                variant={"default"}
                className="text-sm sm:text-base md:text-3xl md:p-6 relative text-theme-blue hover:text-theme-blue hover:bg-white/80  rounded-lg w-fit mt-4 md:mt-8 border-white bg-white "
              >
                Join Today
                <Icons.arrowRight className="ml-4 md:h-8 md:w-8 h-4 w-4" />
              </SubscribePopup>
            </div>

            <div className="aspect-square h-[85%]  xsm:h-full z-10  absolute right-0 bottom-0">
              <Image
                src={heroImage}
                alt="cover"
                fill
                objectFit="contain"
                // sizes="(max-width: 768px) 100vw, 300px"
                className=""
                loading="eager"
              />
            </div>
          </div>
          <div className=" grid grid-rows-[50%_1fr] md:grid-cols-2  md:grid-rows-1 md:items-center lg:grid-cols-1 lg:grid-rows-[65%_1fr] w-full md:gap-x-6 max-h-full h-full md:h-full  gap-y-4  overflow-hidden ">
            <div
              onClick={goToBook}
              className="cursor-pointer hover:bg-theme-pink/80 h-full w-full bg-theme-pink max-h-full overflow-hidden md:min-h-full flex items-center  xsm:flex-row md:block  rounded-lg relative overflow-hidden p-4 "
            >
              <div className="flex flex-col xsm:pl-8 md:pl-0 gap-4  xsm:w-[55%] md:w-full">
                <h1 className="text-white font-bold font-body text-2xl   md:text-3xl capitalize relative z-10">
                  E-book <br /> now available
                </h1>
                <LinkButton
                  href={
                    "/books/shop/snapshots-of-success-the-50-greatest-business-success-stories"
                  }
                  variant={"outline"}
                  className="text-white border-white rounded-lg flex md:hidden w-fit whitespace-nowrap"
                >
                  Buy now
                  <Icons.arrowRight className="ml-4 md:h-8 md:w-8 h-4 w-4" />
                </LinkButton>
              </div>

              <div className="absolute z-10 top-4 right-4 hidden md:block ">
                <Icons.arrowRight className="text-white rotate-[-45deg] h-8 w-8" />
              </div>
              <div className="mt-6 z-10 relative mb-2 xsm:mb-0 xsm:absolute  xsm:right-10 sm:right-20 md:right-0  md:relative mx-auto aspect-square md:h-full h-[120%] xsm:h-[120%] xsm:top-4 md:mt-6">
                <Image
                  id={"hero-image-cover"}
                  src={coverImage}
                  alt="cover"
                  fill
                  objectFit="contain"
                  sizes="(max-width: 768px) 100vw, 300px"
                  className="ml-3"
                  loading="eager"
                />
              </div>
            </div>
            <div className="h-fit  lg:h-full justify-between w-full bg-theme-yellow  rounded-lg relative p-4 flex flex-col gap-4">
              <h1 className="text-white font-bold font-body whitespace-nowrap md:whitespace-normal text-center md:text-left md:text-3xl lg:text-[22px] text-lg xsm:text-xl capitalize relative  w-[100%] ">
                Join 45k other founders like yourself.
              </h1>
              {/* <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="">
                  <div className="w-full h-fit relative ">
                    <div className="h-fit w-full">
                      <FormField
                        control={form.control}
                        name="email"
                        render={({field}) => (
                          <FormItem className="relative">
                            <FormControl>
                              <Input
                                {...field}
                                placeholder="youremail@domain.com"
                                className="bg-white shadow-lg w-full relative"
                                autoComplete="email"
                              />
                            </FormControl>
                          </FormItem>
                        )}
                      />
                    </div>
                    <Button className="absolute right-0 top-1/2 -translate-y-1/2 h-full  bg-theme-pink text-white border-theme-pink rounded-l-none  hover:bg-theme-pink/80 hover:text-white   rounded-r-md">
                      Subscribe
                      {isLoading && (
                        <Icons.spinner className="ml-2 h-4 w-4 animate-spin" />
                      )}
                    </Button>
                  </div>
                </form>
              </Form> */}
              <iframe
                src="https://embeds.beehiiv.com/77dff1b9-eaaf-4b3a-9c41-ff3f7209ed44?slim=true"
                data-test-id="beehiiv-embed"
                height="52"
                scrolling="no"
                // style={"margin: 0; border-radius: 0px !important; background-color: transparent;"}
              ></iframe>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Hero;

const EmailForm = () => {
  const emailRef = React.useRef<HTMLInputElement>(null);
  const [isLoading, setIsLoading] = React.useState<boolean>(false);

  const {toast} = useToast();

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    console.log("submit", document.referrer);

    setIsLoading(true);
    await fetch("/api/email-subscribe", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        LIST: siteConfig.emailLists.book1,
        EMAIL: emailRef.current!.value,
        // SOURCE: { source: "Homepage hero signup form", referrer: "test" },
        SOURCE: document.referrer,
      }),
    });

    setIsLoading(false);
    toast({
      title: "Thanks signing up for early access!",
      description: "We will notify you when the book is ready.",
    });
    emailRef.current!.value = "";
  }

  return (
    <form
      id="email-form"
      onSubmit={handleSubmit}
      className="gap-4 flex  w-full md:w-3/4 border border-black p-1 rounded-full bg-transparent  relative z-30"
    >
      <Input
        id="email-input"
        ref={emailRef}
        type="email"
        autoComplete="email"
        placeholder="Want early access? Enter your email"
        className=" border-none text-[12px] md:text-base rounded-l-full"
      />
      <Button
        id="email-submit"
        variant={"pink"}
        className=" text-[12px] md:text-base z-30"
      >
        {isLoading && <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />}
        Submit
      </Button>
    </form>
  );
};
