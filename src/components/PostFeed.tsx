"use client";

import { useEffect, useState } from "react";
import { Post as PostType } from "@/lib/types";
import Post from "./Post";
import { getDocuments } from "@/lib/firebase/firebaseUtils";

export default function PostFeed() {
  const [posts, setPosts] = useState<PostType[]>([]);

  useEffect(() => {
    const loadPosts = async () => {
      const fetchedPosts = await getDocuments("posts");
      setPosts(fetchedPosts.sort((a, b) => b.createdAt - a.createdAt));
    };
    loadPosts();
  }, []);

  return (
    <div className="space-y-4">
      {posts.map((post) => (
        <Post key={post.id} post={post} />
      ))}
    </div>
  );
} 