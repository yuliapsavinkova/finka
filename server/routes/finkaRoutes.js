import express from "express";
import { getTrades } from "../controllers/finkaController.js";

const router = express.Router();

router.get("/", getTrades);

export default router;
