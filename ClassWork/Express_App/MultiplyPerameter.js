const express = require("express");
const app = express();

app.get("/multiply/:a/:b", (req,res) => {
    console.log(req.params);
    res.send(parseInt(req.params.a) * parseInt(req.params.b));
});

app.listen(3000, () => {
    console.log("Server running on localhost 3000:");
});