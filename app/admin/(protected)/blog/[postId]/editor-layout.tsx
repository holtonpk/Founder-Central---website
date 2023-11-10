"use client";
import {Editor} from "../components/editor";
import {useAdminStorage} from "@/app/admin/context/storage";
import {useEffect, useState} from "react";

export default function EditorLayout({postId}: {postId: string}) {
  const {FindBlogPost} = useAdminStorage()!;
  const [post, setPost] = useState<any>(null);

  useEffect(() => {
    const fetchPost = async () => {
      const post = await FindBlogPost(postId);
      setPost(post);
    };

    fetchPost();
  }, [FindBlogPost, postId]);

  if (!post) return <>loading</>;

  return (
    <>
      {post ? (
        <Editor
          post={{
            id: post.data.id,
            title: post.data.title,
            content: post.data.content,
            published: post.published,
          }}
        />
      ) : (
        <>loading</>
      )}
    </>
  );
}
