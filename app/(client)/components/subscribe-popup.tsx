"use client";
import React from "react";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/app/(client)/components/ui/dialog";
import {Icons} from "@/app/(client)/components/icons";
import {Button} from "@/app/(client)/components/ui/button";
import {buttonVariants} from "@/app/(client)/components/ui/button";
import {VariantProps, cva} from "class-variance-authority";
import {cn} from "@/lib/utils";
import {useToast} from "@/app/(client)/components/ui/use-toast";
import {siteConfig} from "@/config/site";
import {Input} from "@/app/(client)/components/ui/input";
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

export interface ModalProps extends VariantProps<typeof buttonVariants> {
  className?: string;
  children?: React.ReactNode;
}

export default function SubscribePopup({
  className,
  variant,
  size,
  children,
  ...props
}: ModalProps) {
  const [showModal, setShowModal] = React.useState<boolean>(false);
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
          "Check your inbox for a confirmation email.(Check your spam folder too!)",
      });
    } catch (err) {
      setIsLoading(false);
      toast({
        variant: "destructive",
        title: "Oops! Something went wrong.",
        description: "Please try again later.",
      });
    }
    setShowModal(false);
  }
  return (
    <>
      <Button
        {...props}
        className={cn(
          buttonVariants({variant, size}),
          className,
          "cursor-pointer"
        )}
        onClick={() => setShowModal(true)}
      >
        {children}
      </Button>

      <Dialog open={showModal} onOpenChange={setShowModal}>
        <DialogContent className="bg-white">
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="flex flex-col gap-4"
            >
              <DialogHeader>
                <DialogTitle className="text-[#4DA6DF]">
                  Join the Newsletter
                </DialogTitle>
                <DialogDescription>
                  Enter your email to subscribe to our newsletter
                </DialogDescription>
              </DialogHeader>
              <FormMessage />
              <FormField
                control={form.control}
                name="email"
                render={({field}) => (
                  <FormItem className="w-full">
                    <FormControl>
                      <Input
                        {...field}
                        placeholder="youremail@domain.com"
                        className="relative bg-white  border-[#4DA6DF] rounded-lg w-full "
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
              <DialogFooter>
                <Button className="bg-[#4DA6DF] hover:text-[#4DA6DF] hover:bg-white border-[#4DA6DF] rounded-md text-white">
                  {isLoading && (
                    <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
                  )}
                  Subscribe
                </Button>
              </DialogFooter>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
    </>
  );
}
