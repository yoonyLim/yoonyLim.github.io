import fs from "fs";

const getPostContent = (subject: string, slug: string) => {
    const path = "mdposts/" + subject + "/" + decodeURI(slug) + ".md";
    return fs.readFileSync(path, "utf8");
}

export default getPostContent;