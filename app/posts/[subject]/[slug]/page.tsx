import getPostContent from "@/utils/getPostContent";
import Markdown from "markdown-to-jsx";
import matter from "gray-matter";
import getPostMetadata from "@/utils/getPostMetadata";
import { Suspense } from "react";
import { MathJax } from "./mathjax";
import NoSSR from "@/components/NoSSR";

export default function PostPage(props: any) {
    const subject = props.params.subject;
    const slug = props.params.slug;

    if (getPostContent(subject, slug) != null) {
        const post = matter(getPostContent(subject, slug)!);

        const rgx = /#{1,6} .+/g

        const headingNavs = []

        if (post.content.match(rgx)) {
            for (var i = 0; i < post.content.match(rgx)!.length; i++) {
                headingNavs.push(
                    <a 
                        href={'#' + post.content.match(rgx)![i].replaceAll('#', ' ').trim()}
                        className="flex w-fit max-w-72 my-2 text-ellipsis hover:text-gray-400 hover:dark:text-gray-500 hover:translate-x-1.5 transition duration-200 ease-in-out"
                    >{ post.content.match(rgx)![i].replaceAll('#', '') }</a>
                )
            }
        }

        return (
            // class "prose" is to revert tailwindcss in markdowns
            <Suspense>
                <div className="w-full xl:pl-20">
                    <NoSSR>
                        <MathJax/>
                        {
                            post.content.match(rgx) != null ? (
                                <div className="hidden xl:flex fixed left-20 top-52 max-w-72 max-h-[50%] overflow-y-scroll rounded p-4 bg-gray-300 dark:bg-[#24292f] shadow-[2px_2px_10px_2px_rgba(0,0,0,0.16)] dark:shadow-[2px_2px_10px_2px_rgba(0,0,0,1.0)]">
                                    <div className="w-fit flex flex-col">
                                        { headingNavs }
                                    </div>
                                </div>
                            ) : (
                                null
                            )
                        }
                        <h1 className="my-4">작성일: { post.data.date }</h1>
                        <h1>{ post.data.subject }</h1>
                        <article className="prose max-w-none dark:text-white dark:prose-invert">
                            <script src="https://polyfill.io/v3/polyfill.min.js?features=es6"></script>
                            <script id="MathJax-script" async src="https://cdn.jsdelivr.net/npm/mathjax@3/es5/tex-mml-chtml.js"></script>
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
                    </NoSSR>
                </div>
            </Suspense>
        );
    } else {
        return (
            <div className="h-full flex flex-col justify-center items-center md:pl-10 z-0">
                <div className="font-bold text-2xl text-gray-500 select-none">NOTHING FOUND</div>
            </div>
        )
    }
}

// return slug in order to make the website static by statically loading all the posts, not dynamically
export const generateStaticParams = async () => {
    const posts = getPostMetadata("all");

    return posts!.map((post) => ({
        subject: post.subject,
        slug: post.slug
    }));
}