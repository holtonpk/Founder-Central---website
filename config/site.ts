import {SiteConfig} from "@/types";
import pagesConfig from "@/config/pagesConfig.json";

export const siteConfig: SiteConfig = {
  name: "Founder Central",
  title: "Founder Central",
  description: "Unlock the secrets of business legends with Founder Central",
  businessName: "Founder Central",
  url: process.env.NEXT_PUBLIC_SITE_URL as string,
  logo: "",
  links: {
    instagram: "https://www.instagram.com/shortformbooks",
    youtube: "https://www.youtube.com/@officialsnapshotsofsuccess",
    tiktok: "https://www.tiktok.com/@Shortformbooks",
  },
  contact: {
    supportEmail: "",
  },
  emailLists: {
    book1: "RMBhiE",
    newsletter: "QSiDXT",
  },
  pages: pagesConfig,
};
