"use client";
import React from "react";
import {Icons} from "@/app/(client)/components/icons";
import {Button} from "@/app/(client)/components/ui/button";
import {Textarea} from "@/app/(client)/components/ui/textarea";
import {Label} from "@/app/(client)/components/ui/label";
import {Input} from "@/app/(client)/components/ui/input";
import {useToast} from "@/app/(client)/components/ui/use-toast";
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import * as z from "zod";
import emailjs from "@emailjs/browser";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/app/(client)/components/ui/form";

const ContactFrom = () => {
  const messageRef = React.useRef<HTMLTextAreaElement>(null);
  const nameRef = React.useRef<HTMLInputElement>(null);
  const emailRef = React.useRef<HTMLInputElement>(null);
  const subjectRef = React.useRef<HTMLInputElement>(null);

  const [isLoading, setIsLoading] = React.useState(false);
  const {toast} = useToast();

  const ContactFormSchema = z.object({
    user_name: z.string({
      required_error: "Please enter your name.",
    }),
    user_email: z
      .string({
        required_error: "Please enter your email.",
      })
      .email(),
    user_subject: z.string({
      required_error: "Please enter a subject.",
    }),
    user_message: z.string({
      required_error: "Please enter a message.",
    }),
  });
  type ContactFormValue = z.infer<typeof ContactFormSchema>;

  const form = useForm<ContactFormValue>({
    resolver: zodResolver(ContactFormSchema),
    mode: "onChange",
  });

  async function onSubmit(
    data: ContactFormValue,
    e?: React.BaseSyntheticEvent
  ) {
    e?.preventDefault();
    console.log("suibmitted", data);
    setIsLoading(true);
    try {
      await emailjs.send(
        "service_xxd3rzl",
        "template_xwtv1qu",
        data,
        "Vfdmt28c91yq6Fz-G"
      );
      toast({
        title: "Thanks for reaching out!",
        description: "We will get back to you soon.",
      });
    } catch (err) {
      toast({
        variant: "destructive",
        title: "Oops! Something went wrong.",
        description: "Please try again later.",
      });
    }
    setIsLoading(false);
  }

  return (
    <div className="relative pt-6 lg:pt-32 container pb-20">
      <div className="md:container">
        <h1
          id="contact-block-title"
          className="text-2xl md:text-5xl text-center md:text-left font-body"
        >
          Have feedback? Lets get in touch! 🤝
        </h1>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <div className="grid md:grid-cols-2 gap-10 md:gap-20 mt-6">
              <FormField
                control={form.control}
                name="user_name"
                render={({field}) => (
                  <FormItem className="w-full">
                    <Label id="email-label" htmlFor="email">
                      Name
                    </Label>
                    <FormControl>
                      <Input
                        {...field}
                        placeholder="Your Name"
                        className="bg-theme-blue/10 border-none"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="user_email"
                render={({field}) => (
                  <FormItem className="w-full">
                    <Label id="email-label" htmlFor="email">
                      Email
                    </Label>
                    <FormControl>
                      <Input
                        {...field}
                        placeholder="
                        Enter your email"
                        className="bg-theme-blue/10 border-none"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="mt-6">
              <FormField
                control={form.control}
                name="user_subject"
                render={({field}) => (
                  <FormItem className="w-full">
                    <Label id="subject-label" htmlFor="subject">
                      Subject
                    </Label>
                    <FormControl>
                      <Input
                        {...field}
                        placeholder="What's the message about?"
                        className="bg-theme-blue/10 border-none"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="mt-6">
              <FormField
                control={form.control}
                name="user_message"
                render={({field}) => (
                  <FormItem className="w-full">
                    <Label id="message-label" htmlFor="Message">
                      Message
                    </Label>
                    <FormControl>
                      <Textarea
                        {...field}
                        placeholder="Enter your message here"
                        className="bg-theme-blue/10"
                        id="Message"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <Button
              variant={"blue"}
              id="send-button"
              className="w-full  mt-10"
              size={"lg"}
            >
              {isLoading ? (
                <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
              ) : (
                <Icons.send className="mr-2 h-4 w-4" />
              )}
              Send
            </Button>
          </form>
        </Form>
      </div>
    </div>
  );
};

export default ContactFrom;
