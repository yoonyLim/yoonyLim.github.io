import getPostContent from "@/utils/getPostContent";
import Markdown from "markdown-to-jsx";
import matter from "gray-matter";
import getPostMetadata from "@/utils/getPostMetadata";

export default function PostPage(props: any) {
    const subject = props.params.subject;
    const slug = props.params.slug;
    const post = matter(getPostContent(subject, slug));

    return (
        // class "prose" is to revert tailwindcss in markdowns
        <div className="w-full">
            <h1>{ post.data.title }</h1>
            <article className="prose max-w-none">
                <Markdown>{ post.content }</Markdown>
            </article>
        </div>
    );
}

// return slug in order to make the website static by statically loading all the posts, not dynamically
export const generateStaticParams = async () => {
    const posts = getPostMetadata("all");
    return posts.map((post) => ({
        subject: post.subject,
        slug: post.slug
    }));
}