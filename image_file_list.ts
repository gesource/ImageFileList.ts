import * as fs from "fs";
import * as path from "path";
import * as sizeOf from "image-size";

const is_imagefile = (filename: string): boolean => {
    return [".BMP", ".GIF", ".JPG", ".PNG"].indexOf(path.extname(filename).toUpperCase()) !== -1;
};

console.log("filename,width,height");
const dir = process.argv[2];
fs.readdir(dir, (err, files) => {
    if (err) throw err;
    files.map((file: string): string => {
        // ディレクトリ名+ファイル名
        return path.join(dir, file);
    }).filter((file: string) => {
        // 画像ファイルのみ抽出
        return (fs.statSync(file).isFile()) && (is_imagefile(file));
    }).map((file: string): string => {
        // 画像サイズを取得
        const dimenstions = sizeOf(file);
        return `"${path.basename(file)}",${dimenstions.width},${dimenstions.height}`;
    }).forEach((value: string) => {
        console.log(value);
    });
});
