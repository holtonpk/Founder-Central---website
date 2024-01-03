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

const FounderQuestionsForm = () => {
  const messageRef = React.useRef<HTMLTextAreaElement>(null);
  const nameRef = React.useRef<HTMLInputElement>(null);
  const emailRef = React.useRef<HTMLInputElement>(null);
  const subjectRef = React.useRef<HTMLInputElement>(null);

  const [isLoading, setIsLoading] = React.useState(false);
  const {toast} = useToast();

  const QuestionsSchema = {};
  Questions.forEach((question, index) => {
    QuestionsSchema[question.name] = question.type;
  });

  const initialDynamicQuestionValues = {};
  Questions.forEach((question) => {
    initialDynamicQuestionValues[question.name] = "";
  });

  const ContactFormSchema = z.object({
    user_name: z.string({
      required_error: "Please enter your name.",
    }),
    user_email: z
      .string({
        required_error: "Please enter your email.",
      })
      .email(),
    user_social_domains: z.string({
      required_error: "Please enter a your social handles.",
    }),
    user_message: z.string({
      required_error: "Please enter a message.",
    }),
    ...QuestionsSchema,
  });
  type ContactFormValue = z.infer<typeof ContactFormSchema>;

  const form = useForm<ContactFormValue>({
    resolver: zodResolver(ContactFormSchema),
    mode: "onChange",
    defaultValues: {
      user_name: "",
      user_email: "",
      user_social_domains: "",
      user_message: "",
      ...initialDynamicQuestionValues,
    },
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
        "template_7fme49r",
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
          className="text-2xl md:text-5xl text-center md:text-left font-head text-theme-blue font-bold"
        >
          Founder In The Trenches
        </h1>
        <p className="text-black font-body ">
          If you are working on an interesting business and want to get
          featured, submit your answers below
        </p>
        <div className="bg-white rounded-lg p-4 mt-6">
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="flex flex-col"
            >
              <div className="grid md:grid-cols-2 gap-10 md:gap-20 ">
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
                  name="user_social_domains"
                  render={({field}) => (
                    <FormItem className="w-full">
                      <Label id="subject-label" htmlFor="subject">
                        Social Handles
                      </Label>
                      <FormControl>
                        <Input
                          {...field}
                          placeholder="Where can people find you?"
                          className="bg-theme-blue/10 border-none"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              {Questions.map((question, index) => (
                <div key={index} className="mt-6">
                  <FormField
                    control={form.control}
                    name={question.name}
                    render={({field}) => (
                      <FormItem className="w-full">
                        <Label id="message-label" htmlFor={question.name}>
                          {question.title}
                        </Label>
                        <FormControl>
                          <Textarea
                            {...field}
                            value={field.value?.toString() || ""}
                            placeholder="Your response here"
                            onChange={(e) => field.onChange(e.target.value)}
                            className="bg-theme-blue/10"
                            id={question.name}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              ))}
              <Button
                variant={"pink"}
                id="send-button"
                className="w-fit ml-auto  mt-10"
                size={"lg"}
              >
                {isLoading && (
                  <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
                )}
                Submit
              </Button>
            </form>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default FounderQuestionsForm;

const Questions = [
  {
    title: "In one line what does  your business do?",
    type: z.string({
      required_error: "Please enter a response.",
    }),
    name: "q1",
    placeholder: "Your Name",
  },
  {
    title: "Biggest win so far?",
    type: z.string({
      required_error: "Please enter a response.",
    }),
    name: "q2",
    placeholder: "Your Name",
  },
  {
    title: "Biggest roadblock you are facing at the moment?",
    type: z.string({
      required_error: "Please enter a response.",
    }),
    name: "q3",
    placeholder: "Your Name",
  },
  {
    title: "What is one insight or hack you found so far?",
    type: z.string({
      required_error: "Please enter a response.",
    }),
    name: "q4",
    placeholder: "Your Name",
  },
  {
    title: "Ask the community one question?",
    type: z.string({
      required_error: "Please enter a response.",
    }),
    name: "q5",
    placeholder: "Your Name",
  },
];
