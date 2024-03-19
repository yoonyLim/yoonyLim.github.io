import fs from "fs";

const getPostContent = (subject: string, slug: string) => {
    const path = "mdposts/" + subject + "/" + decodeURI(slug) + ".md";

    if (fs.existsSync(path)) {
        return fs.readFileSync(path, "utf8");
    } else {
        return null;
    }
}

export default getPostContent;