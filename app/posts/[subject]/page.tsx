import getPostMetadata from "@/utils/getPostMetadata";
import Feed from "@/components/Feed";

export default function SubjectFeedPage(props: any) {
    const postMetadata = getPostMetadata(props.params.subject);

    return (
        <Feed postMetadata={postMetadata} />
    );
}
