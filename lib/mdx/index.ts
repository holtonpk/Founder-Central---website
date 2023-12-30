import fs from "fs";
import path from "path";
import {compileMDX} from "next-mdx-remote/rsc";
import {ReactElement, JSXElementConstructor} from "react";
import {cn} from "@/lib/utils";
import {components} from "@/app/(client)/components/ui/mdx-components";
const rootDirectory = path.join(process.cwd(), "app", "content");

interface Meta {
  title: string;
  description: string;
  date: string;
  image: string;
  slug: string;
}

export const getPostBySlug = async (
  slug: string
): Promise<{
  meta: Meta;
  content: ReactElement<any, string | JSXElementConstructor<any>>;
}> => {
  const realSlug = slug.replace(/\.mdx$/, "");
  const fullPath = path.join(rootDirectory, `${realSlug}.mdx`);

  const fileContents = fs.readFileSync(fullPath, "utf8") as string;

  const {frontmatter, content} = await compileMDX({
    source: fileContents,
    options: {parseFrontmatter: true},
    components: {
      ...(components as any),
    },
  });

  return {meta: {...frontmatter, slug: realSlug} as Meta, content};
};

export const getAllPostsMeta = async () => {
  const files = fs.readdirSync(rootDirectory);

  let posts = [];

  for (const file of files) {
    const {meta} = await getPostBySlug(file);
    posts.push(meta);
  }

  return posts;
};

// interface HeadingProps {
//   children: React.ReactNode;
//   className?: string;
// }

// export function H1({ children, className, ...props }: HeadingProps) {
//   return (
//     <h1
//       className={cn('mt-2 scroll-m-20 text-4xl font-bold tracking-tight ', className)}
//       {...props}
//     >
//       {children}
//     </h1>
//   );
// }

// function H2({children, className, ...props}) {
//   return (
//     <h2
//       className={cn(
//         "mt-10 scroll-m-20 border-b pb-1 text-3xl font-semibold tracking-tight first:mt-0",
//         className
//       )}
//       {...props}
//     >
//       {children}
//     </h2>
//   );
// }
// function H3({children, className, ...props}) {
//   return (
//     <h3
//       className={cn(
//         "mt-8 scroll-m-20 text-2xl font-semibold tracking-tight",
//         className
//       )}
//       {...props}
//     >
//       {children}
//     </h3>
//   );
// }
// function H4({children, className, ...props}) {
//   return (
//     <h4
//       className={cn(
//         "mt-8 scroll-m-20 text-xl font-semibold tracking-tight",
//         className
//       )}
//       {...props}
//     >
//       {children}
//     </h4>
//   );
// }
// function H5({children, className, ...props}) {
//   return (
//     <h5
//       className={cn(
//         "mt-8 scroll-m-20 text-lg font-semibold tracking-tight",
//         className
//       )}
//       {...props}
//     >
//       {children}
//     </h5>
//   );
// }
// function H6({children, className, ...props}) {
//   return (
//     <h6
//       className={cn(
//         "mt-8 scroll-m-20 text-base font-semibold tracking-tight",
//         className
//       )}
//       {...props}
//     >
//       {children}
//     </h6>
//   );
// }
// function A({children, className, ...props}) {
//   return (
//     <a
//       className={cn("font-medium underline underline-offset-4", className)}
//       {...props}
//     >
//       {children}
//     </a>
//   );
// }
// function Blockquote({children, className, ...props}) {
//   return (
//     <blockquote
//       className={cn(
//         "mt-6 border-l-2 pl-6 italic [&>*]:text-muted-foreground",
//         className
//       )}
//       {...props}
//     >
//       {children}
//     </blockquote>
//   );
// }
// function Img({
//   className,
//   alt,
//   ...props
// }: React.ImgHTMLAttributes<HTMLImageElement>) {
//   // eslint-disable-next-line @next/next/no-img-element
//   return (
//     <img className={cn("rounded-md border", className)} alt={alt} {...props} />
//   );
// }
// function Hr({...props}) {
//   return <hr className="my-4 md:my-8" {...props} />;
// }
// function Table({className, ...props}: React.HTMLAttributes<HTMLTableElement>) {
//   return (
//     <div className="my-6 w-full overflow-y-auto">
//       <table className={cn("w-full", className)} {...props} />
//     </div>
//   );
// }
// function Tr({className, ...props}: React.HTMLAttributes<HTMLTableRowElement>) {
//   return (
//     <tr
//       className={cn("m-0 border-t p-0 even:bg-muted", className)}
//       {...props}
//     />
//   );
// }
// function Th({className, ...props}) {
//   return (
//     <th
//       className={cn(
//         "border px-4 py-2 text-left font-bold [&[align=center]]:text-center [&[align=right]]:text-right",
//         className
//       )}
//       {...props}
//     />
//   );
// }
// function Td({className, ...props}) {
//   return (
//     <td
//       className={cn(
//         "border px-4 py-2 text-left [&[align=center]]:text-center [&[align=right]]:text-right",
//         className
//       )}
//       {...props}
//     />
//   );
// }
// function Pre({className, ...props}) {
//   return (
//     <pre
//       className={cn(
//         "mb-4 mt-6 overflow-x-auto rounded-lg border bg-black py-4",
//         className
//       )}
//       {...props}
//     />
//   );
// }
// function Code({className, ...props}) {
//   return (
//     <code
//       className={cn(
//         "relative rounded border px-[0.3rem] py-[0.2rem] font-mono text-sm",
//         className
//       )}
//       {...props}
//     />
//   );
// }
// function Ol({children, className, ...props}) {
//   return (
//     <ol className={cn("my-6 ml-6 list-decimal", className)} {...props}>
//       {children}
//     </ol>
//   );
// }
// function Li({children, className, ...props}) {
//   return (
//     <li className={cn("mt-2", className)} {...props}>
//       {children}
//     </li>
//   );
// }

// function Card({children, className, ...props}) {
//   return (
//     <div
//       className={cn(
//         "relative p-6 bg-white rounded-lg shadow-md overflow-hidden",
//         className
//       )}
//       {...props}
//     >
//       {children}
//     </div>
//   );
// }

// function Ul({children, className, ...props}) {
//   return (
//     <ul className={cn("my-6 ml-6 list-disc    ", className)} {...props}>
//       {children}
//     </ul>
//   );
// }

// function P({children, className, ...props}) {
//   return (
//     <p
//       className={cn("leading-7 [&:not(:first-child)]:mt-6 ", className)}
//       {...props}
//     >
//       {children}
//     </p>
//   );
// }
