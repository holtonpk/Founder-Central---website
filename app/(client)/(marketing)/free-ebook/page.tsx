import React, {useEffect} from "react";
import {siteConfig} from "@/config/site";
import Product from "./product";

interface Props {
  products: any;
  data: any;
}
import {constructMetadata} from "@/lib/utils";
import {Metadata} from "next";

type Params = {
  params: {
    handle: string;
  };
};

export async function generateMetadata({
  params: {handle},
}: Params): Promise<Metadata> {
  return constructMetadata({
    title: "The 50 Greatest Business Success Stories",
    description:
      "Ever wondered how the most successful entrepreneurs of our time transformed their dreams into reality? How they faced adversity, overcame hurdles, and pioneered industries? Get ready for an inspiring journey through the triumphs and trials of the business world's biggest success stories.",
  });
}

export default async function ProductPage2({params}: Params) {
  // const data = await getData(params.handle);
  return (
    <div className="min-h-screen  flex flex-col justify-between ">
      <Product productData={StaticProductDetail} />
    </div>
  );
}

type ProductInfo = {
  reviews: {
    id: string;
    name: string;
    email: string;
    productId: string;
    rating: number;
    date: number;
    title: string;
    body: string;
  }[];
  data: {
    productByHandle: {
      title: string;
      id: string;
      handle: string;
      descriptionHtml: string;
      collections: {
        edges: {
          node: {
            title: string;
          };
        }[];
      };
      totalInventory: number;
      ratingAverage: number | null;
      ratingCount: number | null;
      productReviews: any | null; // You can replace 'any' with a more specific type
      variants: {
        edges: {
          node: {
            id: string;
            title: string;
            quantityAvailable: number;
            priceV2: {
              amount: string;
              currencyCode: string;
            };
            compareAtPriceV2: {
              amount: string;
              currencyCode: string;
            };
          };
        }[];
      };
      priceRange: {
        maxVariantPrice: {
          amount: string;
          currencyCode: string;
        };
        minVariantPrice: {
          amount: string;
          currencyCode: string;
        };
      };
      images: {
        edges: {
          node: {
            src: string;
            altText: string | null;
          };
        }[];
      };
    };
  };
};

