const http = require("http");
const fs = require("fs");

const fileName = "students.json";

// Agar file exist nahi karti to bana do
if (!fs.existsSync(fileName)) {
  fs.writeFileSync(fileName, "[]");
}

const server = http.createServer((req, res) => {

  const url = new URL(req.url, `http://${req.headers.host}`);
  const path = url.pathname;
  const id = url.searchParams.get("id");

  // Helper function
  const sendJSON = (status, data) => {
    res.writeHead(status, { "Content-Type": "application/json" });
    res.end(JSON.stringify(data));
  };

  // Read existing students
  const getStudents = () => {
    const data = fs.readFileSync(fileName, "utf8");
    return JSON.parse(data);
  };

  const saveStudents = (students) => {
    fs.writeFileSync(fileName, JSON.stringify(students, null, 2));
  };

  // ================= GET =================
  if (req.method === "GET" && path === "/students") {
    const students = getStudents();

    if (id) {
      const student = students.find(s => s.id == id);
      if (!student) return sendJSON(404, { message: "Student not found" });
      return sendJSON(200, student);
    }

    return sendJSON(200, students);
  }

  // ================= POST =================
  else if (req.method === "POST" && path === "/students") {

    let body = "";

    req.on("data", chunk => body += chunk);

    req.on("end", () => {
      const data = JSON.parse(body);

      if (!data.name || !data.age || !data.course) {
        return sendJSON(400, { message: "All fields required" });
      }

      const students = getStudents();

      const newStudent = {
        id: students.length ? students[students.length - 1].id + 1 : 1,
        name: data.name,
        age: data.age,
        course: data.course
      };

      students.push(newStudent);
      saveStudents(students);

      return sendJSON(201, newStudent);
    });
  }

  // ================= PUT =================
  else if (req.method === "PUT" && path === "/students") {

    if (!id) return sendJSON(400, { message: "ID required" });

    let body = "";

    req.on("data", chunk => body += chunk);

    req.on("end", () => {
      const updates = JSON.parse(body);
      const students = getStudents();

      const student = students.find(s => s.id == id);

      if (!student) return sendJSON(404, { message: "Student not found" });

      // Update only provided fields
      if (updates.name) student.name = updates.name;
      if (updates.age) student.age = updates.age;
      if (updates.course) student.course = updates.course;

      saveStudents(students);

      return sendJSON(200, student);
    });
  }

  // ================= DELETE =================
  else if (req.method === "DELETE" && path === "/students") {

    if (!id) return sendJSON(400, { message: "ID required" });

    let students = getStudents();
    const newStudents = students.filter(s => s.id != id);

    if (students.length === newStudents.length) {
      return sendJSON(404, { message: "Student not found" });
    }

    saveStudents(newStudents);

    return sendJSON(200, { message: "Student deleted successfully" });
  }

  // ================= 404 =================
  else {
    sendJSON(404, { message: "Route not found" });
  }

});

server.listen(3000, () => {
  console.log("Server running at http://localhost:3000");
});