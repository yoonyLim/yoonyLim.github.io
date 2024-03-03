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
        <div className="prose">
            <h1>{ decodeURI(slug) }</h1>
            <MDXRemote source={content} />
        </div>
    );
}