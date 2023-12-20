"use client";
import Image from "next/image";
import React, {useEffect} from "react";
import {Button} from "@/app/(client)/components/ui/button";
import {LinkButton} from "@/app/(client)/components/ui/link";
import {useStorage} from "@/context/storage";
import {toast, useToast} from "@/app/(client)/components/ui/use-toast";
import {Input} from "@/app/(client)/components/ui/input";
import {siteConfig} from "@/config/site";
import {useCart} from "@/context/cart";
import {useRouter} from "next/navigation";
import {getCheckoutLink} from "@/app/(client)/components/cart-preview";
import Iphone from "@/public/image/iphone.png";
import {Progress} from "@/app/(client)/components/ui/progress";
import {cn} from "@/lib/utils";
import {Label} from "@/app/(client)/components/ui/label";
import {Textarea} from "@/app/(client)/components/ui/textarea";
import {logEvent} from "firebase/analytics";

import VideoDisplay from "./videoDisplay";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/app/(client)/components/ui/accordion";
import {timeSince} from "@/lib/utils";
import {is} from "date-fns/locale";
import {set} from "date-fns";
import Link from "next/link";
import {Icons} from "@/app/(client)/components/icons";
import {motion} from "framer-motion";
import QuickLook from "./quick-look";
// import previewVideo from "@/public/video/Video1.mp4";

export default function Product({productData}: {productData: any}) {
  const product = productData.product;
  const [selectedVariant, setSelectedVariant] = React.useState(
    product.variants[0]
  );
  const productRating =
    product.reviews.reduce((acc: number, review: any) => {
      return acc + review.rating;
    }, 0) / product.reviews.length;

  const [accordionValue, setAccordionValue] = React.useState<string[]>([]);

  const Router = useRouter();

  const jumpToReviews = () => {
    setAccordionValue([...accordionValue, "reviews"]);
    Router.push("#product-reviews");
  };

  return (
    <>
      {/* <Header /> */}

      <div
        id="product"
        className="w-screen  overflow-hidden  md:mt-20 pb-20 bg-white md:bg-background "
      >
        <div
          id="product-box"
          className="grid md:grid-cols-[45%_55%] items-center md:items-start  md:container   mx-auto  "
        >
          <div className="md:hidden block">
            <ProductImagesMobile product={product} />
          </div>
          <div className="hidden md:block ">
            <ProductImages product={product} />
          </div>

          <div
            id="product-saleBox-container"
            className="flex flex-col  p-4 md:p-10 gap-2 md:gap-4 relative  mt-4"
          >
            <h1
              id="product-title-header"
              className="text-black text-2xl md:text-4xl  font-head font-bold "
            >
              {product.title}
            </h1>
            <span
              id="product-collection-header"
              className="text-base md:text-xl   uppercase font-body text-theme-blue "
            >
              {product.collection}
            </span>

            {product.quantityAvailable > 0 ? (
              <SaleBox
                selectedVariant={selectedVariant}
                setSelectedVariant={setSelectedVariant}
                product={product}
                jumpToReviews={jumpToReviews}
                productRating={productRating}
              />
            ) : (
              <div id="product-action-unavailable">
                Sorry this book is unavailable at the moment. Please sign up for
                the waitlist below and we will notify you when it is ready.
                <EmailForm />
              </div>
            )}
          </div>
        </div>
        <Accordion
          type="multiple"
          value={accordionValue}
          onValueChange={setAccordionValue}
          className="w-[90%] mx-auto"
        >
          <AccordionItem value="overview" id="product-overview">
            <AccordionTrigger
              id="product-overview-trigger"
              className="underline-0"
            >
              Book Overview
            </AccordionTrigger>
            <AccordionContent id="product-overview-content">
              <h1 className="my-3 font-bold">
                The book includes stories of the following entrepreneurs:
              </h1>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                {storyNames.map((name) => (
                  <div className="font-bold" key={name}>
                    -{name}
                  </div>
                ))}
              </div>
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="details" id="product-details">
            <AccordionTrigger
              id="product-details-trigger"
              className="underline-0"
            >
              Details
            </AccordionTrigger>
            <AccordionContent id="product-delivery-details-content">
              <div className="grid grid-cols-2  sm:w-1/2 sm:mx-auto gap-4 bg-theme-blue/20 p-4 rounded-md">
                <h1 className="font-bold">Publisher:</h1>
                <h2 className="">Founder Central</h2>
                <h1 className="font-bold">Publication date:</h1> 10/9/2023
                <h1 className="font-bold">Pages:</h1> 165
                <h1 className="font-bold">Book dimensions:</h1> (6 x 9 in / 152
                x 229 mm)
              </div>
            </AccordionContent>
          </AccordionItem>
          {/* <AccordionItem value="shipping" id="product-delivery-details">
            <AccordionTrigger
              id="product-delivery-details-trigger"
              className="underline-0"
            >
              Shipping & Delivery
            </AccordionTrigger>
            <AccordionContent id="product-delivery-details-content">
              Shipping usually takes 5-7 business days. We ship to all countries
            </AccordionContent>
          </AccordionItem> */}
        </Accordion>
        <VideoDisplay selectedVariant={selectedVariant} product={product} />
        <Reviews
          productRating={productRating}
          productId={product.id}
          reviews={product.reviews}
        />
      </div>
    </>
  );
}

