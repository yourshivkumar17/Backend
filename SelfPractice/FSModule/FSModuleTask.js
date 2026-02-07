// File System module import
const fs = require("fs");

// 1. File create + write data
fs.writeFileSync("student.txt", "Name: Rahul\nRoll No: 101");

// 2. File read
const data = fs.readFileSync("student.txt", "utf8");

// 3. Output display
console.log("Data from file:");
console.log(data);
