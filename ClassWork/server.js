const http = require("http");
const fs = require("fs");

const PORT = 3000;
const file = "notes.json";

const server = http.createServer((req, res) => {

  res.setHeader("Content-Type", "application/json");

  
  if (req.method === "GET" && req.url === "/") {
    return res.end(JSON.stringify({ msg: "Welcome Baby Notes API" }));
  }

  
  if (req.method === "GET" && req.url === "/notes") {

    fs.readFile(file, "utf8", (err, data) => {
      if (err) return res.end(JSON.stringify([]));
      res.end(data);
    });

    return;
  }

 
  if (req.method === "POST" && req.url === "/notes") {

    let body = "";

    req.on("data", chunk => body += chunk);

    req.on("end", () => {

      const newNote = JSON.parse(body);

      fs.readFile(file, "utf8", (err, data) => {

        let notes = [];
        if (!err && data) notes = JSON.parse(data);

        newNote.id = notes.length + 1;
        notes.push(newNote);

        fs.writeFile(file, JSON.stringify(notes), () => {
          res.end(JSON.stringify(newNote));
        });

      });

    });

    return;
  }

  
  res.end(JSON.stringify({ error: "Not Found" }));

});

server.listen(PORT, () => {
  console.log("Server started on http://localhost:3000");
});