type Review = {
  id: string;
  name: string;
  email: string;
  productId: string;
  rating: number;
  date: number;
  title: string;
  body: string;
};

const Reviews = ({
  productRating,
  productId,
  reviews,
}: {
  productRating: number;
  productId: string;
  reviews: Review[];
}) => {
  const {SaveReview} = useStorage()!;

  // create a review

  const [writeReview, setWriteReview] = React.useState<boolean>(false);
  const [ratingValue, setRatingValue] = React.useState<number>(5);
  const [isLoading, setIsLoading] = React.useState<boolean>(false);

  const nameInputRef = React.useRef<HTMLInputElement>(null);
  const emailInputRef = React.useRef<HTMLInputElement>(null);
  const titleInputRef = React.useRef<HTMLInputElement>(null);
  const bodyInputRef = React.useRef<HTMLTextAreaElement>(null);

  const saveReview = async () => {
    setIsLoading(true);
    if (
      !nameInputRef.current!.value ||
      !emailInputRef.current!.value ||
      !titleInputRef.current!.value ||
      !bodyInputRef.current!.value
    ) {
      toast({
        title: "You left one or more fields blank",
        description: "Please fill out all fields to leave a review",
        variant: "destructive",
      });
      setIsLoading(false);
      return;
    }

    await SaveReview(
      nameInputRef.current!.value,
      productId,
      emailInputRef.current!.value,
      ratingValue,
      Date.now(),
      titleInputRef.current!.value,
      bodyInputRef.current!.value
    );

    toast({
      title: "Thanks for your review!",
      description: "Your review will be posted shortly.",
    });
    setIsLoading(false);
    setWriteReview(false);
  };

  const orderedReviews: Review[] = reviews.sort((a, b) => b.date - a.date);

  return (
    <div
      id="product-reviews-container"
      className="w-full flex flex-col gap-4 mt-10 items-center md:container "
    >
      <h1 className="  font-head font-bold text-center px-4  text-4xl lg:text-5xl  text-theme-blue">
        What people are saying
      </h1>

      <div className="grid-cols-3 hidden md:grid">
        {orderedReviews.slice(0, 6).map((review, i) => (
          <div
            id={`product-reviews-review-${review.id}`}
            key={review.id}
            className="flex flex-col items-center  md:px-6 p-4 md:py-10 gap-2 rounded-lg w-[90%] bg-background mt-6 bg-white"
          >
            <div className="w-full aspect-[1/.9]  rounded-lg overflow-hidden  relative bg-background">
              <Image
                alt="Review Image"
                src={reviewImages[i]}
                fill
                objectFit="contain"
                className="rounded-lg overflow-hidden "
              />
            </div>
            <div
              id={`product-reviews-review-${review.id}-rating`}
              className="flex items-center gap-1   w-fit "
            >
              <Stars rating={review.rating} />({review.rating})
            </div>

            <h1
              id={`product-reviews-review-${review.id}-title`}
              className="text-xl font-bold bg-theme-blue/10 px-2 text-center"
            >
              {review.title}
            </h1>
            <p
              id={`product-reviews-review-${review.id}-body`}
              className="text-muted-foreground text-center"
            >
              {review.body}
            </p>
            <p
              id={`product-reviews-review-${review.id}-authorDate`}
              className="text-base font-bold"
            >
              {review.name}
            </p>
            <div className="flex flex-row gap-2 font-bold text-theme-blue">
              <Icons.badgeCheck className="h-6 w-6 text-theme-blue" />
              Verified Buyer
            </div>
          </div>
        ))}
      </div>
      <MobileReviews orderedReviews={orderedReviews} />
    </div>
  );
};

