// Import built-in http module
const http = require("http");

// Create HTTP server
const server = http.createServer((req, res) => {

    // Set response status & headers
    res.writeHead(200, { "Content-Type": "text/plain" });

    // Send response and end
    res.end("Hello CBT Exam!\nWelcome to Node.js HTTP Server");
});

// Start server on port 3000
server.listen(3000, () => {
    console.log("Server running at http://localhost:3000");
});
