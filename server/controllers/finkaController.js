import pool from "../config/db.js";

export const getTrades = async (req, res) => {
  try {
    const trades = await pool.query(`
        SELECT * FROM trades ORDER BY trade_date DESC
      `);

    console.log("fetched trades", trades);
    // res.status(200).json({ success: true, data: trades });
    res.json(trades.rows);
  } catch (error) {
    console.log("Error in getTrades function", error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};