const MobileReviews = ({orderedReviews}: {orderedReviews: Review[]}) => {
  const [displayedReview, setDisplayedReview] = React.useState<number>(0);
  const scrollAreaRef = React.useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const scrollArea = scrollAreaRef.current;

    if (scrollArea) {
      const handleScroll = () => {
        const scrollSnapPoints = Array.from(
          scrollArea.querySelectorAll(".snap-center")
        );
        const scrollLeft = scrollArea.scrollLeft;
        const containerWidth = scrollArea.offsetWidth;

        for (let i = 0; i < scrollSnapPoints.length; i++) {
          const image = scrollSnapPoints[i];
          const {left, width} = image.getBoundingClientRect();
          const rightEdgePosition = left + width;

          // Check if the right edge&apos;s left position is greater than half of the container width
          if (rightEdgePosition > containerWidth / 2) {
            setDisplayedReview(i);
            break; // No need to check the rest
          }
        }
      };

      scrollArea.addEventListener("scroll", handleScroll);
      handleScroll(); // Initial check

      return () => {
        scrollArea.removeEventListener("scroll", handleScroll);
      };
    }
  }, []);

  const NextReview = () => {
    const scrollArea = scrollAreaRef.current;
    if (scrollArea) {
      const scrollSnapPoints = Array.from(
        scrollArea.querySelectorAll(".snap-center")
      );
      if (displayedReview < scrollSnapPoints.length - 1) {
        setDisplayedReview(displayedReview + 1);
        scrollArea.scrollBy({
          left:
            scrollSnapPoints[displayedReview + 1].getBoundingClientRect().left -
            16,
          behavior: "smooth",
        });
      }
    }
  };

  const PreviousReview = () => {
    const scrollArea = scrollAreaRef.current;
    if (scrollArea) {
      const scrollSnapPoints = Array.from(
        scrollArea.querySelectorAll(".snap-center")
      );
      if (displayedReview > 0) {
        setDisplayedReview(displayedReview - 1);
        scrollArea.scrollBy({
          left:
            scrollSnapPoints[displayedReview - 1].getBoundingClientRect().left -
            16,
          behavior: "smooth",
        });
      }
    }
  };

  return (
    <div className="relative md:hidden">
      <div
        className="w-screen hideScrollbar snap-mandatory snap-x overflow-scroll grid grid-flow-col items-center z-20 px-20 relative review gap-4 pb-4 "
        ref={scrollAreaRef}
      >
        {orderedReviews.slice(0, 6).map((review, i) => (
          <div
            id={`product-reviews-review-${review.id}`}
            key={review.id}
            className="flex flex-col items-center  md:px-6 p-4 md:py-10 gap-2 rounded-lg   bg-background  snap-center review  relative h-[430px] w-[350px] "
          >
            <div className=" w-full aspect-[1.5/1]  rounded-lg overflow-hidden  relative ">
              <Image
                alt="Review Image"
                src={reviewImages[i]}
                fill
                objectFit="contain"
                className={`rounded-lg overflow-hidden `}
              />
            </div>
            <div
              id={`product-reviews-review-${review.id}-rating`}
              className="flex items-center gap-1   w-fit "
            >
              <Stars rating={review.rating} />({review.rating})
            </div>

            <h1
              id={`product-reviews-review-${review.id}-title`}
              className="text-xl font-bold  px-2 text-center"
            >
              {review.title}
            </h1>
            <p
              id={`product-reviews-review-${review.id}-body`}
              className="text-muted-foreground text-center "
            >
              {review.body}
            </p>
            <p
              id={`product-reviews-review-${review.id}-authorDate`}
              className="text-base font-bold"
            >
              {review.name}
            </p>
            <div className="flex flex-row gap-2 font-bold text-theme-blue">
              <Icons.badgeCheck className="h-6 w-6 text-theme-blue" />
              Verified Buyer
            </div>
          </div>
        ))}
      </div>

      <div
        id="scroll-position-container"
        className="flex gap-1 w-[90%] h-2 items-center justify-between mt-3  mx-auto z-30"
      >
        <Button onClick={PreviousReview} variant="blue">
          <Icons.chevronLeft />
        </Button>
        <div className="flex gap-2">
          {orderedReviews.slice(0, 6).map((image: any, i: any) => (
            <div
              key={`scroll-position-indicator-${i}`}
              id={`scroll-position-indicator-${i}`}
              className={`rounded-full  h-3 w-3 transition-colors delay-200 ${
                displayedReview === i ? "bg-theme-blue/80" : "bg-theme-blue/20 "
              }`}
            />
          ))}
        </div>
        <Button onClick={NextReview} variant="blue">
          <Icons.chevronRight />
        </Button>
      </div>
    </div>
  );
};

