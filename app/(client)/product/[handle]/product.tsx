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
import {analytics} from "@/config/firebase";
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
// import previewVideo from "@/public/video/Video1.mp4";

export default function Product({productData}: {productData: any}) {
  const product = productData.product;
  const [selectedVariant, setSelectedVariant] = React.useState(
    product.variants[2]
  );
  const productRating =
    product.reviews.reduce((acc: number, review: any) => {
      return acc + review.rating;
    }, 0) / product.reviews.length;

  const [accordionValue, setAccordionValue] = React.useState<string[]>([
    "overview",
  ]);

  const Router = useRouter();

  const jumpToReviews = () => {
    setAccordionValue([...accordionValue, "reviews"]);
    Router.push("#product-reviews");
  };

  return (
    <>
      <Header />

      <div
        id="product"
        className="w-screen  overflow-hidden  pb-20 bg-white md:bg-background "
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
          <Button className="w-[90%] bg-background border-none rounded-lg text-theme-blue mx-auto mt-4">
            <Icons.showPassword className="h-5 w-5 mr-2" />
            Quick Look In The Book
          </Button>

          <div
            id="product-saleBox-container"
            className="flex flex-col  p-4 md:p-10 gap-2 md:gap-4 relative  mt-4"
          >
            <h1
              id="product-title-header"
              className="text-black text-3xl md:text-4xl lg:text-6xl font-head font-bold "
            >
              {product.title}
            </h1>
            <span
              id="product-collection-header"
              className="text-base md:text-xl lg:text2xl  uppercase font-body text-theme-blue "
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
          <AccordionItem id="product-overview">
            <AccordionTrigger
              id="product-overview-trigger"
              className="underline-0"
            >
              Book Overview
            </AccordionTrigger>
            <AccordionContent id="product-overview-content">
              <div
                id="product-overview-content-body"
                dangerouslySetInnerHTML={{__html: product.description}}
              />
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
          <AccordionItem value="shipping" id="product-delivery-details">
            <AccordionTrigger
              id="product-delivery-details-trigger"
              className="underline-0"
            >
              Shipping & Delivery
            </AccordionTrigger>
            <AccordionContent id="product-delivery-details-content">
              Shipping usually takes 5-7 business days. We ship to all countries
            </AccordionContent>
          </AccordionItem>
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

const Reviews = ({
  productRating,
  productId,
  reviews,
}: {
  productRating: number;
  productId: string;
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

  const orderedReviews = reviews.sort((a, b) => b.date - a.date);

  return (
    <div
      id="product-reviews-container"
      className="w-full flex flex-col gap-4 mt-10 items-center"
    >
      <h1 className="  font-head font-bold text-center px-4  text-4xl lg:text-5xl  text-theme-blue">
        We&apos;ve helped hundreds of entrepreneurs start their businesses
        journeys.
      </h1>
      {/* <div
        id="product-reviews-header"
        className="w-full bg-theme-blue/10 rounded-md flex flex-col gap-2 justify-center items-center p-8"
      >
        <div
          id="product-reviews-header-rating"
          className="flex items-center gap-1   w-fit "
        >
          <Stars rating={productRating} />
        </div>
        <p id="product-reviews-header-rating-quantity" className="text-xl">
          Based on {reviews.length} reviews
        </p>
        <Button
          id="product-reviews-header-create-review"
          variant={"blueOutline"}
          onClick={() => setWriteReview(!writeReview)}
        >
          Write a review
        </Button>
      </div> */}
      {writeReview && (
        <div
          id="product-reviews-create"
          className="flex flex-col mt-6 gap-4 px-2"
        >
          <h1 id="product-reviews-create-title" className="text-2xl font-bold">
            Write a review
          </h1>
          <div
            id="product-reviews-create-name-container"
            className="flex flex-col gap-2"
          >
            <Label id="product-reviews-create-name-label" className="font-bold">
              Name
            </Label>
            <Input
              id="product-reviews-create-name-input"
              ref={nameInputRef}
              placeholder="Enter your name"
              autoComplete="name"
            />
          </div>
          <div
            id="product-reviews-create-email-container"
            className="flex flex-col gap-2"
          >
            <Label
              className="font-bold"
              id="product-reviews-create-email-label"
            >
              Email
            </Label>
            <Input
              id="product-reviews-create-email-input"
              ref={emailInputRef}
              placeholder="Enter your email"
              autoComplete="email"
            />
          </div>
          <div
            id="product-reviews-create-rating-container"
            className="flex flex-col gap-2"
          >
            <Label
              id="product-reviews-create-rating-label"
              className="font-bold"
            >
              Rating
            </Label>
            <div
              id="product-reviews-create-rating-stars"
              className="flex gap-2"
            >
              {[...Array(5)].map((_, index: number) => (
                <Button
                  id={`product-reviews-create-rating-stars-button-${index}`}
                  key={index}
                  onClick={() => setRatingValue(index + 1)}
                  variant={ratingValue >= index + 1 ? "blue" : "blueOutline"}
                  className="aspect-square p-1 hover:bg-theme-blue hover:text-white"
                >
                  <Icons.star className="h-4 w-4" />
                </Button>
              ))}
            </div>
          </div>
          <div
            id="product-reviews-create-title-container"
            className="flex flex-col gap-2"
          >
            <Label
              id="product-reviews-create-title-label"
              className="font-bold"
            >
              Review Title
            </Label>
            <Input
              id="product-reviews-create-title-input"
              ref={titleInputRef}
              placeholder="Give your review a title"
            />
          </div>
          <div
            id="product-reviews-create-body-container"
            className="flex flex-col gap-2"
          >
            <Label id="product-reviews-create-body-label" className="font-bold">
              Body of Review
            </Label>
            <Textarea
              id="product-reviews-create-body-textArea"
              ref={bodyInputRef}
              placeholder="Enter your email"
              className="bg-none ring-none"
            />
          </div>
          <Button
            id="product-reviews-create-submit"
            onClick={saveReview}
            variant={"blue"}
          >
            {isLoading ? (
              <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
            ) : (
              <Icons.send className="h-4 w-4 mr-2" />
            )}
            Submit Review
          </Button>
        </div>
      )}
      {orderedReviews.slice(0, 1).map((review) => (
        <div
          id={`product-reviews-review-${review.id}`}
          key={review.id}
          className="flex flex-col items-center  md:px-6 p-4 md:py-10 gap-2 rounded-lg w-[90%] bg-background mt-6"
        >
          <div className="h-[300px] w-[400px]  rounded-lg overflow-hidden  relative">
            <Image
              alt="Review Image"
              src={"/image/review-Image-1.jpeg"}
              layout="fill"
              objectFit="contain"
              className="rounded-lg overflow-hidden "
            />
          </div>
          <div
            id={`product-reviews-review-${review.id}-rating`}
            className="flex items-center gap-1   w-fit "
          >
            <Stars rating={review.rating} />
          </div>
          <span className="text-black ">Excellent {review.rating}</span>
          <h1
            id={`product-reviews-review-${review.id}-title`}
            className="text-xl font-bold bg-theme-blue/10 px-2"
          >
            {review.title}
          </h1>
          <p
            id={`product-reviews-review-${review.id}-body`}
            className="text-muted-foreground"
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
      <div className="w-[90%] flex flex-row justify-between items-center">
        <Button variant="blue" className="rounded-full aspect-square p-1">
          <Icons.chevronLeft className="h-6 w-6" />
        </Button>
        <div className="flex gap-1 ">
          <span className="h-3 w-3 bg-theme-blue rounded-full" />
          <span className="h-3 w-3 bg-theme-blue/40 rounded-full" />
          <span className="h-3 w-3 bg-theme-blue/40 rounded-full" />
          <span className="h-3 w-3 bg-theme-blue/40 rounded-full" />
        </div>
        <Button variant="blue" className="rounded-full aspect-square p-1">
          <Icons.chevronRight className="h-6 w-6" />
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
        className="rounded-full relative  z-[60] flex items-center justify-center p-2 aspect-square text-theme-blue "
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
    <div className="relative">
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
              className="snap-center   relative h-[400px] w-[300px]  pt-10"
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
            className={`rounded-full  h-[7px] w-[7px] ${
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

  const buyNow = async () => {
    logEvent(analytics, "begin_checkout", {
      currency: "USD",
      value: cartTotalPrice,
      items: [checkoutObject],
    });
    await addToCart({...product, selectedVariant: selectedVariant}, 1);
    setRedirectToCheckout(true);
  };

  return (
    <div id="product-saleBox" className="flex flex-col gap-4">
      <div id="product-saleBox-prices" className="  gap-4 flex items-center">
        {selectedVariant.compareAtPriceV2 ? (
          <>
            <span
              id="product-saleBox-price1"
              className="text-theme-blue font-bold text-2xl md:text-5xl  text-center md:text-left"
            >
              ${selectedVariant.priceV2.amount}
            </span>
          </>
        ) : (
          <h1
            id="product-saleBox-price1"
            className=" font-bold text-theme-blue hidden md:block text-2xl md:text-3xl text-center md:text-left"
          >
            ${selectedVariant.priceV2.amount}
          </h1>
        )}

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
      <div id="product-saleBox-variants" className="flex flex-col gap-2">
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
      </div>
      <div
        id="buy-button-container"
        className={`z-[50] relative gap-4 w-full bg-background rounded-lg p-4 flex flex-col items-center `}
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
            "Buy Now"
          )}
        </Button>
        {/* <Icons.truck className="h-6 w-6 text-black" /> */}

        <div className="flex flex-row gap-3 ">
          <svg
            className="icon icon--full-color"
            xmlns="http://www.w3.org/2000/svg"
            role="img"
            viewBox="0 0 38 24"
            width="38"
            height="24"
            aria-labelledby="pi-american_express"
          >
            <title id="pi-american_express">American Express</title>
            <g fill="none">
              <path
                fill="#000"
                d="M35,0 L3,0 C1.3,0 0,1.3 0,3 L0,21 C0,22.7 1.4,24 3,24 L35,24 C36.7,24 38,22.7 38,21 L38,3 C38,1.3 36.6,0 35,0 Z"
                opacity=".07"
              ></path>
              <path
                fill="#006FCF"
                d="M35,1 C36.1,1 37,1.9 37,3 L37,21 C37,22.1 36.1,23 35,23 L3,23 C1.9,23 1,22.1 1,21 L1,3 C1,1.9 1.9,1 3,1 L35,1"
              ></path>
              <path
                fill="#FFF"
                d="M8.971,10.268 L9.745,12.144 L8.203,12.144 L8.971,10.268 Z M25.046,10.346 L22.069,10.346 L22.069,11.173 L24.998,11.173 L24.998,12.412 L22.075,12.412 L22.075,13.334 L25.052,13.334 L25.052,14.073 L27.129,11.828 L25.052,9.488 L25.046,10.346 L25.046,10.346 Z M10.983,8.006 L14.978,8.006 L15.865,9.941 L16.687,8 L27.057,8 L28.135,9.19 L29.25,8 L34.013,8 L30.494,11.852 L33.977,15.68 L29.143,15.68 L28.065,14.49 L26.94,15.68 L10.03,15.68 L9.536,14.49 L8.406,14.49 L7.911,15.68 L4,15.68 L7.286,8 L10.716,8 L10.983,8.006 Z M19.646,9.084 L17.407,9.084 L15.907,12.62 L14.282,9.084 L12.06,9.084 L12.06,13.894 L10,9.084 L8.007,9.084 L5.625,14.596 L7.18,14.596 L7.674,13.406 L10.27,13.406 L10.764,14.596 L13.484,14.596 L13.484,10.661 L15.235,14.602 L16.425,14.602 L18.165,10.673 L18.165,14.603 L19.623,14.603 L19.647,9.083 L19.646,9.084 Z M28.986,11.852 L31.517,9.084 L29.695,9.084 L28.094,10.81 L26.546,9.084 L20.652,9.084 L20.652,14.602 L26.462,14.602 L28.076,12.864 L29.624,14.602 L31.499,14.602 L28.987,11.852 L28.986,11.852 Z"
              ></path>
            </g>
          </svg>
          <svg
            className="icon icon--full-color"
            viewBox="0 0 38 24"
            xmlns="http://www.w3.org/2000/svg"
            role="img"
            width="38"
            height="24"
            aria-labelledby="pi-diners_club"
          >
            <title id="pi-diners_club">Diners Club</title>
            <path
              opacity=".07"
              d="M35 0H3C1.3 0 0 1.3 0 3v18c0 1.7 1.4 3 3 3h32c1.7 0 3-1.3 3-3V3c0-1.7-1.4-3-3-3z"
            ></path>
            <path
              fill="#fff"
              d="M35 1c1.1 0 2 .9 2 2v18c0 1.1-.9 2-2 2H3c-1.1 0-2-.9-2-2V3c0-1.1.9-2 2-2h32"
            ></path>
            <path
              d="M12 12v3.7c0 .3-.2.3-.5.2-1.9-.8-3-3.3-2.3-5.4.4-1.1 1.2-2 2.3-2.4.4-.2.5-.1.5.2V12zm2 0V8.3c0-.3 0-.3.3-.2 2.1.8 3.2 3.3 2.4 5.4-.4 1.1-1.2 2-2.3 2.4-.4.2-.4.1-.4-.2V12zm7.2-7H13c3.8 0 6.8 3.1 6.8 7s-3 7-6.8 7h8.2c3.8 0 6.8-3.1 6.8-7s-3-7-6.8-7z"
              fill="#3086C8"
            ></path>
          </svg>
          <svg
            className="icon icon--full-color"
            viewBox="0 0 38 24"
            width="38"
            height="24"
            role="img"
            aria-labelledby="pi-discover"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <title id="pi-discover">Discover</title>
            <path
              fill="#000"
              opacity=".07"
              d="M35 0H3C1.3 0 0 1.3 0 3v18c0 1.7 1.4 3 3 3h32c1.7 0 3-1.3 3-3V3c0-1.7-1.4-3-3-3z"
            ></path>
            <path
              d="M35 1c1.1 0 2 .9 2 2v18c0 1.1-.9 2-2 2H3c-1.1 0-2-.9-2-2V3c0-1.1.9-2 2-2h32z"
              fill="#fff"
            ></path>
            <path
              d="M3.57 7.16H2v5.5h1.57c.83 0 1.43-.2 1.96-.63.63-.52 1-1.3 1-2.11-.01-1.63-1.22-2.76-2.96-2.76zm1.26 4.14c-.34.3-.77.44-1.47.44h-.29V8.1h.29c.69 0 1.11.12 1.47.44.37.33.59.84.59 1.37 0 .53-.22 1.06-.59 1.39zm2.19-4.14h1.07v5.5H7.02v-5.5zm3.69 2.11c-.64-.24-.83-.4-.83-.69 0-.35.34-.61.8-.61.32 0 .59.13.86.45l.56-.73c-.46-.4-1.01-.61-1.62-.61-.97 0-1.72.68-1.72 1.58 0 .76.35 1.15 1.35 1.51.42.15.63.25.74.31.21.14.32.34.32.57 0 .45-.35.78-.83.78-.51 0-.92-.26-1.17-.73l-.69.67c.49.73 1.09 1.05 1.9 1.05 1.11 0 1.9-.74 1.9-1.81.02-.89-.35-1.29-1.57-1.74zm1.92.65c0 1.62 1.27 2.87 2.9 2.87.46 0 .86-.09 1.34-.32v-1.26c-.43.43-.81.6-1.29.6-1.08 0-1.85-.78-1.85-1.9 0-1.06.79-1.89 1.8-1.89.51 0 .9.18 1.34.62V7.38c-.47-.24-.86-.34-1.32-.34-1.61 0-2.92 1.28-2.92 2.88zm12.76.94l-1.47-3.7h-1.17l2.33 5.64h.58l2.37-5.64h-1.16l-1.48 3.7zm3.13 1.8h3.04v-.93h-1.97v-1.48h1.9v-.93h-1.9V8.1h1.97v-.94h-3.04v5.5zm7.29-3.87c0-1.03-.71-1.62-1.95-1.62h-1.59v5.5h1.07v-2.21h.14l1.48 2.21h1.32l-1.73-2.32c.81-.17 1.26-.72 1.26-1.56zm-2.16.91h-.31V8.03h.33c.67 0 1.03.28 1.03.82 0 .55-.36.85-1.05.85z"
              fill="#231F20"
            ></path>
            <path
              d="M20.16 12.86a2.931 2.931 0 100-5.862 2.931 2.931 0 000 5.862z"
              fill="url(#pi-paint0_linear)"
            ></path>
            <path
              opacity=".65"
              d="M20.16 12.86a2.931 2.931 0 100-5.862 2.931 2.931 0 000 5.862z"
              fill="url(#pi-paint1_linear)"
            ></path>
            <path
              d="M36.57 7.506c0-.1-.07-.15-.18-.15h-.16v.48h.12v-.19l.14.19h.14l-.16-.2c.06-.01.1-.06.1-.13zm-.2.07h-.02v-.13h.02c.06 0 .09.02.09.06 0 .05-.03.07-.09.07z"
              fill="#231F20"
            ></path>
            <path
              d="M36.41 7.176c-.23 0-.42.19-.42.42 0 .23.19.42.42.42.23 0 .42-.19.42-.42 0-.23-.19-.42-.42-.42zm0 .77c-.18 0-.34-.15-.34-.35 0-.19.15-.35.34-.35.18 0 .33.16.33.35 0 .19-.15.35-.33.35z"
              fill="#231F20"
            ></path>
            <path
              d="M37 12.984S27.09 19.873 8.976 23h26.023a2 2 0 002-1.984l.024-3.02L37 12.985z"
              fill="#F48120"
            ></path>
            <defs>
              <linearGradient
                id="pi-paint0_linear"
                x1="21.657"
                y1="12.275"
                x2="19.632"
                y2="9.104"
                gradientUnits="userSpaceOnUse"
              >
                <stop stop-color="#F89F20"></stop>
                <stop offset=".25" stop-color="#F79A20"></stop>
                <stop offset=".533" stop-color="#F68D20"></stop>
                <stop offset=".62" stop-color="#F58720"></stop>
                <stop offset=".723" stop-color="#F48120"></stop>
                <stop offset="1" stop-color="#F37521"></stop>
              </linearGradient>
              <linearGradient
                id="pi-paint1_linear"
                x1="21.338"
                y1="12.232"
                x2="18.378"
                y2="6.446"
                gradientUnits="userSpaceOnUse"
              >
                <stop stop-color="#F58720"></stop>
                <stop offset=".359" stop-color="#E16F27"></stop>
                <stop offset=".703" stop-color="#D4602C"></stop>
                <stop offset=".982" stop-color="#D05B2E"></stop>
              </linearGradient>
            </defs>
          </svg>
          <svg
            className="icon icon--full-color"
            viewBox="0 0 38 24"
            xmlns="http://www.w3.org/2000/svg"
            role="img"
            width="38"
            height="24"
            aria-labelledby="pi-master"
          >
            <title id="pi-master">Mastercard</title>
            <path
              opacity=".07"
              d="M35 0H3C1.3 0 0 1.3 0 3v18c0 1.7 1.4 3 3 3h32c1.7 0 3-1.3 3-3V3c0-1.7-1.4-3-3-3z"
            ></path>
            <path
              fill="#fff"
              d="M35 1c1.1 0 2 .9 2 2v18c0 1.1-.9 2-2 2H3c-1.1 0-2-.9-2-2V3c0-1.1.9-2 2-2h32"
            ></path>
            <circle fill="#EB001B" cx="15" cy="12" r="7"></circle>
            <circle fill="#F79E1B" cx="23" cy="12" r="7"></circle>
            <path
              fill="#FF5F00"
              d="M22 12c0-2.4-1.2-4.5-3-5.7-1.8 1.3-3 3.4-3 5.7s1.2 4.5 3 5.7c1.8-1.2 3-3.3 3-5.7z"
            ></path>
          </svg>
          <svg
            className="icon icon--full-color"
            xmlns="http://www.w3.org/2000/svg"
            role="img"
            viewBox="0 0 38 24"
            width="38"
            height="24"
            aria-labelledby="pi-shopify_pay"
          >
            <title id="pi-shopify_pay">Shop Pay</title>
            <path
              opacity=".07"
              d="M35 0H3C1.3 0 0 1.3 0 3v18c0 1.7 1.4 3 3 3h32c1.7 0 3-1.3 3-3V3c0-1.7-1.4-3-3-3z"
              fill="#000"
            ></path>
            <path
              d="M35.889 0C37.05 0 38 .982 38 2.182v19.636c0 1.2-.95 2.182-2.111 2.182H2.11C.95 24 0 23.018 0 21.818V2.182C0 .982.95 0 2.111 0H35.89z"
              fill="#5A31F4"
            ></path>
            <path
              d="M9.35 11.368c-1.017-.223-1.47-.31-1.47-.705 0-.372.306-.558.92-.558.54 0 .934.238 1.225.704a.079.079 0 00.104.03l1.146-.584a.082.082 0 00.032-.114c-.475-.831-1.353-1.286-2.51-1.286-1.52 0-2.464.755-2.464 1.956 0 1.275 1.15 1.597 2.17 1.82 1.02.222 1.474.31 1.474.705 0 .396-.332.582-.993.582-.612 0-1.065-.282-1.34-.83a.08.08 0 00-.107-.035l-1.143.57a.083.083 0 00-.036.111c.454.92 1.384 1.437 2.627 1.437 1.583 0 2.539-.742 2.539-1.98s-1.155-1.598-2.173-1.82v-.003zM15.49 8.855c-.65 0-1.224.232-1.636.646a.04.04 0 01-.069-.03v-2.64a.08.08 0 00-.08-.081H12.27a.08.08 0 00-.08.082v8.194a.08.08 0 00.08.082h1.433a.08.08 0 00.081-.082v-3.594c0-.695.528-1.227 1.239-1.227.71 0 1.226.521 1.226 1.227v3.594a.08.08 0 00.081.082h1.433a.08.08 0 00.081-.082v-3.594c0-1.51-.981-2.577-2.355-2.577zM20.753 8.62c-.778 0-1.507.24-2.03.588a.082.082 0 00-.027.109l.632 1.088a.08.08 0 00.11.03 2.5 2.5 0 011.318-.366c1.25 0 2.17.891 2.17 2.068 0 1.003-.736 1.745-1.669 1.745-.76 0-1.288-.446-1.288-1.077 0-.361.152-.657.548-.866a.08.08 0 00.032-.113l-.596-1.018a.08.08 0 00-.098-.035c-.799.299-1.359 1.018-1.359 1.984 0 1.46 1.152 2.55 2.76 2.55 1.877 0 3.227-1.313 3.227-3.195 0-2.018-1.57-3.492-3.73-3.492zM28.675 8.843c-.724 0-1.373.27-1.845.746-.026.027-.069.007-.069-.029v-.572a.08.08 0 00-.08-.082h-1.397a.08.08 0 00-.08.082v8.182a.08.08 0 00.08.081h1.433a.08.08 0 00.081-.081v-2.683c0-.036.043-.054.069-.03a2.6 2.6 0 001.808.7c1.682 0 2.993-1.373 2.993-3.157s-1.313-3.157-2.993-3.157zm-.271 4.929c-.956 0-1.681-.768-1.681-1.783s.723-1.783 1.681-1.783c.958 0 1.68.755 1.68 1.783 0 1.027-.713 1.783-1.681 1.783h.001z"
              fill="#fff"
            ></path>
          </svg>
          <svg
            className="icon icon--full-color"
            viewBox="0 0 38 24"
            xmlns="http://www.w3.org/2000/svg"
            role="img"
            width="38"
            height="24"
            aria-labelledby="pi-visa"
          >
            <title id="pi-visa">Visa</title>
            <path
              opacity=".07"
              d="M35 0H3C1.3 0 0 1.3 0 3v18c0 1.7 1.4 3 3 3h32c1.7 0 3-1.3 3-3V3c0-1.7-1.4-3-3-3z"
            ></path>
            <path
              fill="#fff"
              d="M35 1c1.1 0 2 .9 2 2v18c0 1.1-.9 2-2 2H3c-1.1 0-2-.9-2-2V3c0-1.1.9-2 2-2h32"
            ></path>
            <path
              d="M28.3 10.1H28c-.4 1-.7 1.5-1 3h1.9c-.3-1.5-.3-2.2-.6-3zm2.9 5.9h-1.7c-.1 0-.1 0-.2-.1l-.2-.9-.1-.2h-2.4c-.1 0-.2 0-.2.2l-.3.9c0 .1-.1.1-.1.1h-2.1l.2-.5L27 8.7c0-.5.3-.7.8-.7h1.5c.1 0 .2 0 .2.2l1.4 6.5c.1.4.2.7.2 1.1.1.1.1.1.1.2zm-13.4-.3l.4-1.8c.1 0 .2.1.2.1.7.3 1.4.5 2.1.4.2 0 .5-.1.7-.2.5-.2.5-.7.1-1.1-.2-.2-.5-.3-.8-.5-.4-.2-.8-.4-1.1-.7-1.2-1-.8-2.4-.1-3.1.6-.4.9-.8 1.7-.8 1.2 0 2.5 0 3.1.2h.1c-.1.6-.2 1.1-.4 1.7-.5-.2-1-.4-1.5-.4-.3 0-.6 0-.9.1-.2 0-.3.1-.4.2-.2.2-.2.5 0 .7l.5.4c.4.2.8.4 1.1.6.5.3 1 .8 1.1 1.4.2.9-.1 1.7-.9 2.3-.5.4-.7.6-1.4.6-1.4 0-2.5.1-3.4-.2-.1.2-.1.2-.2.1zm-3.5.3c.1-.7.1-.7.2-1 .5-2.2 1-4.5 1.4-6.7.1-.2.1-.3.3-.3H18c-.2 1.2-.4 2.1-.7 3.2-.3 1.5-.6 3-1 4.5 0 .2-.1.2-.3.2M5 8.2c0-.1.2-.2.3-.2h3.4c.5 0 .9.3 1 .8l.9 4.4c0 .1 0 .1.1.2 0-.1.1-.1.1-.1l2.1-5.1c-.1-.1 0-.2.1-.2h2.1c0 .1 0 .1-.1.2l-3.1 7.3c-.1.2-.1.3-.2.4-.1.1-.3 0-.5 0H9.7c-.1 0-.2 0-.2-.2L7.9 9.5c-.2-.2-.5-.5-.9-.6-.6-.3-1.7-.5-1.9-.5L5 8.2z"
              fill="#142688"
            ></path>
          </svg>
        </div>
      </div>
      <p id="product-saleBox-description" className="text-muted-foreground">
        Craving a little motivation? Open this book to dive into a world of
        riveting tales and lessons from history&apos;s most influential
        entrepreneurs. <br /> <br /> &quot;Snapshots of Success&quot; is not
        just a book; it&apos;s a thrilling masterclass in innovation and grit.
        Each page is a treasure trove of insights from 50 of the most impactful
        business journeys, distilled into riveting, short-form narratives.{" "}
        <br /> <br /> This unique compilation is perfect for anyone who craves
        inspiration and insight but struggles to find the time to sift through
        lengthy biographies and business texts. Each tale is meticulously
        crafted to be devoured in just 15-20 minutes - a perfect fit for your
        coffee break or when you need a shot of motivation.
      </p>
    </div>
  );
};

const ProductReviews = ({
  productRating,
  productId,
  reviews,
}: {
  productRating: number;
  productId: string;
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

  const orderedReviews = reviews.sort((a, b) => b.date - a.date);

  return (
    <div id="product-reviews-container" className="w-full flex flex-col gap-4">
      <div
        id="product-reviews-header"
        className="w-full bg-theme-blue/10 rounded-md flex flex-col gap-2 justify-center items-center p-8"
      >
        <div
          id="product-reviews-header-rating"
          className="flex items-center gap-1   w-fit "
        >
          <Stars rating={productRating} />
        </div>
        <p id="product-reviews-header-rating-quantity" className="text-xl">
          Based on {reviews.length} reviews
        </p>
        <Button
          id="product-reviews-header-create-review"
          variant={"blueOutline"}
          onClick={() => setWriteReview(!writeReview)}
        >
          Write a review
        </Button>
      </div>
      {writeReview && (
        <div
          id="product-reviews-create"
          className="flex flex-col mt-6 gap-4 px-2"
        >
          <h1 id="product-reviews-create-title" className="text-2xl font-bold">
            Write a review
          </h1>
          <div
            id="product-reviews-create-name-container"
            className="flex flex-col gap-2"
          >
            <Label id="product-reviews-create-name-label" className="font-bold">
              Name
            </Label>
            <Input
              id="product-reviews-create-name-input"
              ref={nameInputRef}
              placeholder="Enter your name"
              autoComplete="name"
            />
          </div>
          <div
            id="product-reviews-create-email-container"
            className="flex flex-col gap-2"
          >
            <Label
              className="font-bold"
              id="product-reviews-create-email-label"
            >
              Email
            </Label>
            <Input
              id="product-reviews-create-email-input"
              ref={emailInputRef}
              placeholder="Enter your email"
              autoComplete="email"
            />
          </div>
          <div
            id="product-reviews-create-rating-container"
            className="flex flex-col gap-2"
          >
            <Label
              id="product-reviews-create-rating-label"
              className="font-bold"
            >
              Rating
            </Label>
            <div
              id="product-reviews-create-rating-stars"
              className="flex gap-2"
            >
              {[...Array(5)].map((_, index: number) => (
                <Button
                  id={`product-reviews-create-rating-stars-button-${index}`}
                  key={index}
                  onClick={() => setRatingValue(index + 1)}
                  variant={ratingValue >= index + 1 ? "blue" : "blueOutline"}
                  className="aspect-square p-1 hover:bg-theme-blue hover:text-white"
                >
                  <Icons.star className="h-4 w-4" />
                </Button>
              ))}
            </div>
          </div>
          <div
            id="product-reviews-create-title-container"
            className="flex flex-col gap-2"
          >
            <Label
              id="product-reviews-create-title-label"
              className="font-bold"
            >
              Review Title
            </Label>
            <Input
              id="product-reviews-create-title-input"
              ref={titleInputRef}
              placeholder="Give your review a title"
            />
          </div>
          <div
            id="product-reviews-create-body-container"
            className="flex flex-col gap-2"
          >
            <Label id="product-reviews-create-body-label" className="font-bold">
              Body of Review
            </Label>
            <Textarea
              id="product-reviews-create-body-textArea"
              ref={bodyInputRef}
              placeholder="Enter your email"
              className="bg-none ring-none"
            />
          </div>
          <Button
            id="product-reviews-create-submit"
            onClick={saveReview}
            variant={"blue"}
          >
            {isLoading ? (
              <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
            ) : (
              <Icons.send className="h-4 w-4 mr-2" />
            )}
            Submit Review
          </Button>
        </div>
      )}
      {orderedReviews.map((review) => (
        <div
          id={`product-reviews-review-${review.id}`}
          key={review.id}
          className="flex flex-col bg-theme-blue/10 md:px-6 p-4 md:py-10 gap-2 rounded-md"
        >
          <div
            id={`product-reviews-review-${review.id}-rating`}
            className="flex items-center gap-1   w-fit "
          >
            <Stars rating={review.rating} />
          </div>
          <p
            id={`product-reviews-review-${review.id}-authorDate`}
            className="text-sm"
          >
            {review.name + " - " + timeSince(review.date)}
          </p>
          <h1
            id={`product-reviews-review-${review.id}-title`}
            className="text-xl font-bold"
          >
            {review.title}
          </h1>
          <p
            id={`product-reviews-review-${review.id}-body`}
            className="text-muted-foreground"
          >
            {review.body}
          </p>
        </div>
      ))}
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
