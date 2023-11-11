import Link from "next/link";
// import {Post} from "@prisma/client";
import {Icons} from "@/app/admin/components/icons";
import {timeSince} from "@/app/admin/lib/utils";
import {Skeleton} from "@/app/admin/components/ui/skeleton";
import {PostOperations} from "./post-operations";
import {Post} from "@/app/admin/types";
interface PostItemProps {
  post: Pick<Post, "id" | "title" | "published" | "createdAt">;
}

export function PostItem({post}: PostItemProps) {
  return (
    <div className="flex items-center justify-between p-4">
      <div className="grid gap-1">
        <Link
          href={`/admin/blog/${post.id}`}
          className="font-semibold hover:underline"
        >
          {post.title}
        </Link>
        <div>
          <div className="flex flex-row gap-2 items-center">
            {post.published ? (
              <span className="text-foreground  flex items-center gap-1 text-sm">
                <Icons.checkCircle className="h-3 w-3  " />
                Published
              </span>
            ) : (
              <span className="text-primary flex items-center gap-1 text-sm">
                <Icons.circle className="h-3 w-3 " />
                Draft
              </span>
            )}

            <div className="h-4 w-[1px] bg-border" />
            <p className="text-sm text-muted-foreground">
              {timeSince(post.createdAt)}
            </p>
          </div>
        </div>
      </div>
      <PostOperations post={{id: post.id, title: post.title}} />
    </div>
  );
}

PostItem.Skeleton = function PostItemSkeleton() {
  return (
    <div className="p-4">
      <div className="space-y-3">
        <Skeleton className="h-5 w-2/5" />
        <Skeleton className="h-4 w-4/5" />
      </div>
    </div>
  );
};