const Header = () => {
  const {showCartPreview, setShowCartPreview, cartTotalQuantity} = useCart();

  const toggleCart = () => {
    setShowCartPreview(!showCartPreview);
  };

  return (
    <div className="h-20 bg-white w-full flex items-center justify-between px-4">
      <Link href="/#" className="pb-1 relative" id="header-logo-link">
        <span
          className="header__logo text-2xl p-2 text-primary font-bold flex items-center"
          id="header-logo"
        >
          <motion.div
            initial={{scale: 0}}
            animate={{rotate: 360, scale: 1}}
            transition={{
              type: "spring",
              stiffness: 260,
              damping: 20,
            }}
            className="header__logo-icon  relative rounded-lg  flex justify-center items-center"
            id="header-logo-icon"
          >
            <Icons.logo
              className="text-white h-12 w-12  relative z-1"
              color="#4DA4E0"
            />
          </motion.div>
          <span className="flex flex-col text-theme-blue items-center">
            <p className="font-head font-bold leading-[20px]">Founder</p>
            <p className="font-head font-thin leading-[20px]">Central</p>
          </span>
        </span>
      </Link>
      <button
        onClick={toggleCart}
        className="rounded-full relative  z-[20] flex items-center justify-center p-2 aspect-square text-theme-blue "
        id="mobile-header-cart-button"
      >
        {cartTotalQuantity > 0 && (
          <span
            className="absolute pointer-events-none top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 h-4 w-4 font-bold p-1 text-sm flex items-center justify-center text-theme-blue bg-[#EDF6FB] rounded-full"
            id="mobile-header-cart-quantity"
          >
            {cartTotalQuantity}
          </span>
        )}
        <Icons.shoppingBag className="h-6 w-6 " id="header-cart-icon" />
      </button>
    </div>
  );
};

const ProductImages = ({product}: {product: any}) => {
  const [selectedImage, setSelectedImage] = React.useState<string>(
    product.images[0].node.src
  );

  return (
    <div className="flex flex-col">
      <div id="product-image-container" className="flex w-full   pt-10 ">
        <div
          className="flex flex-col gap-4"
          id="product-image-selector-container"
        >
          {product.images.map((image: any, i: any) => (
            <div
              onClick={() => setSelectedImage(image.node.src)}
              id={`product-image-${i}`}
              key={i}
              className={`snap-center cursor-pointer  relative h-[50px] w-[30px]  lg:h-[75px] lg:w-[57px]  pt-10 rounded-md border-4 
            ${
              selectedImage === image.node.src
                ? "border-theme-blue"
                : "hover:border-theme-blue/60"
            }
            `}
            >
              <Image
                id="product-image"
                loading="eager"
                src={image.node.src}
                alt="logo"
                fill
                objectFit="contain"
                className="p-0 pointer-events-none"
              />
            </div>
          ))}
        </div>
        <div
          id={`product-image-main`}
          className="w-[300px] h-[400px]  lg:w-[400px] lg:h-[500px] z-20 relative mx-auto bg-background rounded-b-[20px] "
        >
          <Image
            id="product-image"
            loading="eager"
            src={selectedImage}
            alt="logo"
            fill
            objectFit="contain"
            className="p-0"
          />
        </div>
      </div>
    </div>
  );
};

