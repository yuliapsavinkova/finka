// import { google } from "googleapis";

// // Initialize authentication
// const auth = new google.auth.GoogleAuth({
//   keyFile: "_keys/google-service-account.json",
//   scopes: ["https://www.googleapis.com/auth/spreadsheets"],
// });

// // Spreadsheet and Range Info
// const SHEET_ID = "1G71gRwk4CaZPtrMYrzOfxmkta9XE71EUtUtFHubitD0";
// const SHEET_NAME = "Sheet1";

// // Fetch trades from Google Sheets
// export async function fetchTrades() {
//   try {
//     const client = await auth.getClient();
//     const sheetsAPI = google.sheets({ version: "v4", auth: client });

//     const response = await sheetsAPI.spreadsheets.values.get({
//       spreadsheetId: SHEET_ID,
//       range: `${SHEET_NAME}!A:D`, // Fetch all rows in columns A to D
//     });

//     const values = response.data.values || [];

//     if (values.length === 0) {
//       console.log("No trades found.");
//       return [];
//     }

//     // Convert array of arrays to objects (if headers exist)
//     const headers = values[0];
//     const trades = values.slice(1).map((row) => ({
//       symbol: row[0],
//       quantity: parseInt(row[1], 10),
//       price: parseFloat(row[2]),
//       date: row[3],
//     }));

//     console.log("Fetched Trades:", trades);
//     return trades;
//   } catch (error) {
//     console.error("Error fetching trades:", error);
//     return [];
//   }
// }

// // Save new trades to Google Sheets
// export async function saveTrades(trades: string[][]) {
//   try {
//     const client = await auth.getClient();
//     const sheetsAPI = google.sheets({ version: "v4", auth: client });

//     const response = await sheetsAPI.spreadsheets.values.append({
//       spreadsheetId: SHEET_ID,
//       range: `${SHEET_NAME}!A:D`, // Append to next available row
//       valueInputOption: "RAW",
//       requestBody: {
//         values: trades,
//       },
//     });

//     console.log("Trades saved successfully:", response.data);
//   } catch (error) {
//     console.error("Error saving trades:", error);
//   }
// }

// // ✅ Test fetching trades
// fetchTrades();

// // ✅ Test saving trades
// const newTrades = [
//   ["META", "100", "150.25", "2025-03-08"],
//   ["TSLA", "50", "800.50", "2025-03-08"],
// ];
// saveTrades(newTrades);
