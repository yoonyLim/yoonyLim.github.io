import fs from "fs";
import { PostMetadata } from "./PostMetadata";
import getFrontmatter from "./getFrontmatter";

const getPostMetadata = (subject: string) => {
    // metadata to return
    let metadata: PostMetadata[] = [];
  
    // get all posts of all subjects or a certain subject in "mdposts" folder
    if (subject == "all") {
      const root = "mdposts/";
      const subjects = fs.readdirSync(root);
  
      for (var subject of subjects) {
        const files = fs.readdirSync(root + subject + "/");
        const mdPosts = files.filter((file) => file.endsWith(".md"));
        const slugs = mdPosts.map((file) => file.replace(".md", ""));
  
        for (var slug of slugs) {
            const frontmatter = getFrontmatter(subject, slug);
            metadata.push({"subject": subject, "slug": slug, "title": frontmatter.title, "subtitle": frontmatter.subtitle, "date": frontmatter.date, "readingTime": frontmatter.readingTime});
        }
      }
      
      return metadata;
      
    } else {
      const root = "mdposts/" + subject + "/";

      if (fs.existsSync(root)) {
        const files = fs.readdirSync(root);

        const mdPosts = files.filter((file) => file.endsWith(".md"));
        const slugs = mdPosts.map((file) => file.replace(".md", ""));
    
        for (var slug of slugs) {
          const frontmatter = getFrontmatter(subject, slug);
          metadata.push({"subject": subject, "slug": slug, "title": frontmatter.title, "subtitle": frontmatter.subtitle, "date": frontmatter.date,  "readingTime": frontmatter.readingTime});
        }
    
        return metadata;
      } else {
        return null;
      }
    }
  }

  export default getPostMetadata;