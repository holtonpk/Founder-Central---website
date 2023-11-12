import Link from "next/link";

import {cn} from "@/lib/utils";
import {useParams, useSelectedLayoutSegment} from "next/navigation";

export function MainNav({
  className,
  ...props
}: React.HTMLAttributes<HTMLElement>) {
  const segment = useSelectedLayoutSegment();

  return (
    <nav
      className={cn("flex items-center space-x-4 lg:space-x-6", className)}
      {...props}
    >
      <Link
        href="/admin/reports"
        className={`text-sm font-medium transition-colors hover:text-primary ${
          segment === "reports" ? "text-default" : "text-muted-foreground"
        }`}
      >
        Reports
      </Link>
      <Link
        href="/admin/website"
        className={`text-sm font-medium transition-colors hover:text-primary ${
          segment === "website" ? "text-default" : "text-muted-foreground"
        }`}
      >
        Website
      </Link>

      <Link
        href="/admin/blog"
        className={`text-sm font-medium transition-colors hover:text-primary ${
          segment === "blog" ? "text-default" : "text-muted-foreground"
        }`}
      >
        Blog
      </Link>
      <Link
        href="/admin/settings"
        className={`text-sm font-medium transition-colors hover:text-primary ${
          segment === "settings" ? "text-default" : "text-muted-foreground"
        }`}
      >
        Settings
      </Link>
    </nav>
  );
}
