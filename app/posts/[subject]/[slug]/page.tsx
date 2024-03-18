import getPostContent from "@/utils/getPostContent";
import Markdown from "markdown-to-jsx";
import matter from "gray-matter";
import getPostMetadata from "@/utils/getPostMetadata";

export default function PostPage(props: any) {
    const subject = props.params.subject;
    const slug = props.params.slug;
    const post = matter(getPostContent(subject, slug));

    const rgx = /#{1,6} .+/g

    const headingNavs = []

    for (var i = 0; i < post.content.match(rgx)!.length; i++) {
        headingNavs.push(
            <a 
                href={'#' + post.content.match(rgx)![i].replaceAll('#', ' ').trim()}
                className="flex w-fit hover:text-gray-500 transition-colors duration-200 ease-in-out"
            >{ post.content.match(rgx)![i] }</a>
        )
    }

    return (
        // class "prose" is to revert tailwindcss in markdowns
        <div className="w-full">
            <div className="hidden xl:flex fixed left-20 top-[25rem] max-w-72 rounded p-4 bg-gray-500 dark:bg-[#24292f]">
                <div className="flex flex-col flex-wrap w-fit space-y-4">
                    { headingNavs }
                </div>
            </div>
            <h1 className="my-4">작성일: { post.data.date }</h1>
            <h1>{ post.data.subject }</h1>
            <article className="prose max-w-none dark:text-white dark:prose-invert">
                <Markdown options={{
                        slugify: str => str,
                        overrides: {
                            h1: {
                                props: {
                                    className: "scroll-mt-24"
                                }
                            },
                            h2: {
                                props: {
                                    className: "scroll-mt-24"
                                }
                            },
                            h3: {
                                props: {
                                    className: "scroll-mt-24"
                                }
                            },
                            h4: {
                                props: {
                                    className: "scroll-mt-24"
                                }
                            },
                            h5: {
                                props: {
                                    className: "scroll-mt-24"
                                }
                            },
                            h6: {
                                props: {
                                    className: "scroll-mt-24"
                                }
                            }
                        }
                    }}
                >{ post.content }</Markdown>
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