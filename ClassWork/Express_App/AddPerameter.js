const express = require("express");
const app = express();

app.get("/add/:a/:b", (req, res) => {
    console.log(req.params);
    res.send(parseInt(req.params.a) + parseInt(req.params.b));
});

app.listen(3000, () => {
    console.log("Server running on port 3000");
});