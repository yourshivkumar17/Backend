const fs = require("fs");
const path = require("path");

const file = path.join(__dirname, "todo.json");

const todos = JSON.parse(fs.readFileSync(file, "utf-8"));

for (let id in todos) {
  console.log(id, todos[id].title);
}
