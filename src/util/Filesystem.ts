import afs from 'fs/promises';
import fs from 'fs';
import path from 'path';
import { randomUUID } from 'crypto';

export class Filesystem {
    public static saveImage = async (file: string, filepath = "") => {
        const destination = `./public/image/${filepath}/`;
        const data = afs.readFile(file);
        const ext = path.extname(file)
        do {
            var name = randomUUID() + ext;
        } while (fs.existsSync(destination + name));
        await afs.writeFile(destination + name, await data);

        return name;
    }

    public static remove = async (filepath: string) => {
        return afs.rm("./public/image/" + filepath);
    }
}