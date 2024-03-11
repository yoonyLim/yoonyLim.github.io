import Link from "next/link";
import { PostMetadata } from "@/utils/PostMetadata";

export default function PostPreview(props: PostMetadata) {
    return (
    <div className="border rounded">
      <Link href={`/posts/${props.subject}/${props.slug}`}>
        <div className="p-4">
          <h2>{ props.title }</h2>
          <p>{ props.subtitle }</p>
          <p>{ props.date }</p>
          <p>{ props.readingTime } min read</p>
        </div>
      </Link>
    </div>
    );
}