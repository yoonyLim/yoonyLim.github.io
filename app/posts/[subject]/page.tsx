import getPostMetadata from "@/utils/getPostMetadata";
import Feed from "@/components/Feed";
import getSubjectMetadata from "@/utils/getSubjectMetadata";
import { Suspense } from "react";

export default function SubjectFeedPage(props: any) {
    const postMetadata = getPostMetadata(props.params.subject);

    return (
        <Suspense>
            <Feed postMetadata={postMetadata} />
        </Suspense>
    );
}

export const generateStaticParams = async () => {
    const posts = getSubjectMetadata();
    return posts!.map((post) => ({
        subject: post.subject
    }));
}
