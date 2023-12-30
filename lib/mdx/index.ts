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
  published: boolean;
}

export const getPostBySlug = async (
  slug: string
): Promise<{
  meta: Meta;
  content: ReactElement<any, string | JSXElementConstructor<any>>;
}> => {
  const realSlug = slug.replace(/\.md$/, "");
  const fullPath = path.join(rootDirectory, `${realSlug}.md`);

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
    if (meta?.published) posts.push(meta);
  }

  return posts;
};
