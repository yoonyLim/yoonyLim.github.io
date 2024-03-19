import getSubjectMetadata from "@/utils/getSubjectMetadata";

export default function PostsPage(props: any) {
    return (
        <div className="h-full flex flex-col justify-center items-center md:pl-10 z-0">
            <div className="font-bold text-2xl text-gray-500 select-none">NOTHING FOUND</div>
        </div>
    )
}

export const generateStaticParams = async () => {
    const posts = getSubjectMetadata();
    return posts!.map((post) => ({
        subject: post.subject
    }));
}