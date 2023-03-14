import afs from 'fs/promises';
import fs from 'fs';
import path from 'path';
import { randomUUID } from 'crypto';

export class FilesystemModel {
    public static save = async (file: any, filepath = "") => {
        const destination = `./public/image/${filepath}/`;
        const data = afs.readFile(file);
        const ext = path.extname(file)
        do {
            var name = randomUUID() + ext;

        } while (fs.existsSync(destination + name));
        await afs.writeFile(destination + name, await data);

        return;
    }
}