const ProductImagesMobile = ({product}: {product: any}) => {
  const [selectedImage, setSelectedImage] = React.useState<number>(0);
  const scrollAreaRef = React.useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const scrollArea = scrollAreaRef.current;

    if (scrollArea) {
      const handleScroll = () => {
        const scrollSnapPoints = Array.from(
          scrollArea.querySelectorAll(".snap-center")
        );
        const scrollLeft = scrollArea.scrollLeft;
        const containerWidth = scrollArea.offsetWidth;

        for (let i = 0; i < scrollSnapPoints.length; i++) {
          const image = scrollSnapPoints[i];
          const {left, width} = image.getBoundingClientRect();
          const rightEdgePosition = left + width;

          // Check if the right edge&apos;s left position is greater than half of the container width
          if (rightEdgePosition > containerWidth / 2) {
            setSelectedImage(i);
            break; // No need to check the rest
          }
        }
      };

      scrollArea.addEventListener("scroll", handleScroll);
      handleScroll(); // Initial check

      return () => {
        scrollArea.removeEventListener("scroll", handleScroll);
      };
    }
  }, []);
  return (
    <div className="relative ">
      <div
        id="product-image-scroll-area"
        className="w-screen hideScrollbar snap-mandatory snap-x overflow-scroll flex items-center z-20 relative   pb-4"
        ref={scrollAreaRef}
      >
        <div id="product-image-container" className="flex w-fit">
          {product.images.map((image: any, i: any) => (
            <div
              id={`product-image-${i}`}
              key={i}
              className="snap-center   relative h-[380px] w-[300px] "
            >
              <Image
                id="product-image"
                loading="eager"
                src={image.node.src}
                alt="logo"
                fill
                objectFit="contain"
                className="pl-4 pt-4 md:p-0"
              />
            </div>
          ))}
        </div>
      </div>
      <div
        id="scroll-position-container"
        className="flex gap-1 w-fit h-2 absolute bottom-2 left-1/2 -translate-x-1/2 z-30"
      >
        {product.images.map((image: any, i: any) => (
          <div
            key={`scroll-position-indicator-${i}`}
            id={`scroll-position-indicator-${i}`}
            className={`rounded-full  h-[7px] w-[7px]  ${
              selectedImage === i ? "bg-theme-blue/80" : "bg-theme-blue/20 "
            }`}
          />
        ))}
      </div>
    </div>
  );
};

