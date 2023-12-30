import {formatDate} from "@/lib/utils";
import {Icons} from "@/app/(client)/components/icons";
import {LinkButton} from "@/app/(client)/components/ui/link";
import {buttonVariants} from "@/app/(client)/components/ui/button";
import {cn} from "@/lib/utils";
import Image from "next/image";
import {ReactElement, JSXElementConstructor} from "react";
import {getPostBySlug} from "@/lib/mdx";
import {MDXRemote} from "next-mdx-remote/rsc";

interface Meta {
  title: string;
  description: string;
  date: string;
  image: string;
}

const getPageContent = async (
  slug: string
): Promise<{
  meta: Meta;
  content: any;
}> => {
  const {meta, content} = await getPostBySlug(slug);
  return {meta: meta as Meta, content};
};

export async function generateMetadata({params}: {params: {slug: string}}) {
  const {meta} = await getPageContent(params.slug);
  return {
    title: meta.title,
  };
}

const Page = async ({params}: {params: {slug: string}}) => {
  const {meta, content} = await getPageContent(params.slug);

  return (
    <article className="container relative max-w-3xl py-6 lg:pb-10 lg:pt-28">
      <LinkButton
        href="/blog"
        className={cn(
          buttonVariants({variant: "ghost"}),
          "absolute left-[-200px] top-28 hidden xl:inline-flex border-none"
        )}
      >
        <Icons.chevronLeft className="mr-2 h-4 w-4" />
        See all posts
      </LinkButton>
      <div>
        {meta.date && (
          <time
            dateTime={meta.date}
            className="block text-sm text-muted-foreground font-body"
          >
            Published on {formatDate(Number(meta.date))}
          </time>
        )}
        <h1 className="mt-2 inline-block font-heading text-2xl sm:text-3xl md:text-4xl leading-tight text-theme-blue font-head font-bold lg:text-5xl">
          {meta.title}
        </h1>
      </div>
      {meta.image && (
        <div className="relative overflow-hidden aspect-[2/1] my-6 ">
          <Image
            src={meta.image}
            alt={meta.title}
            width={804}
            height={452}
            className="rounded-md border bg-muted  absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 group-hover:scale-105 group-hover:z-10 transition-all duration-200 ease-in-out"
          />
        </div>
      )}
      <div className="prose">{content}</div>
      <hr className="mt-12" />
      <div className="flex justify-center py-6 lg:py-10">
        <LinkButton
          href="/blog"
          className={cn(buttonVariants({variant: "ghost"}))}
        >
          <Icons.chevronLeft className="mr-2 h-4 w-4" />
          See all posts
        </LinkButton>
      </div>
    </article>
  );
};

export default Page;
