import {marketingConfig} from "@/config/marketing";
import {LinkButton} from "@/app/(client)/components/ui/link";
import Nav from "@/app/(client)/components/nav/main-nav";
import {SiteFooter} from "@/app/(client)/components/site-footer";
import MobileNav from "@/app/(client)/components/nav/mobile-nav/mobile-nav";
import CookieConsentBanner from "@/app/(client)/components/cookie-consent";
interface MarketingLayoutProps {
  children: React.ReactNode;
}

export default async function MarketingLayout({
  children,
}: MarketingLayoutProps) {
  return (
    <>
      <CookieConsentBanner />
      <MobileNav />
      <div className="flex min-h-screen flex-col bg-background ">
        <Nav />
        <main className="flex-1 z-10">{children}</main>
        <SiteFooter />
      </div>
    </>
  );
}
