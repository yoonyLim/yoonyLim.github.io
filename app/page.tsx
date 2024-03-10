import getPostMetadata from "@/utils/getPostMetadata";
import PostPreview from "@/components/PostPreview";

export default function HomePage() {
  const postMetadata = getPostMetadata("all");
  const postPreviews = postMetadata.map((meatadata) => (
    <PostPreview key={meatadata.slug} {...meatadata} />
  ))

  return (
    <div className="grid md:grid-cols-2 gap-4">{ postPreviews }</div>
  );
}
