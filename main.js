const http = require("http")
const fs = require("fs")
const path = require("path")

const PORT = 8888

http.createServer((req, res) => {
    const pages = {
        "/": "html/home.html",
        "/home": "html/home.html",
        "/about": "html/about.html",
    }

    console.log(req.url)

    buildTheResponse(pages[req.url] || req.url, res)
}).listen(PORT, () => {
    console.log(`Der Server lauscht auf Port: ${PORT}`)
})

function buildTheResponse(path_, res) {
    const mimeTypes = {
        ".html": "text/html",
        ".js": "text/javascript",
        ".css": "text/css",
        ".json": "application/json",
        ".png": "image/png",
        ".jpg": "image/jpg",
        ".gif": "image/gif",
        ".svg": "image/svg+xml",
        ".wav": "audio/wav",
        ".mp4": "video/mp4",
        ".woff": "application/font-woff",
        ".ttf": "application/font-ttf",
        ".eot": "application/vnd.ms-fontobject",
        ".otf": "application/font-otf",
        ".wasm": "application/wasm",
    }
    console.log(path_)
    const extension = String(path.extname(path_)).toLowerCase()
    console.log(`This is the ext: ${mimeTypes[extension]}`)

    fs.readFile("./assets/" + path_, (err, data) => {
        if (err) {
            res.writeHead(500, { "Content-Type": "text/plain" })
            res.end("Au backe", "utf-8")
        }
        res.writeHead(200, { "Content-Type": mimeTypes[extension] })
        res.end(data.toString(), "utf-8")
    })
}
