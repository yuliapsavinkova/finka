import express from "express";
import helmet from "helmet";
import morgan from "morgan";
import cors from "cors";
import { google } from "googleapis";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";

dotenv.config();

const PORT = process.env.PORT;
const app = express();
// Getting the script's folder path
const __dirname = path.dirname(fileURLToPath(import.meta.url));
// Getting the project's root
// const __dirname = path.resolve();

// CORS Middleware
app.use(
  cors(/*{
    origin: "https://yourfrontend.com",
    methods: "GET,POST,PUT,DELETE",
    allowedHeaders: "Content-Type,Authorization",
  }*/)
);

// Enables JSON body parsing.
app.use(express.json());

// Security Middleware
app.use(
  helmet(/*{
  contentSecurityPolicy: {
    directives: {
      defaultSrc: ["'self'"],  // Only allow loading content from the same origin
      scriptSrc: ["'self'", 'trusted-scripts.com'],  // Allow scripts from the same origin and a trusted source
    },
  },
  frameguard: { action: 'deny' },  // Disallow iframe embedding
}*/)
);

// Log the ruquests
app.use(morgan("dev"));

// Set Content Security Policy (CSP) headers to prevent XSS attacks
app.use((req, res, next) => {
  res.setHeader("Content-Security-Policy", "default-src 'self'; font-src 'self' data:");
  next();
});

/*app.use((req, res, next) => {
  res.setHeader("Content-Security-Policy", 
    "default-src 'self'; " +
    "script-src 'self' https://cdn.jsdelivr.net; " + 
    "style-src 'self' https://fonts.googleapis.com; " + 
    "font-src 'self' https://fonts.gstatic.com data:;"
  );
  next();
});*/

// Google Sheets Authentication
const auth = new google.auth.GoogleAuth({
  keyFile: path.join(__dirname, "../_keys/google-service-account.json"),
  scopes: ["https://www.googleapis.com/auth/spreadsheets"],
});

const SHEET_ID = "1G71gRwk4CaZPtrMYrzOfxmkta9XE71EUtUtFHubitD0";
const SHEET_NAME = "Sheet1";

// Fetch trades
app.get("/api/google-trades", async (req, res) => {
  try {
    const client = await auth.getClient();
    const sheetsAPI = google.sheets({ version: "v4", auth: client });

    const response = await sheetsAPI.spreadsheets.values.get({
      spreadsheetId: SHEET_ID,
      range: SHEET_NAME,
    });

    res.json(response.data.values || []);
  } catch (error) {
    console.error("Error fetching trades:", error);
    res.status(500).json({ error: "Failed to fetch trades" });
  }
});

// Save trades
app.post("/api/google-trades", async (req, res) => {
  try {
    const client = await auth.getClient();
    const sheetsAPI = google.sheets({ version: "v4", auth: client });

    const { trades } = req.body;
    if (!Array.isArray(trades) || trades.length === 0) {
      return res.status(400).json({ error: "Invalid trades data" });
    }

    const response = await sheetsAPI.spreadsheets.values.append({
      spreadsheetId: SHEET_ID,
      range: `${SHEET_NAME}!A:D`,
      valueInputOption: "RAW",
      requestBody: { values: trades },
    });

    res.json({ message: "Trades saved successfully", response: response.data });
  } catch (error) {
    console.error("Error saving trades:", error);
    res.status(500).json({ error: "Failed to save trades" });
  }
});

// Root Route
app.get("/", (req, res) => {
  res.send("Server is running...");
});

app.get("/api/my-trades", (req, res) => {
  res.json({
    Trades: [
      { symbol: "MSFT", quantity: 10, price: 130, date: "3/11/2025" },
      { symbol: "GOOGL", quantity: 15, price: 1200, date: "3/11/2025" },
    ],
  });
});

// If need to deploy server and client together
// app.use(express.static(path.join(__dirname, "dist")));
// app.get("*", (req, res) => {
//   res.sendFile(path.join(__dirname, "dist", "index.html"));
// });

// Start Server
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
