const http = require("http");
const fs = require("fs");
if(!fs.existsSync("notes.json")) {
    fs.writeFileSync("notes.json", "[]");
}
const server =http.createServer((req,res) => {
    if(req.url === "/") {
        res.end("Welcome to Notes ApI");
    }
    else if(req.url === "/notes" && req.method === "GET") {
        fs.readFile("notes.json", "utf8", (error,data) => {
            res.end(data);
        });
    }
    else if(req.url === "/notes" && req.method === "POST") {
        let body = "";
        req.on("data", chunk => body += chunk);
        req.on("end", () => {
            fs.readFile("notes.json", "utf8", (error,data) => {
                let notes = JSON.parse(data || "[]");
                notes.push(JSON.parse(body));
                fs.writeFile("notes.json", JSON.stringify(notes), () => {
                    res.end("Note Added");
                });
            });
        });
    }
    else {
        res.writeHead(404);
        res.end("Not Found");
    }
}).listen(3000);
console.log("Server is Running on http://localhost:3000");