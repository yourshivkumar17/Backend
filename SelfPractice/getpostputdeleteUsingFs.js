const http = require("http");
const fs = require("fs");

if(!fs.existsSync("notes.json")) {
   fs.writeFileSync("notes.json","[]");
}

const server = http.createServer((req,res) => {
  if(req.url ==="/") {
     res.end("Welcome to Notes API");
}
 else if(req.url ==="/notes" && req.method ==="GET") { 
   fs.readFile("notes.json","utf8",(err,data) => {
      res.end(data);
 });
}
else if(req.url === "/notes" && req.method ==="POST") {
 let body = "";
 req.on("data",chunk => body += chunk);
 req.on("end",() => {
   fs.readFile("notes.json","utf8",(err,data) => {
   let notes = JSON.parse(data || "[]");
   notes.push(JSON.parse(body));
fs.writeFile("notes.json",JSON.stringify(notes),() => {
 res.end("Note Added");
});
});
});
}  
else if(req.url ==="/notes" && req.method ==="PUT") {
let body = "";
req.on("data", chunk => body += chunk);
req.on("end", () => {
let updatedNote = JSON.parse(body);
fs.readFile("notes.json","utf8",(err,data) => {
let notes = JSON.parse(data || "[]");
notes = notes.map(n => n.id == updatedNote.id ? updatedNote:n);
fs.writeFile("notes.json",JSON.stringify(notes),() => {
res.end("Note Updated");
});
});
});
}
else if(req.url ==="/notes" && req.method==="DELETE") {
fs.writeFile("notes.json","[]", () => {
res.end("All Notes Deleted");
});
}
else {
res.writeHead(404);
res.end("not found");
}
}).listen(3000);
console.log("server is running on http://localhost:3000");
