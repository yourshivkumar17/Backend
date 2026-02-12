const fs = require("fs");

// Create & Write
fs.writeFileSync("student.txt", "Name: Rahul\nRoll No: 101");

// Append
fs.appendFileSync("student.txt", "\nClass: B.Tech CSE");

// Read
const data = fs.readFileSync("student.txt", "utf8");
console.log("Data from file:\n", data);

// Rename
fs.renameSync("student.txt", "studentData.txt");
console.log("File renamed");

// Check existence
if (fs.existsSync("studentData.txt")) {
    console.log("File exists after rename");
}

// Delete
fs.unlinkSync("studentData.txt");
console.log("File deleted");
