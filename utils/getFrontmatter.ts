import fs from "fs";
import matter from "gray-matter";
import getPostContent from "@/utils/getPostContent";

const getFrontmatter = (subject: string, slug: string) => {
  const path = "mdposts/" + subject + "/" + decodeURI(slug) + ".md";
  const frontmatter = matter(fs.readFileSync(path, "utf8"));

  const LETTERS_PER_MIN = 2000;

  return {
    title: frontmatter.data.title,
    subtitle: frontmatter.data.subtitle,
    date: frontmatter.data.date,
    readingTime: Math.ceil(getPostContent(subject, slug)!.length / LETTERS_PER_MIN)
  }
}

export default getFrontmatter;