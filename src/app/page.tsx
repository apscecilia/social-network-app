import { Suspense } from "react";
import PostFeed from "@/components/PostFeed";
import AuthCheck from "@/components/AuthCheck";
import Loading from "@/components/Loading";

export default function Home() {
  return (
    <AuthCheck>
      <div className="max-w-2xl mx-auto p-4 pb-20">
        <Suspense fallback={<Loading />}>
          <PostFeed />
        </Suspense>
      </div>
    </AuthCheck>
  );
}
