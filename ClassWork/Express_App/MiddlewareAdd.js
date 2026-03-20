const express = require("express");
const app = express();

// middleware
app.use((req, res, next) => {
    console.log("Middleware is Running");
    next();
});

// add numbers
app.get("/add", (req, res) => {
    res.send((+req.query.a + +req.query.b) + "");
});

app.listen(3000);