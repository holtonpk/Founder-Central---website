"use client";
import React from "react";
import {Input} from "@/app/(client)/components/ui/input";
import {Button} from "@/app/(client)/components/ui/button";
import {Icons} from "@/app/(client)/components/icons";
import {useToast} from "@/app/(client)/components/ui/use-toast";
import {siteConfig} from "@/config/site";
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

const Newsletter = () => {
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
    <div
      id="newsletter"
      className="h-fit bg-theme-blue/10 py-10 md:py-20 relative z-10 "
    >
      <div className="flex flex-col w-[90%] md:w-[70%] mx-auto gap-6 md:container">
        <h1 className="  font-head font-bold text-center  md:text-left   text-4xl lg:text-5xl  text-theme-blue">
          What’s In The Weekly Email?
        </h1>
        <p className="text-theme-blue text-base md:text-xl font-body text-center md:text-left">
          Every week, we send out a compilation of all the content you might
          have missed in a single email. Plus, you can connect with like-minded
          founders reading the same email
        </p>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="w-full md:w-[60%] flex relative"
          >
            <FormField
              control={form.control}
              name="email"
              render={({field}) => (
                <FormItem className="w-full">
                  <FormControl>
                    <Input
                      {...field}
                      placeholder="youremail@domain.com"
                      className="relative bg-white shadow-lg border-none rounded-lg w-full "
                    />
                  </FormControl>
                </FormItem>
              )}
            />
            <Button className="bg-theme-pink text-white rounded-lg absolute right-0 rounded-l-none border-none">
              Subscribe
              {isLoading && (
                <Icons.spinner className="ml-2 h-4 w-4 animate-spin" />
              )}
            </Button>
          </form>
        </Form>
      </div>
    </div>
  );
};

export default Newsletter;
