
require("dotenv").config();
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

const authRoutes = require("./routes/auth.routes");
const systemRoutes = require("./routes/system.routes");
const monitorRoutes = require("./routes/monitor.routes");
const networkRoutes = require("./routes/network.routes");

const app = express();
app.use(cors());
app.use(express.json());

// Database Connection
const MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost:27017/heihei";
mongoose.connect(MONGODB_URI)
    .then(() => console.log("Connected to MongoDB"))
    .catch((err) => console.error("Could not connect to MongoDB:", err));

app.use("/api/auth", authRoutes);
app.use("/api/system", systemRoutes);
app.use("/api/monitors", monitorRoutes);
app.use("/api/network", networkRoutes);

app.listen(4000, () => console.log("Backend running on port 4000"));
