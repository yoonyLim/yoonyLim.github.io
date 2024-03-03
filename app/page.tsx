import fs from "fs";
import Link from "next/link";

const getPostMetadata = (subject: string) => {
  let urls: {subject: string, slug: string}[] = [];

  // get all posts of all subjects or a certain subject in "mdposts" folder
  if (subject == "all") {
    const root = "mdposts/";
    const subjects = fs.readdirSync(root);

    for (var subject of subjects) {
      const files = fs.readdirSync(root + subject + "/");
      const mdPosts = files.filter((file) => file.endsWith(".md"));
      const slugs = mdPosts.map((file) => file.replace(".md", ""));

      for (var slug of slugs) {
        urls.push({"subject": subject, "slug": slug})
      }
    }
    
    return urls;
  } else {
    const root = "mdposts/" + subject + "/";
    const files = fs.readdirSync(root);
    const mdPosts = files.filter((file) => file.endsWith(".md"));
    const slugs = mdPosts.map((file) => file.replace(".md", ""));

    for (var slug of slugs) {
      urls.push({"subject": subject, "slug": slug})
    }

    return urls;
  }
}

export default function Home() {
  const postMetadata = getPostMetadata("all");
  const postPreviews = postMetadata.map((url) => (
    <div>
      <Link href={`/posts/${url.subject}/${url.slug}`}>
        <h2>{ url.slug }</h2>
      </Link>
    </div>
  ))

  return (
    <div>{ postPreviews }</div>
  );
}