const StaticProductDetail = {
  product: {
    id: "gid://shopify/Product/9015924621628",
    title: "The 50 Greatest Business Success Stories Ebook",
    description:
      '<meta charset="utf-8">\n<div>\n<meta charset="utf-8"> <span>Ever wondered how the most successful entrepreneurs of our time transformed their dreams into reality? How they faced adversity, overcame hurdles, and pioneered industries? Get ready for an inspiring journey through the triumphs and trials of the business world\'s biggest success stories.</span><br><br><span>"Snapshots of Success" is not just a book; it\'s a thrilling masterclass in innovation and grit. Each page is a treasure trove of insights from 50 of the most impactful business journeys, distilled into riveting, short-form narratives.</span><br><br><span>This unique compilation is perfect for anyone who craves inspiration and insight but struggles to find the time to sift through lengthy biographies and business texts. Each tale is meticulously crafted to be devoured in just 15-20 minutes - a perfect fit for your coffee break or when you need a shot of motivation.</span><br><br><span>So, whether you\'re an aspiring entrepreneur seeking guidance, a business veteran hunting for inspiration, or just someone who enjoys captivating stories, this book is your ticket to a world of exciting entrepreneurial journeys.</span><br><span>Dive in and discover how empires were built, fortunes were made, and how you, too, can etch your name in the annals of business history.</span>\n</div>',
    collection: "Snapshots of success",
    quantityAvailable: 100000,
    images: [
      {
        node: {
          src: "https://cdn.shopify.com/s/files/1/0832/2518/2524/files/Group88_1_de24aa24-7937-4a3e-baf4-8c613af6547d.png?v=1703103593",
          altText: null,
        },
      },
      {
        node: {
          src: "https://cdn.shopify.com/s/files/1/0832/2518/2524/files/open41_2_d0fcff69-5052-490b-a658-8cf0e0f5a844.png?v=1703103594",
          altText: null,
        },
      },
      {
        node: {
          src: "https://cdn.shopify.com/s/files/1/0832/2518/2524/files/open31_2_d5a99b67-5224-48e7-8454-8d4ca0165263.png?v=1703103594",
          altText: null,
        },
      },
      {
        node: {
          src: "https://cdn.shopify.com/s/files/1/0832/2518/2524/files/Group128_0cd597a8-2a52-4469-a551-f96626106ee3.png?v=1703103594",
          altText: null,
        },
      },
    ],
    imageSrc:
      "https://cdn.shopify.com/s/files/1/0832/2518/2524/files/Group88_1_de24aa24-7937-4a3e-baf4-8c613af6547d.png?v=1703103593",
    imageAlt: "The 50 Greatest Business Success Stories Ebook",
    price: {amount: "0.0", currencyCode: "USD"},
    compareAtPrice: {amount: "9.99", currencyCode: "USD"},
    variants: [
      {
        id: "gid://shopify/ProductVariant/48191665111356",
        title: "E-Book",
        quantityAvailable: 100000,
        priceV2: {amount: "0.0", currencyCode: "USD"},
        compareAtPriceV2: {amount: "9.99", currencyCode: "USD"},
      },
    ],
    reviews: [
      {
        live: true,
        date: 1697513487718,
        title: "Good book ",
        email: "holtonpk@gmail.com",
        name: "Patrick",
        body: "The book quality isnt the best but I like how short the stories are, makes it easier to read. ",
        productId: "gid://shopify/Product/8732971761980",
        rating: 4,
        id: "Bcwyr9S720yge0Mp51Si",
      },
      {
        live: true,
        rating: 3,
        name: "EmmaBee",
        productId: "gid://shopify/Product/8732971761980",
        title: "So far so good",
        body: " Super cool stories! Just kinda wished they had a few more from the olden times.",
        email: "itsmohamedmomar@gmail.com",
        // date: 1697152811000,
        date: 1697325611000,

        id: "Cvt85MmarHItcSLRguYI",
      },
      {
        rating: 4,
        email: "itsmohamedmomar@gmail.com",
        productId: "gid://shopify/Product/8732971761980",
        date: 1697152811000,

        body: "I've enjoyed it so far almost done. Is there be a 2nd book?",
        live: true,
        title: "Why not 100",
        name: "Oscar_Techie",
        id: "D1vkFB3aTpddBlK1NqaS",
      },
      {
        rating: 5,
        body: "I thought it was a great book with many takeaways. Worth the read.",
        email: "itsmohamedmomar@gmail.com",
        productId: "gid://shopify/Product/8732971761980",
        name: "Eric ",
        live: true,
        title: "No B.S",
        date: 1697152811000,

        id: "VpcH1wyUWbt5cmLtSkUY",
      },
      {
        title: "Was worth the wait.",
        date: 1697584811000,
        name: "Jared_Valley",
        body: "Great stuff in here! Some of these stories got me rethinking my business strategy.",
        rating: 4,
        email: "itsmohamedmomar@gmail.com",
        productId: "gid://shopify/Product/8732971761980",
        live: true,
        id: "nkGmRH2ogeObYc0Rp9NG",
      },
      // {
      //   live: true,
      //   date: 1698016811000,
      //   body: "GOod mix of old timers and newbies.",
      //   productId: "gid://shopify/Product/8732971761980",
      //   title: "Pretty dope collection. ",
      //   email: "itsmohamedmomar@gmail.com",
      //   rating: 5,
      //   name: "AJ",
      //   id: "s6JCozocATzi4CuGuucp",
      // },
      {
        body: "the stories are pretty inspirational gets me going whenever im not feeling it. ",
        rating: 4,
        live: true,
        date: 1697930411000,

        title: "pick it up when im feeling down",
        email: "itsmohamedmomar@gmail.com",
        name: "Mohamed Mohamed",
        productId: "gid://shopify/Product/8732971761980",
        id: "xGbSMmi8w8tnZKHWj1m0",
      },
    ],
  },
};
