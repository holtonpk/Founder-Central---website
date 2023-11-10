"use client";
import React, {useEffect} from "react";
import {PostItem} from "./components/post-item";
import {EmptyPlaceholder} from "./components/empty-placeholder";
import {PostCreateButton} from "./components/post-create-button";
import {Post} from "@/app/admin/types";
import {useAdminStorage} from "../../context/storage";

const BlogLayout = () => {
  const [isLoading, setIsLoading] = React.useState<boolean>(true);
  const [posts, setPosts] = React.useState<Post[] | null>(null);

  const {GetBlogPosts} = useAdminStorage()!;

  useEffect(() => {
    async function fetchPosts() {
      const posts = await GetBlogPosts();
      setPosts(posts);
      setIsLoading(false);
    }
    fetchPosts();
  }, [GetBlogPosts]);
  console.log("posts", posts);

  return (
    <div className="min-h-screen container mt-10">
      {isLoading ? (
        <>loading</>
      ) : (
        <>
          {posts?.length ? (
            <div className="flex flex-col">
              <PostCreateButton variant="outline" className="ml-auto " />
              <div className="divide-y divide-border rounded-md border border-border mt-3">
                {posts.map((post) => (
                  <PostItem key={post.id} post={post} />
                ))}
              </div>
            </div>
          ) : (
            <EmptyPlaceholder>
              <EmptyPlaceholder.Icon name="post" />
              <EmptyPlaceholder.Title>No posts created</EmptyPlaceholder.Title>
              <EmptyPlaceholder.Description>
                You don&apos;t have any posts yet. Start creating content.
              </EmptyPlaceholder.Description>
              <PostCreateButton variant="outline" />
            </EmptyPlaceholder>
          )}
        </>
      )}
    </div>
  );
};

export default BlogLayout;
