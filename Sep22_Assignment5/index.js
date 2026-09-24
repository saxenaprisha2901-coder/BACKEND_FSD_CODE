import express from "express";
import fs from "fs";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const DATA_FILE = path.join(__dirname, "request.json");

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Helper function to read requests from JSON file
const readRequestsFromFile = () => {
  try {
    if (!fs.existsSync(DATA_FILE)) {
      fs.writeFileSync(DATA_FILE, "[]", "utf-8");
      return [];
    }
    const rawData = fs.readFileSync(DATA_FILE, "utf-8");
    return JSON.parse(rawData || "[]");
  } catch (error) {
    console.error("Error reading requests.json:", error);
    return [];
  }
};

// Helper function to write requests to JSON file
const writeRequestsToFile = (data) => {
  fs.writeFileSync(DATA_FILE, JSON.stringify(data, null, 2), "utf-8");
};

// 1. GET /api/requests - Get all requests
app.get("/api/requests", (req, res) => {
  const requests = readRequestsFromFile();
  res.status(200).json(requests);
});

// 2. GET /api/requests/:id - Get a single request by ID
app.get("/api/requests/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const requests = readRequestsFromFile();
  const foundRequest = requests.find((r) => r.id === id);

  if (!foundRequest) {
    return res.status(404).json({ message: "Request not found" });
  }

  res.status(200).json(foundRequest);
});

// 3. POST /api/requests - Create a new request
app.post("/api/requests", (req, res) => {
  const { studentName, email, category, description, priority, status } = req.body;

  if (!studentName || !email || !category || !description) {
    return res.status(400).json({ message: "All required fields must be filled" });
  }

  const requests = readRequestsFromFile();

  const newId = requests.length > 0 ? Math.max(...requests.map((r) => r.id)) + 1 : 1;

  const newRequest = {
    id: newId,
    studentName: studentName.trim(),
    email: email.trim(),
    category: category.trim(),
    description: description.trim(),
    priority: priority || "Medium",
    status: status || "Pending",
    createdAt: new Date().toISOString().split("T")[0],
  };

  requests.push(newRequest);
  writeRequestsToFile(requests);

  res.status(201).json(newRequest);
});

// 4. PUT /api/requests/:id - Update an existing request
app.put("/api/requests/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const { studentName, email, category, description, priority, status } = req.body;

  const requests = readRequestsFromFile();
  const index = requests.findIndex((r) => r.id === id);

  if (index === -1) {
    return res.status(404).json({ message: "Request not found" });
  }

  // Update existing request with provided fields
  requests[index] = {
    ...requests[index],
    ...(studentName && { studentName: studentName.trim() }),
    ...(email && { email: email.trim() }),
    ...(category && { category: category.trim() }),
    ...(description && { description: description.trim() }),
    ...(priority && { priority }),
    ...(status && { status }),
  };

  writeRequestsToFile(requests);
  res.status(200).json(requests[index]);
});

// 5. DELETE /api/requests/:id - Delete a request
app.delete("/api/requests/:id", (req, res) => {
  const id = parseInt(req.params.id);
  let requests = readRequestsFromFile();
  const exists = requests.some((r) => r.id === id);

  if (!exists) {
    return res.status(404).json({ message: "Request not found" });
  }

  requests = requests.filter((r) => r.id !== id);
  writeRequestsToFile(requests);

  res.status(200).json({ message: "Request deleted successfully", id });
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});