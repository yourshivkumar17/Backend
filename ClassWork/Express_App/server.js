const express = require("express");
const app = express();

app.get("/user", (req,res) => {
    res.json({name: "Shiv"});
})

app.listen(3000, () => {
    console.log("server is running on port 3000");
});