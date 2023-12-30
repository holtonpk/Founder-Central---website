import Link from "next/link";
import {getAllPostsMeta} from "@/lib/mdx";
import Image from "next/image";
import {formatDate} from "@/lib/utils";
const Page = async () => {
  const posts = await getAllPostsMeta();

  const sortedPosts = posts.sort((a, b) => {
    return Number(b.date) - Number(a.date);
  });

  return (
    <div className="container max-w-4xl py-6 lg:pb-10 pt-28">
      <div className="flex flex-col items-start gap-4 md:flex-row md:justify-between md:gap-8">
        <div className="flex-1 space-y-4">
          <h1 className="inline-block font-heading text-4xl tracking-tight lg:text-5xl text-theme-blue font-head font-bold">
            The Founder Blog
          </h1>
          <p className="text-xl text-muted-foreground font-body">
            Get the latest news and updates from the team at Founder Central
          </p>
        </div>
      </div>
      <hr className="my-8" />
      {posts?.length ? (
        <div className="grid gap-10 sm:grid-cols-2">
          {sortedPosts.map((post, index) => (
            <article
              key={index}
              className="group relative flex flex-col space-y-2"
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
                  {formatDate(Number(post.date))}
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
      ) : (
        <p>No posts published.</p>
      )}
    </div>
  );
};

export default Page;
