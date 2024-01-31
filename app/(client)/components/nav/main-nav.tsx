"use client";
import {Input} from "@/app/(client)/components/ui/input";
import Link from "next/link";
import Image from "next/image";
import {Icons} from "@/app/(client)/components/icons";
import {useParams, useSelectedLayoutSegment} from "next/navigation";
import useScroll from "@/lib/hooks/use-scroll";
import clsx from "clsx";
import {siteConfig} from "@/config/site";
import {LinkButton} from "@/app/(client)/components/ui/link";
import {marketingConfig} from "@/config/marketing";
import {cn} from "@/lib/utils";
import {motion} from "framer-motion";
import ContactForm from "@/app/(client)/components/contact-form";
import {useCart} from "@/context/cart";
import {Button} from "@/app/(client)/components/ui/button";
import SubscribePopup from "@/app/(client)/components/subscribe-popup";

const navItems = ["pricing", "changelog"];

const transparentHeaderSegments = new Set(["metatags", "pricing"]);

export default function Nav() {
  const scrolled = useScroll(20);
  const segment = useSelectedLayoutSegment();

  const {showCartPreview, setShowCartPreview, cartTotalQuantity} = useCart();
  const toggleCart = () => {
    setShowCartPreview(!showCartPreview);
  };
  console.log("segment", segment);
  return (
    // <div
    //   className={clsx(`sticky inset-x-0 top-0 z-30 w-full transition-all`, {
    //     "border-order border-b bg-background1/20 backdrop-blur-lg": scrolled,
    //     "border-order border-b  ":
    //       segment && !transparentHeaderSegments.has(segment),
    //   })}
    // >
    <>
      <div
        className="header mx-auto w-full z-20 absolute blurBack bg-opacity-50 hidden lg:flex bg-white h-16  justify-center  items-center "
        id="header"
      >
        <div
          className="flex h-20 py-4 items-center justify-between w-full container"
          id="header-container"
        >
          <div
            className="flex w-fit items-center sticky md:gap-10  h-fit "
            id="header-logo-container"
          >
            <Link href="/#" className="pb-1" id="header-logo-link">
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
                    className="text-white h-8 w-8  relative z-1"
                    color="#4DA4E0"
                  />
                </motion.div>
                <span className="flex flex-col text-theme-blue items-center">
                  <p className="font-head font-bold leading-[14px] text-sm">
                    Founder
                  </p>
                  <p className="font-head font-thin leading-[14px] text-sm">
                    Central
                  </p>
                </span>
              </span>
            </Link>
            <div className="header__nav p-0  flex flex-row  " id="header-nav">
              {marketingConfig.mainNav?.length ? (
                <nav
                  className="hidden md:flex p-0 gap-12 "
                  id="header-nav-menu"
                >
                  {marketingConfig.mainNav?.map((item, index) => (
                    <Link
                      key={index}
                      href={item.disabled ? "#" : item.href}
                      className={cn(
                        "flex items-center  text-sm font-head transition-colors   ",
                        item.href.startsWith(`/${segment}`)
                          ? "text-black"
                          : segment == null && index === 0
                          ? "text-black"
                          : "text-black/40",
                        item.disabled && "cursor-not-allowed opacity-80"
                      )}
                      id={`header-nav-link-${index}`}
                    >
                      {item.title}
                    </Link>
                  ))}
                </nav>
              ) : null}
            </div>
          </div>
          <div
            className="flex w-fit items-center relative gap-4 h-10"
            id="header-action-buttons"
          >
            <SubscribePopup
              variant={"blue"}
              className={
                "flex items-center text-base rounded-lg font-body border-theme-blue hover:bg-theme-blue/80 hover:text-white"
              }
            >
              Join Our Newsletter
              <Icons.send className="ml-2 h-4 w-4" />
            </SubscribePopup>

            <Button
              variant={"blueOutline"}
              onClick={toggleCart}
              className="rounded-full relative flex items-center justify-center p-2  aspect-square"
              id="header-cart-button"
            >
              {cartTotalQuantity > 0 && (
                <span
                  className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 h-4 w-4 font-bold p-1 text-sm flex items-center justify-center text-theme-blue bg-white  rounded-full"
                  id="header-cart-quantity"
                >
                  {cartTotalQuantity}
                </span>
              )}
              <Icons.shoppingBag className="h-8 w-8 " id="header-cart-icon" />
            </Button>
          </div>
        </div>
      </div>
    </>
  );
}
