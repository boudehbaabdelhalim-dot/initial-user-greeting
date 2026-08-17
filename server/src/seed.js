const db = require("./database");

console.log("Seeding SmartStock database...");

const seed = db.transaction(() => {
  // Clear existing demo data so the seed can be safely re-run.
  db.exec(`
    DELETE FROM sales;
    DELETE FROM order_items;
    DELETE FROM orders;
    DELETE FROM inventory;
    DELETE FROM ai_decisions;
    DELETE FROM alerts;
    DELETE FROM customers;
    DELETE FROM suppliers;
    DELETE FROM products;
  `);

  // -------------------------
  // PRODUCTS
  // -------------------------

  const insertProduct = db.prepare(`
    INSERT INTO products (
      name,
      sku,
      category,
      price,
      cost,
      stock,
      min_stock,
      daily_sales,
      lead_time_days,
      status
    )
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `);

  const products = [
    [
      "Organic Full Cream Milk 1L",
      "MILK-001",
      "Dairy",
      180,
      125,
      72,
      40,
      18,
      2,
      "healthy",
    ],
    [
      "Premium Basmati Rice 5kg",
      "RICE-001",
      "Grains",
      1450,
      980,
      18,
      30,
      12,
      4,
      "critical",
    ],
    [
      "Extra Virgin Olive Oil 750ml",
      "OIL-001",
      "Oils",
      1250,
      820,
      35,
      25,
      5,
      5,
      "healthy",
    ],
    [
      "Specialty Coffee Beans 500g",
      "COFFEE-001",
      "Coffee",
      980,
      610,
      21,
      20,
      4,
      7,
      "warning",
    ],
    [
      "Whole Wheat Bread 600g",
      "BREAD-001",
      "Bakery",
      120,
      70,
      14,
      20,
      16,
      1,
      "critical",
    ],
    [
      "Greek Yogurt 500g",
      "YOGURT-001",
      "Dairy",
      260,
      165,
      48,
      25,
      8,
      3,
      "healthy",
    ],
  ];

  const productIds = {};

  for (const product of products) {
    const result = insertProduct.run(...product);
    productIds[product[0]] = result.lastInsertRowid;
  }

  // -------------------------
  // INVENTORY
  // -------------------------

  const insertInventory = db.prepare(`
    INSERT INTO inventory (
      product_id,
      stock,
      reserved
    )
    VALUES (?, ?, ?)
  `);

  for (const product of products) {
    const productId = productIds[product[0]];
    const stock = product[5];

    insertInventory.run(productId, stock, 0);
  }

  // -------------------------
  // CUSTOMERS
  // -------------------------

  const insertCustomer = db.prepare(`
    INSERT INTO customers (
      name,
      email,
      phone,
      total_spent,
      orders_count,
      status
    )
    VALUES (?, ?, ?, ?, ?, ?)
  `);

  const customers = [
    [
      "Ahmed Benali",
      "ahmed@example.com",
      "0555000001",
      12450,
      18,
      "active",
    ],
    [
      "Sara Mansouri",
      "sara@example.com",
      "0555000002",
      9870,
      14,
      "active",
    ],
    [
      "Yacine Haddad",
      "yacine@example.com",
      "0555000003",
      7650,
      11,
      "active",
    ],
    [
      "Lina Kaci",
      "lina@example.com",
      "0555000004",
      5320,
      8,
      "active",
    ],
    [
      "Karim Touati",
      "karim@example.com",
      "0555000005",
      3150,
      5,
      "active",
    ],
  ];

  const customerIds = {};

  for (const customer of customers) {
    const result = insertCustomer.run(...customer);
    customerIds[customer[0]] = result.lastInsertRowid;
  }

  // -------------------------
  // SUPPLIERS
  // -------------------------

  const insertSupplier = db.prepare(`
    INSERT INTO suppliers (
      name,
      contact,
      lead_time_days,
      reliability,
      status
    )
    VALUES (?, ?, ?, ?, ?)
  `);

  const suppliers = [
    ["Algeria Food Supply", "0555100001", 4, 92, "active"],
    ["Premium Imports", "0555100002", 7, 87, "active"],
    ["Local Fresh Distribution", "0555100003", 2, 95, "active"],
  ];

  for (const supplier of suppliers) {
    insertSupplier.run(...supplier);
  }

  // -------------------------
  // ORDERS + SALES
  // -------------------------

  const insertOrder = db.prepare(`
    INSERT INTO orders (
      customer_id,
      total_amount,
      total_cost,
      status,
      created_at
    )
    VALUES (?, ?, ?, 'completed', datetime('now', 'localtime'))
  `);

  const insertOrderItem = db.prepare(`
    INSERT INTO order_items (
      order_id,
      product_id,
      quantity,
      unit_price,
      unit_cost
    )
    VALUES (?, ?, ?, ?, ?)
  `);

  const insertSale = db.prepare(`
    INSERT INTO sales (
      order_id,
      product_id,
      quantity,
      revenue,
      cost,
      profit,
      sold_at
    )
    VALUES (?, ?, ?, ?, ?, ?, datetime('now', 'localtime'))
  `);

  const sales = [
    ["Ahmed Benali", "Premium Basmati Rice 5kg", 4],
    ["Ahmed Benali", "Extra Virgin Olive Oil 750ml", 3],
    ["Sara Mansouri", "Organic Full Cream Milk 1L", 10],
    ["Sara Mansouri", "Greek Yogurt 500g", 5],
    ["Yacine Haddad", "Specialty Coffee Beans 500g", 4],
    ["Yacine Haddad", "Whole Wheat Bread 600g", 8],
    ["Lina Kaci", "Premium Basmati Rice 5kg", 3],
    ["Lina Kaci", "Organic Full Cream Milk 1L", 8],
    ["Karim Touati", "Extra Virgin Olive Oil 750ml", 2],
    ["Ahmed Benali", "Whole Wheat Bread 600g", 10],
    ["Sara Mansouri", "Premium Basmati Rice 5kg", 4],
    ["Yacine Haddad", "Organic Full Cream Milk 1L", 12],
  ];

  const productByName = new Map(products.map((p) => [p[0], p]));

  for (const [customerName, productName, quantity] of sales) {
    const customerId = customerIds[customerName];
    const productId = productIds[productName];
    const product = productByName.get(productName);

    const price = product[3];
    const cost = product[4];

    const revenue = price * quantity;
    const totalCost = cost * quantity;
    const profit = revenue - totalCost;

    const orderResult = insertOrder.run(
      customerId,
      revenue,
      totalCost
    );

    const orderId = orderResult.lastInsertRowid;

    insertOrderItem.run(
      orderId,
      productId,
      quantity,
      price,
      cost
    );

    insertSale.run(
      orderId,
      productId,
      quantity,
      revenue,
      totalCost,
      profit
    );
  }

  // -------------------------
  // AI DECISIONS
  // -------------------------

  const insertDecision = db.prepare(`
    INSERT INTO ai_decisions (
      agent,
      title,
      description,
      priority,
      status
    )
    VALUES (?, ?, ?, ?, ?)
  `);

  insertDecision.run(
    "Inventory Agent",
    "Reorder Premium Basmati Rice",
    "Stock is 18 units while minimum stock is 30 units. Daily sales are approximately 12 units and supplier lead time is 4 days.",
    "high",
    "pending"
  );

  insertDecision.run(
    "Inventory Agent",
    "Reorder Whole Wheat Bread",
    "Current stock is below the minimum threshold.",
    "high",
    "pending"
  );

  insertDecision.run(
    "CFO Agent",
    "Review high-margin products",
    "Several products are generating strong profit margins and may deserve increased inventory allocation.",
    "medium",
    "pending"
  );

  // -------------------------
  // ALERTS
  // -------------------------

  const insertAlert = db.prepare(`
    INSERT INTO alerts (
      type,
      title,
      message,
      severity,
      status
    )
    VALUES (?, ?, ?, ?, ?)
  `);

  insertAlert.run(
    "inventory",
    "Critical stock level",
    "Premium Basmati Rice has fallen below the minimum stock threshold.",
    "high",
    "active"
  );

  insertAlert.run(
    "inventory",
    "Bread stock is low",
    "Whole Wheat Bread inventory requires attention.",
    "high",
    "active"
  );

  insertAlert.run(
    "ai",
    "AI recommendation ready",
    "Inventory Agent has generated 2 reorder recommendations awaiting approval.",
    "medium",
    "active"
  );

  console.log("Products inserted:", products.length);
  console.log("Customers inserted:", customers.length);
  console.log("Suppliers inserted:", suppliers.length);
  console.log("Sales records inserted:", sales.length);
  console.log("AI decisions inserted: 3");
  console.log("Alerts inserted: 3");
});

try {
  seed();

  console.log("✅ SmartStock database seeded successfully.");
} catch (error) {
  console.error("❌ Seed failed:", error);
  process.exit(1);
} finally {
  db.close();
}