import {getAllPostsMeta} from "@/lib/mdx";

export default async function sitemap() {
  const baseUrl =
    process.env.NEXT_PUBLIC_SITE_URL || "https://www.foundercentral.co";

  const blogPosts = await getAllPostsMeta();

  const blogUrls = blogPosts.map((post) => {
    return {
      url: `${baseUrl}/blog/${post.slug}`,
      lastModified: new Date(post.date).toISOString(),
    };
  });

  return [
    {
      url: baseUrl,
      lastModified: new Date().toISOString(),
    },
    {
      url: `${baseUrl}/about`,
      lastModified: new Date().toISOString(),
    },
    {
      url: `${baseUrl}/work-with-us`,
      lastModified: new Date().toISOString(),
    },
    {
      url: `${baseUrl}/contact`,
      lastModified: new Date().toISOString(),
    },
    {
      url: `${baseUrl}/books/shop/snapshots-of-success-the-50-greatest-business-success-stories`,
      lastModified: new Date().toISOString(),
    },
    ...blogUrls,
  ];
}
