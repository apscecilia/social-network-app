"use client";

import { useState } from "react";
import { useAuth } from "@/lib/hooks/useAuth";
import { addDocument, uploadFile } from "@/lib/firebase/firebaseUtils";
import { useRouter } from "next/navigation";

export default function CreatePost() {
  const { user } = useAuth();
  const router = useRouter();
  const [content, setContent] = useState("");
  const [image, setImage] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user || !content) return;

    setLoading(true);
    try {
      let imageUrl = "";
      if (image) {
        imageUrl = await uploadFile(image, `posts/${user.uid}/${Date.now()}`);
      }

      await addDocument("posts", {
        userId: user.uid,
        userName: user.displayName,
        userAvatar: user.photoURL,
        content,
        imageUrl,
        likes: [],
        comments: [],
        createdAt: Date.now(),
      });

      router.push("/");
    } catch (error) {
      console.error("Error creating post:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-4">
      <form onSubmit={handleSubmit} className="space-y-4">
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="What's on your mind?"
          className="w-full p-4 border rounded-lg resize-none h-32"
        />
        <input
          type="file"
          accept="image/*"
          onChange={(e) => setImage(e.target.files?.[0] || null)}
          className="w-full"
        />
        <button
          type="submit"
          disabled={loading || !content}
          className="w-full bg-blue-500 text-white py-2 rounded-lg disabled:opacity-50"
        >
          {loading ? "Posting..." : "Post"}
        </button>
      </form>
    </div>
  );
} 