import getPostMetadata from "@/utils/getPostMetadata";
import Feed from "@/components/Feed";
import getSubjectMetadata from "@/utils/getSubjectMetadata";

export default function SubjectFeedPage(props: any) {
    const postMetadata = getPostMetadata(props.params.subject);

    return (
        <Feed postMetadata={postMetadata} />
    );
}

export const generateStaticParams = async () => {
    const posts = getSubjectMetadata();
    return posts!.map((post) => ({
        subject: post.subject
    }));
}
