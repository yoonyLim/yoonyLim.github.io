import fs from "fs";
import { MDXRemote } from "next-mdx-remote/rsc";

const getPostContent = (subject: string, slug: string) => {
    const folder = "mdposts/" + subject + "/";
    const file = `${folder}${decodeURI(slug)}.md`;
    return fs.readFileSync(file, "utf8");
}

export default function PostPage(props: any) {
    const subject = props.params.subject;
    const slug = props.params.slug;
    const content = getPostContent(subject, slug);

    return (
        // class "prose" is to revert tailwindcss in markdowns
        <div className="w-full">
            <h1>{ decodeURI(slug) }</h1>
            <div className="prose max-w-none">
                <MDXRemote source={content} />
            </div>
        </div>
    );
}