const fs = require("fs");

fs.writeFileSync("student.txt", "Name: Rahul\nRoll No: 101");

fs.appendFileSync("student.txt", "\nClass: B.Tech CSE");

const data = fs.readFileSync("student.txt", "utf8");
console.log("Data from file:");
console.log(data);

fs.renameSync("student.txt", "studentData.txt");  // rename file student.txt --> studentData.txt

if (fs.existsSync("studentData.txt")) {
    console.log("File exists");
}


