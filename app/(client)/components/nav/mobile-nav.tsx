"use client";

import {motion, useCycle} from "framer-motion";
import Link from "next/link";
import {useParams} from "next/navigation";
import {ReactNode, useEffect, useMemo, useRef, useState} from "react";
import {Icons} from "@/app/(client)/components/icons";
import {marketingConfig} from "@/config/marketing";
import {siteConfig} from "@/config/site";
import {useCart} from "@/context/cart";
import {Button} from "@/app/(client)/components/ui/button";
import {LinkButton} from "@/app/(client)/components/ui/link";
import {cn} from "@/lib/utils";
import {ro} from "date-fns/locale";
import {set} from "date-fns";
import {useRouter} from "next/navigation";
// const sidebar = {
//   open: (height = 1000) => ({
//     clipPath: `circle(${height * 2 + 200}px at 100% 0)`,
//     transition: {
//       type: "spring",
//       stiffness: 20,
//       restDelta: 2,
//     },
//   }),
//   closed: {
//     clipPath: "circle(0px at 100% 0)",
//     transition: {
//       type: "spring",
//       stiffness: 400,
//       damping: 40,
//     },
//   },
// };
const menuVariants = {
  open: {opacity: 1, x: 0},
  closed: {opacity: 0, x: "-100%"},
};

const navItems = ["pricing", "changelog"];

export default function MobileNav() {
  const [isOpen, setIsOpen] = useState(false);

  const containerRef = useRef(null);
  // const {height} = useDimensions(containerRef);
  const {showCartPreview, setShowCartPreview, cartTotalQuantity} = useCart();

  const toggleCart = () => {
    setShowCartPreview(!showCartPreview);
  };

  const router = useRouter();
  const clickLink = (href: string) => {
    router.push(href);
    setIsOpen(false);
  };
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  }, [isOpen]);

  return (
    <>
      <div className="flex items-center justify-between px-4 relative z-20  py-2 bg-white">
        <Link href="/#" className="">
          <span className="text-2xl text-primary font-bold  flex items-center ">
            <div className="h-10 w-20 relative  -mr-2">
              <Icons.logo
                className="text-white h-full w-full "
                color="rgb(77 164 224)"
              />
            </div>
          </span>
        </Link>
        <div className="flex gap-2">
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
          <MenuToggle setIsOpen={setIsOpen} isOpen={isOpen} />
        </div>
      </div>
      <nav
        className={cn(
          "fixed inset-0 top-12 z-20 hidden w-full bg-white px-5  lg:hidden",
          isOpen && "block"
        )}
      >
        <ul className="grid divide-y divide-gray-200">
          {marketingConfig.mainNav.map((item, i) => (
            <li key={i} className="grid gap-3">
              <Button
                onClick={() => clickLink(item.href)}
                className="flex w-full bg-white text-theme-blue border-none font-semibold capitalize"
              >
                {item.title}
              </Button>
            </li>
          ))}
        </ul>
      </nav>
    </>
  );
}

const MenuToggle = ({setIsOpen, isOpen}: {setIsOpen: any; isOpen: boolean}) => (
  <button
    onClick={() => setIsOpen(!isOpen)}
    className="pointer-events-auto z-20 aspect-square p-2 text-theme-blue"
  >
    {isOpen ? (
      <Icons.close className="w-6 h-6" />
    ) : (
      <Icons.menu className="w-6 h-6" />
    )}
  </button>
);

const Path = (props: any) => (
  <motion.path
    fill="transparent"
    strokeWidth="2"
    stroke="hsl(0, 0%, 18%)"
    strokeLinecap="round"
    {...props}
  />
);

const MenuItem = ({
  className,
  children,
}: {
  className?: string;
  children?: ReactNode;
}) => {
  return (
    <motion.li variants={MenuItemVariants} className={className}>
      {children}
    </motion.li>
  );
};

const MenuItemVariants = {
  open: {
    y: 0,
    opacity: 1,
    transition: {
      y: {stiffness: 1000, velocity: -100},
    },
  },
  closed: {
    y: 50,
    opacity: 0,
    transition: {
      y: {stiffness: 1000},
      duration: 0.04,
    },
  },
};

const variants = {
  open: {
    transition: {staggerChildren: 0.04, delayChildren: 0.2},
  },
  closed: {
    transition: {staggerChildren: 0.02, staggerDirection: -1},
  },
};

// const useDimensions = (ref: any) => {
//   const dimensions = useRef({width: 0, height: 0});

//   useEffect(() => {
//     dimensions.current.width = ref.current.offsetWidth;
//     dimensions.current.height = ref.current.offsetHeight;
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, []);

//   return dimensions.current;
// };

// <motion.nav
//   initial={false}
//   animate={isOpen ? "open" : "closed"}
//   custom={height}
//   className={` lg:hidden `}
//   ref={containerRef}
//   variants={menuVariants}
// >
//   <motion.div
//     className="fixed inset-0 z-[50] left-0 w-full bg-white"
//     variants={variants}
//   />
//   <motion.ul
//     variants={variants}
//     className="fixed grid w-full gap-3  px-10 py-16 b-b"
//   >
//     {marketingConfig.mainNav.map((item, i) => (
//       <div key={i} className="grid gap-3">
//         <MenuItem>
//           <Link
//             href={item.href}
//             onClick={() => setIsOpen(!isOpen)}
//             className="flex w-full font-semibold capitalize"
//           >
//             {item.title}
//           </Link>
//         </MenuItem>
//         <MenuItem className="my-3 h-px w-full bg-gray-300" />
//       </div>
//     ))}
//   </motion.ul>
// {/* </motion.nav> */}
