const express = require('express')
const next = require('next')
const fs = require('fs');
const crypto = require('crypto');

async function generateSecret(name, strength = 32) {
    console.log("Generating " + name + " secret");
    const secret = crypto.randomBytes(strength).toString('hex');
    fs.appendFileSync(".env.local", `${name}=${secret}`);
}

if (!process.env.NEXT_MANUAL_SIG_HANDLE) {
    process.on('SIGTERM', () => process.exit(0))
    process.on('SIGINT', () => process.exit(0))
}
if (!process.env.JWT_TOKEN) generateSecret("JWT_TOKEN", 32);

const port = parseInt(process.env.PORT, 10) || 3000
const app = next({ dev: false })
const handle = app.getRequestHandler()

app.prepare().then(() => {
    const server = express()

    server.use("/image", express.static(__dirname + "/public/image", { maxAge: '1d' }));
    server.use("/icon", express.static(__dirname + "/public/icon", { maxAge: '1y' }));

    server.all('*', (req, res) => {
        var today = new Date();
        var date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
        var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
        var dateTime = date + ' ' + time;
        const ip = req.headers["x-real-ip"] || req.connection.remoteAddress;
        console.log(`${dateTime} ${ip}: ${req.method} ${req.path}`);
        return handle(req, res);
    })

    server.listen(port, (err) => {
        if (err) throw err
        console.log(`ready - started server on 0.0.0.0:${port}, url: http://localhost:${port}`)
    })
})