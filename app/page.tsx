import getPostMetadata from "@/utils/getPostMetadata";
import Feed from "@/components/Feed";

export default function HomePage() {
  const postMetadata = getPostMetadata("all");

  return (
    <Feed postMetadata={postMetadata} />
  );
}