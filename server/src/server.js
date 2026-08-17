require("dotenv").config();

const express = require("express");
const cors = require("cors");

const db = require("./database");

const app = express();

const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.get("/api/health", (req, res) => {
  res.json({
    success: true,
    message: "SmartStock API is running",
  });
});

app.get("/api/dashboard", (req, res) => {
  try {
    const todayRevenue = db
      .prepare(`
        SELECT COALESCE(SUM(revenue), 0) AS value
        FROM sales
        WHERE DATE(sold_at) = DATE('now', 'localtime')
      `)
      .get().value;

    const todayProfit = db
      .prepare(`
        SELECT COALESCE(SUM(profit), 0) AS value
        FROM sales
        WHERE DATE(sold_at) = DATE('now', 'localtime')
      `)
      .get().value;

    const todayOrders = db
      .prepare(`
        SELECT COUNT(*) AS value
        FROM orders
        WHERE DATE(created_at) = DATE('now', 'localtime')
      `)
      .get().value;

    const activeCustomers = db
      .prepare(`
        SELECT COUNT(*) AS value
        FROM customers
        WHERE status = 'active'
      `)
      .get().value;

    const lowStockItems = db
      .prepare(`
        SELECT COUNT(*) AS value
        FROM products
        WHERE stock <= min_stock
      `)
      .get().value;

    const pendingDecisions = db
      .prepare(`
        SELECT COUNT(*) AS value
        FROM ai_decisions
        WHERE status = 'pending'
      `)
      .get().value;

    const activeAlerts = db
      .prepare(`
        SELECT COUNT(*) AS value
        FROM alerts
        WHERE status = 'active'
      `)
      .get().value;

    const monthlyRevenue = db
      .prepare(`
        SELECT COALESCE(SUM(revenue), 0) AS value
        FROM sales
        WHERE strftime('%Y-%m', sold_at) = strftime('%Y-%m', 'now', 'localtime')
      `)
      .get().value;

    const monthlyProfit = db
      .prepare(`
        SELECT COALESCE(SUM(profit), 0) AS value
        FROM sales
        WHERE strftime('%Y-%m', sold_at) = strftime('%Y-%m', 'now', 'localtime')
      `)
      .get().value;

    const profitMargin =
      monthlyRevenue > 0
        ? Number(((monthlyProfit / monthlyRevenue) * 100).toFixed(2))
        : 0;

    res.json({
      success: true,
      data: {
        kpis: {
          todayRevenue,
          todayProfit,
          todayOrders,
          activeCustomers,
          lowStockItems,
          pendingDecisions,
          activeAlerts,
          monthlyRevenue,
          monthlyProfit,
          profitMargin,
        },
      },
    });
  } catch (error) {
    console.error("Dashboard API error:", error);

    res.status(500).json({
      success: false,
      error: "Failed to load dashboard data",
    });
  }
});

app.get("/api/products", (req, res) => {
  try {
    const products = db
      .prepare(`
        SELECT *
        FROM products
        ORDER BY id DESC
      `)
      .all();

    res.json({
      success: true,
      data: products,
    });
  } catch (error) {
    console.error("Products API error:", error);

    res.status(500).json({
      success: false,
      error: "Failed to load products",
    });
  }
});

app.get("/api/alerts", (req, res) => {
  try {
    const alerts = db
      .prepare(`
        SELECT *
        FROM alerts
        WHERE status = 'active'
        ORDER BY created_at DESC
      `)
      .all();

    res.json({
      success: true,
      data: alerts,
    });
  } catch (error) {
    console.error("Alerts API error:", error);

    res.status(500).json({
      success: false,
      error: "Failed to load alerts",
    });
  }
});

app.get("/api/ai-decisions", (req, res) => {
  try {
    const decisions = db
      .prepare(`
        SELECT *
        FROM ai_decisions
        ORDER BY created_at DESC
      `)
      .all();

    res.json({
      success: true,
      data: decisions,
    });
  } catch (error) {
    console.error("AI Decisions API error:", error);

    res.status(500).json({
      success: false,
      error: "Failed to load AI decisions",
    });
  }
});

app.listen(PORT, () => {
  console.log(`SmartStock API running on http://localhost:${PORT}`);
});