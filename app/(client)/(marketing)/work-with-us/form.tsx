"use client";
import React from "react";
import {Input} from "@/app/(client)/components/ui/input";
import {Button} from "@/app/(client)/components/ui/button";
import {Icons} from "../../components/icons";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/app/(client)/components/ui/select";

import {cn} from "@/lib/utils";

import emailjs from "@emailjs/browser";
import {useToast} from "@/app/(client)/components/ui/use-toast";
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import * as z from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/app/(client)/components/ui/form";
import {Textarea} from "@/app/(client)/components/ui/textarea";

const AgencyForm = () => {
  const [isLoading, setIsLoading] = React.useState(false);
  const {toast} = useToast();

  const AgencyFormSchema = z.object({
    user_name: z.string({
      required_error: "Please enter your name.",
    }),
    user_email: z
      .string({
        required_error: "Please enter your email.",
      })
      .email(),
    user_company: z.string({
      required_error: "Please enter your company name.",
    }),
    user_website: z.string({
      required_error: "Please enter your website.",
    }),
    user_service: z.string({
      required_error: "Please enter your service.",
    }),
    user_message: z.string({
      required_error: "Please enter your service.",
    }),
  });

  type AgencyFormValue = z.infer<typeof AgencyFormSchema>;

  const form = useForm<AgencyFormValue>({
    resolver: zodResolver(AgencyFormSchema),
    mode: "onChange",
  });

  async function onSubmit(data: AgencyFormValue, e?: React.BaseSyntheticEvent) {
    e?.preventDefault();
    console.log("suibmitted", data);
    setIsLoading(true);
    try {
      await emailjs.send(
        "service_xxd3rzl",
        "template_sgojddv",
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

  // for service dropdown
  const services = [
    {
      value: "Video editing",
      label: "Video Editing",
    },
    {
      value: "Writing",
      label: "Writing",
    },
    {
      value: "Deep Dive",
      label: "Deep Dive",
    },
    {
      value: "Web Development",
      label: "Web Development",
    },
    {
      value: "Other",
      label: "Other",
    },
  ];

  return (
    <div id="agency-get-started" className="py-20 ">
      <div className="w-full bg-white p-10 ">
        <div className="md:container w-full md:w-[60%] ">
          <h2 className="text-theme-blue text-4xl font-head capitalize font-bold text-center ">
            We are ready when you are
          </h2>
          <p className="text-theme-blue text-center text-lg font-body font-normal">
            Let&apos;s get started with your project
          </p>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="flex flex-col  gap-4 justify-center items-center mt-10"
            >
              <div className="grid grid-cols-2 w-full gap-4">
                <FormField
                  control={form.control}
                  name="user_name"
                  render={({field}) => (
                    <FormItem className="w-full">
                      <FormControl>
                        <Input
                          {...field}
                          placeholder="Full Name"
                          className="bg-background"
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
                      <FormControl>
                        <Input
                          {...field}
                          placeholder="Email"
                          className="bg-background"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <FormField
                control={form.control}
                name="user_company"
                render={({field}) => (
                  <FormItem className="w-full">
                    <FormControl>
                      <Input
                        {...field}
                        placeholder="Company Name"
                        className="bg-background"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="user_website"
                render={({field}) => (
                  <FormItem className="w-full">
                    <FormControl>
                      <Input
                        {...field}
                        placeholder="Website or Social Handle"
                        className="bg-background"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="user_service"
                render={({field}) => (
                  <FormItem className="w-full">
                    <FormControl>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <SelectTrigger className="w-full bg-background placeholder:text-muted-foreground">
                          <SelectValue placeholder="Select a service" />
                        </SelectTrigger>
                        <SelectContent className="bg-white">
                          {services.map((service) => (
                            <SelectItem
                              key={service.value}
                              value={service.value}
                            >
                              {service.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="user_message"
                render={({field}) => (
                  <FormItem className="w-full">
                    <FormControl>
                      <Textarea
                        {...field}
                        placeholder="Tell us more about your project"
                        className="bg-background"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button variant={"blue"} className="w-full font-head rounded-lg">
                {isLoading && <Icons.spinner className="animate-spin mr-2" />}
                Get Started
              </Button>
            </form>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default AgencyForm;
