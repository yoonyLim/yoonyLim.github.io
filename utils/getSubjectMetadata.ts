import fs from "fs";

const getSubjectMetadata = () => {
    const metadata = [];

    const root = "mdposts/";
    const subjects = fs.readdirSync(root);

    for (var subject of subjects) {
        metadata.push({"subject": subject});
    }

    return metadata;
}

export default getSubjectMetadata;