const fs = require('fs');
const asd = require('uuid');
const fsExtra = require('fs-extra');
const request = require('request');
fsExtra.emptyDirSync("picture")

var download = function (uri, filename, callback) {
    request.head(uri, function (err, res, body) {
        request(uri).pipe(fs.createWriteStream(filename)).on('close', callback);
    });
};

let rawdata = fs.readFileSync('api.json');
let json = JSON.parse(rawdata);
const xd = json.items.map(i => { return { title: i.title, year: i.year, img: i.image } });

console.log("INSERT INTO `movie` (`name`, `release_date`, `image_path`) VALUES");
for (const i of xd) {
    let img;
    do {
        img = asd.v4() + ".jpg";
    } while (fs.existsSync("picture\\" + img));


    let explode = i.img.split("_");
    explode[2] = "UX640"
    explode[3] = "CR0,12,640,880"
    download(explode.join('_'), "picture\\" + img, () => { });
    console.log(`("${i.title}", "${i.year}", "${img}"),`);
}