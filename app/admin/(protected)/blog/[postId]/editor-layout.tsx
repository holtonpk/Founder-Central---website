"use client";
import {Editor} from "../components/editor";
import {Icons} from "@/app/admin/components/icons";
import {useAdminStorage} from "@/app/admin/context/storage";
import {useEffect, useState} from "react";
import {Post} from "@/app/admin/types";
export default function EditorLayout({postId}: {postId: string}) {
  const {FindBlogPost} = useAdminStorage()!;
  const [post, setPost] = useState<Post | undefined>(undefined);

  useEffect(() => {
    const fetchPost = async () => {
      const post = await FindBlogPost(postId);
      setPost(post);
    };

    fetchPost();
  }, [FindBlogPost, postId]);

  return (
    <>
      {post ? (
        <Editor
          post={{
            id: post.id,
            title: post.title,
            content: post.content,
            published: post.published,
          }}
        />
      ) : (
        <div className="h-screen w-full flex pt-20 justify-center ">
          <Icons.spinner className="h-10 w-10 animate-spin text-primary" />
        </div>
      )}
    </>
  );
}