const SaleBox = ({
  selectedVariant,
  setSelectedVariant,
  product,
  jumpToReviews,
  productRating,
}: {
  selectedVariant: any;
  setSelectedVariant: any;
  product: any;
  jumpToReviews: any;
  productRating: number;
}) => {
  const {addToCart, checkoutObject, cartTotalPrice} = useCart();
  const router = useRouter();

  const [isBuyButtonFixed, setIsBuyButtonFixed] = React.useState(true);
  const buyNowButtonRef = React.useRef<HTMLButtonElement>(null);

  React.useEffect(() => {
    // Function to handle scroll event
    const handleScroll = () => {
      const buttonContainer = document.getElementById(
        "buy-now-button-relative"
      );
      if (buttonContainer) {
        const buttonContainerTop =
          window.innerHeight - buttonContainer.getBoundingClientRect().top;
        if (buttonContainerTop < 100 + buyNowButtonRef.current!.offsetHeight) {
          // The button container is above the viewport, set the button position to fixed
          setIsBuyButtonFixed(true);
        } else {
          // The button container is in or below the viewport, set the button position to relative
          setIsBuyButtonFixed(false);
        }
      }
    };

    // Add the scroll event listener
    window.addEventListener("scroll", handleScroll);

    // Clean up the event listener on component unmount
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const [redirectToCheckout, setRedirectToCheckout] = React.useState(false);
  React.useEffect(() => {
    const redirectToLink = async () => {
      if (redirectToCheckout) {
        const checkoutLink = await getCheckoutLink(checkoutObject);
        router.push(checkoutLink);
      }
    };

    redirectToLink();
  }, [redirectToCheckout, checkoutObject, router]);

  const {analytics} = useStorage()!;

  const buyNow = async () => {
    if (analytics) {
      logEvent(analytics, "begin_checkout", {
        currency: "USD",
        value: cartTotalPrice,
        items: [checkoutObject],
      });
    }
    await addToCart({...product, selectedVariant: selectedVariant}, 1);
    setRedirectToCheckout(true);
  };

  return (
    <div id="product-saleBox" className="flex flex-col gap-4">
      <div id="product-saleBox-prices" className="  gap-4 flex items-center">
        {/* <h1
          id="product-saleBox-price1"
          className=" font-bold text-theme-blue hidden md:block text-2xl md:text-3xl text-center md:text-left"
        >
          Free
        </h1> */}

        {/* <div
          id="product-rating-preview"
          className="flex items-center gap-1   w-fit "
        >
          <Stars rating={productRating} />

          <Button
            onClick={jumpToReviews}
            className="p-0  h-fit text-muted-foreground"
            variant={"link"}
          >
            ({product.reviews.length})
          </Button>
        </div> */}
      </div>
      {/* <div id="product-saleBox-variants" className="flex flex-col gap-2">
        <p id="product-saleBox-variants-label">
          <span
            className="font-bold"
            id="product-saleBox-variants-label-selected"
          >
            Style:
          </span>{" "}
          {selectedVariant.title}
        </p>
        <div
          id="product-saleBox-variants-options"
          className="grid grid-cols-3 gap-4"
        >
          {product.variants.map((variant: any) => (
            <ProductVariants
              key={variant.id}
              product={variant}
              selectedVariant={selectedVariant}
              setSelectedVariant={setSelectedVariant}
            />
          ))}
        </div>
      </div> */}
      <div
        id="buy-button-container"
        className={`z-[50] relative gap-4 w-full rounded-lg p- flex flex-col items-center `}
      >
        <Button
          id="buy-now-button-relative"
          onClick={buyNow}
          ref={buyNowButtonRef}
          variant={"blue"}
          className={`text-base md:text-xl hover:bg-theme-blue/80  hover:text-white border-theme-blue rounded-full  w-full
          ${isBuyButtonFixed ? "visible  " : "relative  "}
        }`}
          size={"lg"}
        >
          {redirectToCheckout ? (
            <Icons.spinner className="mr-2 h-6 w-6 animate-spin" />
          ) : (
            "Get The Free Ebook"
          )}
        </Button>
        {/* <Icons.truck className="h-6 w-6 text-black" /> */}
      </div>
      <p id="product-saleBox-description" className="text-muted-foreground">
        Whether you are just starting out, feeling stuck or simply looking for
        some motivation, this book will give you the boost you need to finally
        make your business dreams a reality.
        <br />
        <br />
        Read the stories of people who, just like you, started out with an idea,
        took a leap of faith and transformed their vision into ventures that
        left a mark on the world. Through these pages, you will get a look
        behind the curtain and see the moments of doubt, scrappy growth hacks
        used in the early days and the shrewd business moves that turned simple
        ideas into billion dollar empires.
        <br />
        <br />
        Don&apos;t waste your life building someone else&apos;s dream. It&apos;s
        time to make yours a reality. Every success story began with a single,
        decisive moment. Yours is now. Take the plunge!
      </p>
    </div>
  );
};

const Stars = ({rating, className}: {rating: number; className?: string}) => {
  const rounded = Math.round(rating * 2) / 2;

  return (
    <>
      {[...Array(5)].map((_, index: number) => {
        if (index + 0.5 === rounded) {
          return (
            <Icons.halfStar
              key={index}
              className={cn(`h-5 w-5 text-[#F9A001] fill-[#F9A001]`, className)}
              color="red"
            />
          );
        } else if (index < rounded) {
          return (
            <Icons.star
              key={index}
              className={cn(`h-5 w-5 text-[#F9A001] fill-[#F9A001]`, className)}
            />
          );
        } else {
          return (
            <Icons.star
              key={index}
              className={cn(`h-5 w-5 text-[#F9A001]`, className)}
            />
          );
        }
      })}
    </>
  );
};

const ProductVariants = ({
  product,
  selectedVariant,
  setSelectedVariant,
}: {
  product: any;
  selectedVariant: any;
  setSelectedVariant: any;
}) => {
  return (
    <button
      id={`product-saleBox-variants-option-${selectedVariant.id}`}
      onClick={() => setSelectedVariant(product)}
      className={`text-theme-blue w-full flex flex-col items-center py-2 px-6 text-[12px] md:text-sm border  border-theme-blue rounded-md  transition-colors ease-in 
    ${
      product.id == selectedVariant.id
        ? "bg-theme-blue/10 "
        : " hover:bg-theme-blue/10  border-theme-blue/40"
    }`}
    >
      {product.title}
      <span
        id={`product-saleBox-variants-option-price-${selectedVariant.id}`}
        className="font-bold text-base  md:text-xl"
      >
        ${product.priceV2.amount}
      </span>
    </button>
  );
};

const EmailForm = () => {
  const emailRef = React.useRef<HTMLInputElement>(null);
  const [isLoading, setIsLoading] = React.useState<boolean>(false);

  const {toast} = useToast();

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    setIsLoading(true);
    await fetch("/api/email-subscribe", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        LIST: siteConfig.emailLists.book1,
        EMAIL: emailRef.current!.value,
        SOURCE: "Product page waitlist",
      }),
    });
    setIsLoading(false);
    toast({
      title: "Thanks signing up for early access!",
      description: "We will notify you when the book is ready.",
    });
    emailRef.current!.value = "";
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="gap-4 flex  w-full border border-black p-1 rounded-full bg-transparent  relative z-30"
    >
      <Input
        ref={emailRef}
        type="email"
        autoComplete="email"
        placeholder="Enter your email"
        className=" border-none text-[12px] md:text-base rounded-l-full"
      />
      <Button className="bg-theme-pink text-white text-[12px] md:text-base hover:bg-theme-blue z-30">
        {isLoading && <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />}
        Submit
      </Button>
    </form>
  );
};

