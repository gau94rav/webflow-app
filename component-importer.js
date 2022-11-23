const path = require("path");
const fs = require("fs");
const importPath = "../components/draggables/";
const directory = path.join(__dirname, "src/components/draggables");

fs.readdir(directory, (err, files) => {
    if (err) {
        return console.error(err);
    }
    let fileText = "";
    for (let name of files) {
        name = name.replace(".vue", "");
        fileText += `import ${name} from "${importPath}/${name}.vue";\n`;
    }
    fileText += `export {\n  ${files.join(",\n  ")}\n}`.replace(/.vue/gi, "")
    fs.writeFileSync("src/utils/components.js", fileText);
})