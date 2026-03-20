const express = require("express");
const app = express();

app.get("/sum", (req,res) => {
    console.log(req.query);
    res.send(parseInt(req.query.a) + parseInt(req.query.b));
});

app.listen(3000, () => {
    console.log("Server running on port 3000");
});