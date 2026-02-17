const http = require("http");
const fs = require("fs");
const path = require("path");

const PORT = 3000;
const filePath = path.join(__dirname, "notes.json");

const server = http.createServer((req, res) => {

  const url = new URL(req.url, `http://${req.headers.host}`);
  const pathname = url.pathname;

  res.setHeader("Content-Type", "application/json");

  if (req.method === "GET" && pathname === "/") {
    return res.end(JSON.stringify({ message: "Welcome to Notes API" }));
  }

  if (req.method === "GET" && pathname === "/notes") {

    fs.readFile(filePath, "utf8", (err, data) => {

      if (err) {
        res.writeHead(500);
        return res.end(JSON.stringify({ error: "File read error" }));
      }

      const notes = JSON.parse(data || "[]");
      const id = url.searchParams.get("id");

      if (id) {
        const note = notes.find(n => n.id == id);
        return res.end(JSON.stringify(note || { error: "Note not found" }));
      }

      res.end(JSON.stringify(notes));
    });

    return;
  }

  if (req.method === "POST" && pathname === "/notes") {

    let body = "";

    req.on("data", chunk => {
      body += chunk;
    });

    req.on("end", () => {

      try {
        const newNote = JSON.parse(body);

        fs.readFile(filePath, "utf8", (err, data) => {

          const notes = JSON.parse(data || "[]");

          newNote.id = notes.length + 1;
          notes.push(newNote);

          fs.writeFile(filePath, JSON.stringify(notes, null, 2), (err) => {

            if (err) {
              res.writeHead(500);
              return res.end(JSON.stringify({ error: "File write error" }));
            }

            res.writeHead(201);
            res.end(JSON.stringify(newNote));
          });

        });

      } catch {
        res.writeHead(400);
        res.end(JSON.stringify({ error: "Invalid JSON" }));
      }

    });

    return;
  }

  res.writeHead(404);
  res.end(JSON.stringify({ error: "Route Not Found" }));

});

server.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