const storyNames: string[] = [
  "Justin Kan",
  "Bernard Arnault",
  "Tyler Perry",
  "Ray Kroc",
  "Elon Musk",
  "Mrs. B",
  "Howard Schultz",
  "Michael Dell",
  "Austin Russell",
  "Mr. Beast",
  "Richard Branson",
  "Pavel Durov",
  "Reed Hastings",
  "Tope Awotona",
  "Ingvar Kamprad",
  "Travis Kalanick",
  "Whitney Wolfe Herd",
  "Jan Koum",
  "The Collison Brothers",
  "Masayoshi Son",
  "Peter Thiel",
  "Michael Rubin",
  "Mark Zuckerberg",
  "Sophia Amoruso",
  "Palmer Luckey",
  "Jamie Siminoff",
  "Phil Knight",
  "Shahid Khan",
  "Dave Portnoy",
  "Tony Xu",
  "Stewart Butterfield",
  "Henry Ford",
  "Felix Dennis",
  "Dana White",
  "Oprah",
  "Jeff Bezos",
  "Samwer Brothers",
  "Ben Francis",
  "Steve Ells",
  "Luis von Ahn",
  "Walt Disney",
  "Mark Cuban",
  "Sam Altman",
  "Marc Lore",
  "Ryan Peterson",
  "Peter Beck",
  "Melanie Perkins",
  "Apoorva Mehta",
  "Steve Jobs",
  "Sam Zemurray",
];

const reviewImages = [
  "/reviews/review-1.jpeg",
  "/reviews/review-2.jpeg",
  "/reviews/review-3.jpeg",
  "/reviews/review-4.jpeg",
  "/reviews/review-5.jpeg",
  "/reviews/review-6.jpeg",
];
