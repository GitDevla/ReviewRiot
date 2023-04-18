const express = require('express')
const next = require('next')

const port = parseInt(process.env.PORT, 10) || 3000
const dev = process.env.NODE_ENV !== 'production'
const app = next({ dev })
const handle = app.getRequestHandler()

app.prepare().then(() => {
    const server = express()

    server.use("/image", express.static(__dirname + "/public/image", { maxAge: '1d' }));

    server.all('*', (req, res) => {
        var today = new Date();
        var date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
        var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
        var dateTime = date + ' ' + time;
        const ip = req.headers["x-real-ip"] || req.connection.remoteAddress;
        console.log(`${dateTime} ${ip}: ${req.path}`);
        return handle(req, res);
    })

    server.listen(port, (err) => {
        if (err) throw err
        console.log(`ready - started server on 0.0.0.0:${port}, url: http://localhost:${port}`)
    })
})