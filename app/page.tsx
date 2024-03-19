import getPostMetadata from "@/utils/getPostMetadata";
import Feed from "@/components/Feed";
import { Suspense } from "react";

export default function HomePage() {
  const postMetadata = getPostMetadata("all");

  return (
    <Suspense>
      <Feed postMetadata={postMetadata} />
    </Suspense>
  );
}