const express = require("express");
const router = express.Router();
const Order = require("./orders.model");
const OrderItem = require("./orderItems.model");
//const authenticate = require("../middleware/authenticate"); // Assuming JWT-based auth middleware
const authenticate = (req, res, next) => {
  console.log("Authentication middleware triggered");
  next();
};
const { body, validationResult } = require("express-validator");



// Create an Order
router.post(
  "/",
  authenticate,
  [
    body("customer_id").isInt().withMessage("Customer ID must be an integer"),
    body("total_price").isFloat({ min: 0.01 }).withMessage("Total price must be valid"),
    body("payment_method").isIn(["eSewa", "Khalti", "Cash On Delivery"]).withMessage("Invalid payment method"),
    body("address.province").notEmpty().withMessage("Province is required"),
    body("address.district").notEmpty().withMessage("District is required"),
    body("address.municipality").notEmpty().withMessage("Municipality is required"),
    body("address.additionalInfo").optional().isString(),
    body("products").isArray({ min: 1 }).withMessage("At least one product is required"),
    body("products.*.id").isInt().withMessage("Product ID must be an integer"),
    body("products.*.name").isString().withMessage("Product name must be a string"),
    body("products.*.quantity").isInt({ min: 1 }).withMessage("Quantity must be at least 1"),
    body("products.*.price").isFloat({ min: 0.01 }).withMessage("Price must be valid"),
  
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const { customer_id, total_price, payment_method, address, products } = req.body;

      // Step 1: Create the order
      const newOrder = await Order.create({
        customer_id,
        total_price,
        payment_method,
        address: JSON.stringify(address), // Store address as JSON
      });
      console.log("New Order Created:", newOrder.dataValues); // Debugging line
      

      // Step 2: Insert products into OrderItem
      const orderItems = products.map(({ id, quantity, price }) => ({
        order_id: newOrder.order_id,
        product_id: id,
        vendor_id: 1, // Adjust vendor logic based on your system
        quantity,
        subtotal: quantity * price,
      }));
      console.log("Order Items to be inserted:", orderItems); 
      try {
        console.log("Attempting to insert order items...");
        await OrderItem.bulkCreate(orderItems);
        console.log("Order items inserted successfully!");
      } catch (error) {
        console.error("Error inserting order items:", error);
        if (error.errors) {
          error.errors.forEach((err) => console.error(err.message));
        }
      
      }

      res.status(201).json({ message: "Order placed successfully", order: newOrder });
    } catch (error) {
      console.error("error",error);
      res.status(500).json({ error: error.message });
    }
   
    
  }
);

// Get all orders
router.get("/allOrders", authenticate, async (req, res) => {
  try {
    const orders = await Order.findAll();
    res.json(orders);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});
//test
router.get("/test", (req, res) => {
  res.json({ message: "Orders route is working!" });
});

// Get a single order by ID
// router.get("/:id", authenticate, async (req, res) => {
//   try {
//     const order = await Order.findByPk(req.params.id);
//     if (!order) {
//       return res.status(404).json({ error: "Order not found" });
//     }
//     res.json(order);
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// });

// ✅ Get Orders by Customer ID
router.get("/customer/:customerId", async (req, res) => {
  const { customerId } = req.params;
  console.log(`Fetching orders for customer: ${customerId}`);

  try {
    const orders = await Order.findAll({
      where: { customer_id: customerId },
      include: [
        {
          model: OrderItem,
          as: "orderItems", // ✅ Add the alias to match the association
        },
      ],
    });

    res.json(orders);
  } catch (error) {
    //console.error("Error fetching customer orders:", error);
    res.status(500).json({ error: "Failed to fetch orders" });
  }
});


router.get("/:id", authenticate, async (req, res) => {
  console.log("Fetching order with ID:", req.params.id);
  try {
    const order = await Order.findByPk(req.params.id);
    if (!order) {
      return res.status(404).json({ error: "Order not found" });
    }
    res.json(order);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});



module.exports = router;