const express = require("express");
const { body, validationResult } = require("express-validator");
const OrderItem = require("../orders/orderItems.model");
const Order = require("../orders/orders.model");
const Product = require("../products/products.model");
const Vendor = require("../users/vendor/vendor.model");

const router = express.Router();

// ✅ Create Order Items (Bulk Insert)
router.post(
  "/",
  [
    body("order_id").isInt().withMessage("Order ID must be an integer"),
    body("orderedProducts")
      .isArray({ min: 1 })
      .withMessage("At least one product is required"),
    body("orderedProducts.*.product_id")
      .isInt()
      .withMessage("Product ID must be an integer"),
    body("orderedProducts.*.vendor_id")
      .isInt()
      .withMessage("Vendor ID must be an integer"),
    body("orderedProducts.*.quantity")
      .isInt({ min: 1 })
      .withMessage("Quantity must be at least 1"),
    body("orderedProducts.*.subtotal")
      .isFloat({ min: 0.01 })
      .withMessage("Subtotal must be valid"),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const { order_id, orderedProducts } = req.body;

      // ✅ Ensure order exists
      const orderExists = await Order.findByPk(order_id);
      if (!orderExists) {
        return res.status(404).json({ error: "Order not found" });
      }

      // ✅ Bulk insert order items
      await OrderItem.bulkCreate(orderedProducts.map(product => ({
        order_id,
        product_id: product.product_id,
        vendor_id: product.vendor_id,
        quantity: product.quantity,
        subtotal: product.subtotal,
      })));

      res.status(201).json({ message: "Order items added successfully!" });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
);

// ✅ Get All Order Items (with Product & Vendor Details)
router.get("/", async (req, res) => {
  try {
    const orderItems = await OrderItem.findAll({
      include: [
        { model: Product, attributes: ["name", "price"] },
        { model: Vendor, attributes: ["vendor_name"] },
      ],
    });
    res.json(orderItems);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// ✅ Get Order Items for a Specific Order
router.get("/:order_id", async (req, res) => {
  try {
    const orderItems = await OrderItem.findAll({
      where: { order_id: req.params.order_id },
      include: [
        { model: Product, attributes: ["name", "price"] },
        { model: Vendor, attributes: ["vendor_name"] },
      ],
    });

    if (orderItems.length === 0) {
      return res.status(404).json({ error: "No items found for this order" });
    }

    res.json(orderItems);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// ✅ Delete Order Item (Optional)
router.delete("/:id", async (req, res) => {
  try {
    const deleted = await OrderItem.destroy({ where: { order_item_id: req.params.id } });
    if (!deleted) {
      return res.status(404).json({ error: "Order item not found" });
    }
    res.json({ message: "Order item deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;