"use client";
import React, {useEffect, useState} from "react";
import {motion} from "framer-motion";
import Link from "next/link";
import {useCart} from "@/context/cart";
import {Icons} from "@/app/(client)/components/icons";
import {marketingConfig} from "@/config/marketing";
import {useRouter} from "next/navigation";
import "./style.css";

const MobileNav = () => {
  const [mobileNavOpen, setMobileNavOpen] = useState(false);

  const mobileMenuVariant = {
    opened: {
      y: "0%",
      transition: {
        delay: 0.15,
        duration: 1.1,
        ease: [0.74, 0, 0.19, 1.02],
      },
    },
    closed: {
      y: "-100%",
      transition: {
        delay: 0.35,
        duration: 0.63,
        ease: [0.74, 0, 0.19, 1.02],
      },
    },
  };

  const fadeInVariant = {
    opened: {
      opacity: 1,
      transition: {
        delay: 1.2,
      },
    },
    closed: {opacity: 0},
  };

  const ulVariant = {
    opened: {
      transition: {
        delayChildren: 1,
        staggerChildren: 0.18,
      },
    },
    closed: {
      transition: {
        staggerChildren: 0.06,
        staggerDirection: -1,
      },
    },
  };

  const liVariant = {
    opened: {
      opacity: 1,
      y: "0%",
      transition: {
        duration: 0.65,
        ease: "easeOut",
      },
    },
    closed: {
      opacity: 0,
      y: "100%",
      transition: {
        duration: 0.25,
        ease: "easeInOut",
      },
    },
  };

  useEffect(() => {
    if (mobileNavOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  }, [mobileNavOpen]);

  const fadeInStart = {opacity: 0};
  const fadeInEnd = {opacity: 1};
  const fadeInTransition = {duration: 1};
  const [isOpen, setIsOpen] = useState(false);

  const {showCartPreview, setShowCartPreview, cartTotalQuantity} = useCart();

  const toggleCart = () => {
    setShowCartPreview(!showCartPreview);
  };

  const Path = (props: any) => (
    <motion.path
      fill="transparent"
      strokeWidth="3"
      stroke="#4DA6E0"
      strokeLinecap="round"
      {...props}
    />
  );
  const router = useRouter();

  const clickLink = (href: string) => {
    router.push(href);
    setMobileNavOpen(false);
  };

  return (
    <motion.nav
      initial="closed"
      animate={mobileNavOpen ? "opened" : "closed"}
      className="flex items-center justify-between px-4 relative z-20  py-2 bg-white  w-screen lg:hidden"
    >
      <motion.div
        className="relative  z-[60]"
        onClick={() => setMobileNavOpen(!mobileNavOpen)}
      >
        <svg width="23" height="23" viewBox="0 0 23 23" className="text-white">
          <Path
            variants={{
              closed: {d: "M 2 2.5 L 20 2.5"},
              opened: {d: "M 3 16.5 L 17 2.5"},
            }}
          />
          <Path
            d="M 2 9.423 L 20 9.423"
            variants={{
              closed: {opacity: 1},
              opened: {opacity: 0},
            }}
            transition={{duration: 0.1}}
          />
          <Path
            variants={{
              closed: {d: "M 2 16.346 L 20 16.346"},
              opened: {d: "M 3 2.5 L 17 16.346"},
            }}
          />
        </svg>
      </motion.div>
      <Link href="/#" className="relative  z-[60]">
        <span className="text-2xl text-primary font-bold  flex items-center ">
          <div className="h-10 w-20 relative  -mr-2">
            <Icons.fullLogo
              className="text-white h-full w-full "
              color="rgb(77 164 224)"
            />
          </div>
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
      <motion.div variants={mobileMenuVariant} className="mobile-menu bg-white">
        <motion.ul
          variants={ulVariant}
          className="flex flex-col items-center mt-20 w-full gap-4 px-4 "
        >
          {marketingConfig.mainNav.map((navItem, i) => (
            <motion.li whileTap={{scale: 0.95}} key={i}>
              <motion.div
                onClick={() => clickLink(navItem.href)}
                className="text-theme-blue font-bold text-center w-full  text-3xl border-b-2 border-theme-blue"
                variants={liVariant}
              >
                {navItem.title}
              </motion.div>
            </motion.li>
          ))}
        </motion.ul>
        {/* <motion.div
          variants={fadeInVariant}
          className="flex mt-auto gap-2 justify-between"
        >
          <h5>+852 5650 2233</h5>
          <h5>hi@designagency.com</h5>
        </motion.div> */}
      </motion.div>
    </motion.nav>
  );
};

export default MobileNav;
