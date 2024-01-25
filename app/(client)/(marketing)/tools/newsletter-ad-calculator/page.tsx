import React from "react";
import Calculator from "./calculator";
import Image from "next/image";
import {constructMetadata} from "@/lib/utils";
import {formatDate} from "@/lib/utils";
import Link from "next/link";

export const metadata = constructMetadata({
  title: "Newsletter Ad Calculator",
  description: "How to set your email newsletter's sponsorship price",
});
const NewsletterAdCalculator = () => {
  return (
    <div className=" py-6 lg:pb-10 lg:pt-28">
      <div className="container items-center flex flex-col  max-w-4xl">
        <h1 className="text-4xl font-head text-theme-blue font-bold">
          Newsletter Ad Calculator
        </h1>
        <p className="mt-2">
          How to set your email newsletter&apos;s sponsorship price
        </p>
        <Calculator />
      </div>
      <div className="container mt-10">
        <h1 className="text-3xl font-bold font-head text-theme-blue text-center">
          You may also be interested in
        </h1>
        <div className="grid gap-10 sm:grid-cols-3 mt-4 container">
          {BlogPost.map((post, index) => (
            <article
              key={index}
              className="group relative flex flex-col space-y-2 bg-white rounded-md p-3 "
            >
              {post.image && (
                <div className="relative overflow-hidden aspect-[2/1]  ">
                  <Image
                    src={post.image}
                    alt={post.title}
                    width={804}
                    height={452}
                    className="rounded-md border bg-muted  absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 group-hover:scale-105 group-hover:z-10 transition-all duration-200 ease-in-out"
                    priority={index <= 1}
                  />
                </div>
              )}
              <h2 className="text-2xl font-extrabold text-theme-blue group-hover:underline font-head">
                {post.title}
              </h2>
              {post.description && (
                <p className="text-muted-foreground font-body">
                  {post.description}
                </p>
              )}
              {post.date && (
                <p className="text-sm text-muted-foreground font-body">
                  {formatDate(post.date as any)}
                </p>
              )}
              <Link
                href={`blog/${post.slug}`}
                className="absolute inset-0 z-20 group"
              >
                <span className="sr-only">View Article</span>
              </Link>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
};

export default NewsletterAdCalculator;

const BlogPost = [
  {
    title:
      "Mastering Newsletter Growth A Practical Guide for Young Entrepreneurs",
    description: "How to grow your newsletter",
    image:
      "https://cdn.discordapp.com/attachments/1190437037665439767/1190439359137198171/foundercentral_49862_a_successful_email_newsletter_20e18fec-6079-4d61-b5b0-a199523808b7.png?ex=65a1ce0c&is=658f590c&hm=fd67914fe482a45f892526f3a50adf9789b68c550dcf59f9870897c3061185f8&",
    date: "2023-12-09",
    published: "true",
    slug: "Mastering–Newsletter–Growth–A–Practical–Guide–for-Young-Entrepreneurs",
  },
  {
    title: "Why Marketing Matters for Early Stage Startups",
    description:
      "This article explores why you need to prioritize marketing even as early stage startup.",
    image:
      "https://cdn.discordapp.com/attachments/1190437037665439767/1193373417651572736/foundercentral_49862_A_creative_collage_of_images_representing__3f8e7d52-8fb3-432e-b34d-f44aebce3f8b.webp?ex=65ac7a9a&is=659a059a&hm=f01d11c95d0691d47ba2b44daf965115e7b94a58e050478170cb850bad62732a&",
    date: "2024-01-06",
    published: true,
  },
  {
    title: "How To Grow Your Newsletter",
    description: "Mastering email growth",
    image:
      "https://cdn.discordapp.com/attachments/1190437037665439767/1198772152917307554/foundercentral_49862_a_successful_email_newsletter_with_money_2138e2dc-8df3-4117-ad7b-9d8f3b10dc67.png?ex=65c01e91&is=65ada991&hm=cc84a8ef4ccf87dff0eb5c5925c9e8b8a6fae79779bc2c44b737073cab41e2d6&",
    date: "2024-01-11",
    published: true,
  },
];
