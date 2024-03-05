import Link from "next/link";
import { PostMetadata } from "@/utils/PostMetadata";

export default function PostPreview(props: PostMetadata) {
    return (
    <div>
      <Link href={`/posts/${props.subject}/${props.slug}`}>
        <h2>{ props.title }</h2>
      </Link>
      <p>{ props.subtitle }</p>
      <p>{ props.date }</p>
      <p>{ props.readingTime } min read</p>
    </div>
    );
}