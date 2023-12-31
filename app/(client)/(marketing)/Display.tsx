"use client";
import Link from "next/link";
import React from "react";
import {Icons} from "@/app/(client)/components/icons";
import {Button} from "@/app/(client)/components/ui/button";
import Image from "next/image";

type DisplayedProduct = {
  title: string;
  available: boolean;
  id: number;
  image: string;
  href: string;
  color: string;
};

const Display = () => {
  const displayedProducts: DisplayedProduct[] = [
    // update these
    {
      id: 1,
      title: "Business Success Stories",
      available: true,
      image: "/image/cover.png",
      href: "/books/shop/snapshots-of-success-the-50-greatest-business-success-stories",
      color: "theme-blue",
    },
    {
      id: 2,
      title: "The 50 Most Iconic Marketing Campaigns of All Time",
      available: false,

      image: "/image/coming_soon-cover.svg",
      href: "/products/1",
      color: "theme-pink",
    },
    {
      id: 3,
      title: "The 50 Most Intense Business Rivalries",
      available: false,

      image: "/image/coming_soon-cover.svg",
      href: "/products/1",
      color: "theme-purple",
    },
    {
      id: 4,
      title: "The 50 Most Genius Business Deals",
      available: false,

      image: "/image/coming_soon-cover.svg",
      href: "/products/1",
      color: "theme-yellow",
    },
    {
      id: 5,
      title: "The 50 Most Notorious Business Scams and Failures",
      available: false,

      image: "/image/coming_soon-cover.svg",
      href: "/products/1",
      color: "theme-blue",
    },
  ];

  const [displayedCards, setDisplayedCards] = React.useState<number[]>([
    1, 2, 3, 4,
  ]);

  const [selectedCard, setSelectedCard] = React.useState(2);
  const [startIndex, setStartIndex] = React.useState(0);

  const moveCarousel = (direction: "left" | "right") => {
    const increment = direction === "left" ? -1 : 1;
    const newIndex =
      (startIndex + increment + displayedProducts.length) %
      displayedProducts.length;
    setStartIndex(newIndex);
  };

  const visibleProducts = [];
  for (let i = startIndex; i < startIndex + 4; i++) {
    const product = displayedProducts[i % displayedProducts.length];
    visibleProducts.push(product);
  }

  return (
    <div
      id="Display"
      className="pt-20 relative pb-10  flex flex-col items-center "
    >
      <h1
        id="Display-Title"
        className="text-theme-blue  font-bold  text-4xl lg:text-5xl text-center relative z-20 px-10"
      >
        Business Book series
      </h1>

      <div
        id="desktopView"
        className="hidden md:grid md:grid-cols-4 grid-flow-col  gap-8  mx-auto relative z-10 mt-10 mb-4 justify-between w-[80%]   bg-theme-blue/10 rounded-lg h-[432px]  p-4"
      >
        <Button
          id={"display-desktop-button-right"}
          variant={"blue"}
          onClick={() => moveCarousel("right")}
          className="absolute top-1/2 -right-20 z-20 w-fit"
        >
          <Icons.arrowRight className="h-5 w-5 " />
        </Button>
        <Button
          id={"display-desktop-button-left"}
          variant={"blue"}
          onClick={() => moveCarousel("left")}
          className="absolute top-1/2 -left-20 z-20 w-fit"
        >
          <Icons.arrowRight className="h-5 w-5 rotate-180" />
        </Button>
        {visibleProducts.map((product, i) => (
          <ProductCardDesktop
            key={product.id}
            product={product}
            selectedCard={selectedCard}
            setSelectedCard={setSelectedCard}
          />
        ))}
      </div>

      <div
        id="mobileDisplayScrollBox"
        className="w-screen overflow-x-scroll no-scrollbar snap-x snap-mandatory grid md:hidden grid-flow-col overflow-hidden   mx-auto relative z-10 mt-10 mb-4 justify-between px-20    rounded-lg h-[432px]  p-4 "
      >
        {displayedProducts.map((product, i) => (
          <ProductCardMobile key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default Display;

const ProductCardDesktop = ({
  product,
  selectedCard,
  setSelectedCard,
}: {
  product: DisplayedProduct;
  selectedCard: number;
  setSelectedCard: React.Dispatch<React.SetStateAction<number>>;
}) => {
  return (
    <div
      id={`product-card-desktop-${product.id}`} // Block ID
      onMouseEnter={() => setSelectedCard(product.id)}
      className="product-card-desktop flex h-[350px] w-full relative  flex-col items-center group "
    >
      <Link
        href={`${product.href}`}
        className="w-full h-full absolute  group z-20"
      />
      <div
        id={`product-card-content-desktop-${product.id}`} // Element ID
        className={`product-card-content w-full  rounded-lg relative p-2 delay-[100ms] flex items-center flex-col transition-all  duration-500 cursor-pointer
          ${
            product.id === selectedCard
              ? `bg-${product.color} py-4 h-[400px]`
              : " pt-0 h-[400px] "
          }
        `}
      >
        <Link
          href={product.href}
          id={`product-card-image-desktop-title-${product.id}`} // Element ID
          className={`product-title font-head   h-20  font-bold text-center text-base  w-full hover:underline  group-hover:underline delay-[100ms]
            ${product.id === selectedCard ? "text-white" : `black`}
          `}
        >
          {product.title}
        </Link>

        <div
          id={`product-card-image-desktop-${product.id}`} // Element ID
          className={`relative z-10 p-4 py-6 rounded-md  w-full left-1/2 -translate-x-1/2  transition-all duration-500 bg-theme-1  delay-[100ms]
            ${
              product.id === selectedCard
                ? "h-[350px] bg-white/10"
                : "bg-theme-blue/10 h-[350px] "
            }
          `}
        >
          <div
            id={`product-card-image-desktop-image-${product.id}`} // Element ID
            className="w-full h-full relative z-10"
          >
            <Image src={product.image} alt="cover" fill objectFit="contain" />
          </div>
        </div>
        <div className="h-fit mt-4 relative w-full  gap-2 transition-all duration-100 justify-between items-center delay-[100ms] z-30 ">
          <Button
            id={`product-card-image-desktop-button-${product.id}`} // Element ID
            variant={"outline"}
            className={`w-full text-white border-white hover:bg-white hover:text-black   h-fit items-center delay-[100ms]  
              ${product.id === selectedCard ? " visible" : " invisible"}
            `}
          >
            {product.available ? "Buy Now" : "Jump the line"}
          </Button>
        </div>
      </div>
    </div>
  );
};

const ProductCardMobile = ({product}: {product: DisplayedProduct}) => {
  const [centerPosition, setCenterPosition] = React.useState(
    product.id == 1 ? 0 : 1000
  );
  const cardRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    const handleScroll = () => {
      const center = window.innerWidth / 2;
      const card = cardRef.current;
      if (card) {
        const cardPosition = card.getBoundingClientRect().left;
        const cardCenter = cardPosition + card.offsetWidth / 2;
        const distance = center - cardCenter;
        setCenterPosition(distance);
      }
    };

    const scrollBox = document.getElementById("mobileDisplayScrollBox");
    if (scrollBox) {
      scrollBox.addEventListener("scroll", handleScroll);
      return () => scrollBox.removeEventListener("scroll", handleScroll);
    }
  }, [product.id]);

  return (
    <div
      id={`product-card-mobile-${product.id}`} // Block ID
      ref={cardRef}
      className="product-card-mobile flex w-[300px]   h-fit relative px-2 flex-col items-center group snap-center "
    >
      <Link
        href={`${product.href}`}
        className="w-full h-full absolute  group z-20"
      />
      <div
        id={`product-card-content-mobile-${product.id}`} // Element ID
        className={`product-card-content w-full  rounded-lg relative p-2 delay-[100ms] flex items-center flex-col transition-all  duration-500 cursor-pointer
          ${
            centerPosition < 150 && centerPosition > -150
              ? `bg-${product.color} py-4 h-[400px] `
              : " pt-0 h-[400px] "
          }
        `}
      >
        <Link
          id={`product-card-content-mobile-title-${product.id}`} // Element ID
          href={product.href}
          className={`product-title font-head   h-12  font-bold text-center text-base  w-full hover:underline  group-hover:underline delay-[100ms]
            ${
              centerPosition < 150 && centerPosition > -150
                ? "text-white"
                : `black`
            }
          `}
        >
          {product.title}
        </Link>

        <div
          id={`product-card-image-mobile-${product.id}`} // Element ID
          className={`relative z-10 p-4 py-6 rounded-md  w-full left-1/2 -translate-x-1/2   bg-theme-1  delay-[100ms]
            ${
              centerPosition < 150 && centerPosition > -150
                ? "flex-grow bg-white/10"
                : "bg-theme-blue/10 flex-grow "
            }
          `}
        >
          <div
            id={`product-card-content-mobile-productimage-${product.id}`} // Element ID
            className="w-full h-full relative z-10"
          >
            <Image src={product.image} alt="cover" fill objectFit="contain" />
          </div>
        </div>
        <div className="h-fit mt-4 relative w-full  gap-2 transition-all duration-100 justify-between items-center delay-[100ms] z-30 ">
          <Button
            id={`product-card-content-mobile-button-${product.id}`} // Element ID
            variant={"outline"}
            className={`product-button text-white border-white   hover:bg-white hover:text-black w-full transition-all duration-500   h-fit items-center delay-[100ms] 
            ${
              centerPosition < 150 && centerPosition > -150
                ? " visible"
                : " invisible"
            }
          `}
          >
            {product.available ? "Buy Now" : "Jump the line"}
          </Button>
        </div>
      </div>
    </div>
  );
};
