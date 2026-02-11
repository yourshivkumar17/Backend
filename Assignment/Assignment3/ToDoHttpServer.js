const http = require("http");

let todos = [];

http.createServer((req, res) => {

    res.setHeader("Content-Type", "application/json");

    // GET - show todos
    if (req.method === "GET" && req.url === "/todos") {
        res.end(JSON.stringify(todos));
    }

    // POST - add todo
    else if (req.method === "POST" && req.url === "/todos") {

        let body = "";

        req.on("data", chunk => {
            body += chunk;
        });

        req.on("end", () => {
            const data = JSON.parse(body);

            todos.push({
                id: todos.length + 1,
                task: data.task
            });

            res.end(JSON.stringify({ message: "Todo added" }));
        });
    }

    else {
        res.end(JSON.stringify({ message: "Wrong route" }));
    }

}).listen(3000, () => {
    console.log("Server running at http://localhost:3000");
});
