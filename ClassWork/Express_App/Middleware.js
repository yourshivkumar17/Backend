const express = require("express");
const app = express();

// middleware
app.use((req, res, next) => {
    console.log("Middleware is Running...");
    next(); // next function ko call karna zaroori hai
});

app.get("/", (req, res) => {
    res.send("Hello World");
});

app.listen(3000);