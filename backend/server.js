/// server.js
import express from "express";
import mysql from "mysql2";
import cors from "cors";
import bodyParser from "body-parser";

const app = express();
app.use(cors());
app.use(bodyParser.json());

// 🧩 Connect to your MySQL database
const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "smartstarternew_db",
});

// 🟢 Connect to MySQL
db.connect((err) => {
  if (err) {
    console.error("❌ Database connection failed:", err);
  } else {
    console.log("✅ Connected to MySQL Database (smartstarternew_db)");
  }
});

// 🧠 Default route
app.get("/", (req, res) => {
  res.send("Backend server is running 🚀");
});

// 🧩 Register API
app.post("/api/register", (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    return res.status(400).json({ error: "All fields are required" });
  }

  const sql = "INSERT INTO users (name, email, password) VALUES (?, ?, ?)";
  db.query(sql, [name, email, password], (err, result) => {
    if (err) {
      console.error("❌ Database error:", err);
      return res.status(500).json({ error: "Database error" });
    }
    res.json({ message: "✅ User registered successfully!" });
  });
});

// 🧒 Child Info API
app.post("/api/child", (req, res) => {
  const { nickname, age, gender } = req.body;

  if (!nickname || !age || !gender) {
    return res.status(400).json({ message: "All fields are required" });
  }

  const sql = "INSERT INTO childinfo (nickname, age, gender) VALUES (?, ?, ?)";
  db.query(sql, [nickname, age, gender], (err, result) => {
    if (err) {
      console.error("❌ Error inserting child info:", err);
      return res.status(500).json({ message: "Database error" });
    }
    console.log("✅ Child info saved:", result);
    res.json({ message: "✅ Child info saved successfully!" });
  });
});

// 🧩 Login API
app.post("/api/login", (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ error: "Email and password are required" });
  }

  const sql = "SELECT * FROM users WHERE email = ? AND password = ?";
  db.query(sql, [email, password], (err, result) => {
    if (err) {
      console.error("❌ Database error:", err);
      return res.status(500).json({ error: "Database error" });
    }

    if (result.length > 0) {
      res.json({ message: "✅ Login successful", user: result[0] });
    } else {
      res.status(401).json({ error: "Invalid email or password" });
    }
  });
});

// 🧩 Stats API for HomeScreen (refactored)
app.get("/api/stats", async (req, res) => {
  try {
    const stats = {};

    // Promises for each query
    const totalUsersPromise = new Promise((resolve, reject) => {
      db.query("SELECT COUNT(*) AS totalUsers FROM users", (err, result) => {
        if (err) return reject(err);
        console.log("Total Users query result:", result);
        resolve(result[0].totalUsers);
      });
    });

    const activeUsersPromise = new Promise((resolve, reject) => {
      db.query("SELECT COUNT(*) AS activeUsers FROM users WHERE isActive = 1", (err, result) => {
        if (err) return reject(err);
        console.log("Active Users query result:", result);
        resolve(result[0].activeUsers);
      });
    });

    const totalCategoriesPromise = new Promise((resolve, reject) => {
      db.query("SELECT COUNT(*) AS totalCategories FROM categories", (err, result) => {
        if (err) return reject(err);
        console.log("Categories query result:", result); // 💡 dito makikita mo kung may data
        resolve(result[0].totalCategories);
      });
    });

    const totalFlashcardsPromise = new Promise((resolve, reject) => {
      db.query("SELECT COUNT(*) AS totalFlashcards FROM flashcards", (err, result) => {
        if (err) return reject(err);
        console.log("Flashcards query result:", result);
        resolve(result[0].totalFlashcards);
      });
    });

    // Execute all queries
    const [totalUsers, activeUsers, totalCategories, totalFlashcards] = await Promise.all([
      totalUsersPromise,
      activeUsersPromise,
      totalCategoriesPromise,
      totalFlashcardsPromise
    ]);

    // Assign results
    stats.totalUsers = totalUsers;
    stats.activeUsers = activeUsers;
    stats.totalCategories = totalCategories;
    stats.totalFlashcards = totalFlashcards;

    res.json(stats);

  } catch (err) {
    console.error("❌ Stats API error:", err);
    res.status(500).json({ error: "Database error" });
  }
});

// 🟢 Start server
app.listen(5000, "0.0.0.0", () => {
  console.log("✅ Server running on http://192.168.100.11:5000");
});
