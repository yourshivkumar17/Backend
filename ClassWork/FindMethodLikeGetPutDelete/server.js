const http = require("http");
const fs = require("fs");
const path = require("path");

const logPath = path.join(__dirname, "log.txt");

const server = http.createServer((req, res) => {

    console.log("Request find:", req.url);
    console.log("Log file path:", logPath);

    const log = new Date().toISOString() + " " + req.method + " " + req.url + "\n";

    fs.appendFileSync(logPath, log);
 
    res.end("OK");
});

server.listen(3000, () => {
    console.log("Server Running...");
});