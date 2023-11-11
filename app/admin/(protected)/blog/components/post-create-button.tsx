"use client";

import * as React from "react";
import {useRouter} from "next/navigation";

import {cn} from "@/lib/utils";
import {ButtonProps, buttonVariants} from "@/app/admin/components/ui/button";
import {toast} from "@/app/admin/components/ui/use-toast";
import {Icons} from "@/app/admin/components/icons";
import {useAdminStorage} from "@/app/admin/context/storage";
import {useAuth} from "@/app/admin/context/user-auth";

interface PostCreateButtonProps extends ButtonProps {}

export function PostCreateButton({
  className,
  variant,
  ...props
}: PostCreateButtonProps) {
  const router = useRouter();
  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const {CreateBlogPost} = useAdminStorage()!;
  const {currentUser} = useAuth()!;

  async function onClick() {
    setIsLoading(true);
    console.log("CreateBlogPost", currentUser);
    const post = await CreateBlogPost(currentUser);

    setIsLoading(false);

    if (post == "error") {
      return toast({
        title: "Something went wrong.",
        description: "Your post was not created. Please try again.",
        variant: "destructive",
      });
    }

    // This forces a cache invalidation.
    router.refresh();
    router.push(`/admin/blog/${post.id}`);
  }

  return (
    <button
      onClick={onClick}
      className={cn(
        buttonVariants({variant}),
        {
          "cursor-not-allowed opacity-60": isLoading,
        },
        className
      )}
      disabled={isLoading}
      {...props}
    >
      {isLoading ? (
        <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
      ) : (
        <Icons.add className="mr-2 h-4 w-4" />
      )}
      New post
    </button>
  );
}
