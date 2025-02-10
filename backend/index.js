const express = require("express");
const app = express();
const cors = require("cors");
require("dotenv").config();
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const sequelize = require("./src/database/db.config"); // Use Sequelize instance from db.config
const path = require("path");


const port = process.env.PORT || 5000; // Use PORT from .env
const corsOrigin = process.env.corsOrigin; // Use CORS_ORIGIN from .env
// Middleware setup
app.use(express.json({ limit: "25mb" }));
app.use(express.urlencoded({ limit: "25mb" }));
app.use(cookieParser());

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(
  cors({
    origin: corsOrigin,
    //origin: "*", // Allow all origins for now
    credentials: true,
  })
);

// Import routes
const productRoutes = require("./src/products/products.route");
const orderRoutes = require("./src/orders/orders.route");
const paymentRoutes = require("./src/orders/payment.route");
const skinTest = require("./src/skinDetection/skinTest");
// const sequelize = require('./src/database/db.config.js');
const customerRoutes = require("./src/users/customer/customerRoutes");
const vendorRoutes = require('./src/users/vendor/vendorRoutes.js');
const authRoutes = require("./src/users/authRoutes.js");


app.use('/uploads', express.static(path.join(__dirname, '/uploads')));


// Routes setup
app.use("/api/orders", orderRoutes);
app.use("/api/products", productRoutes); //this is the baseurl for products
app.use("/api/skin", skinTest); // Linking the skinTest API route
app.use("/api/payment", paymentRoutes); // Linking the payment


app.use("/api/auth", authRoutes);
app.use("/api", customerRoutes);
app.use("/api", vendorRoutes); 



// Sync database and start server
async function main() {
  try {
    await sequelize.authenticate(); // Authenticate database connection
    await sequelize.sync(); // Synchronize models with the database
    console.log("Database connected and synced successfully!");
  
    
    app.get("/", (req, res) => {
      res.send("Ethereal Beauty Server is Running..!");
    });

    app.listen(port, () => {
      console.log(`Server is running on port ${port}`);
    });
    // Serve the static files from the Vite "dist" folder
app.use(express.static(path.join(__dirname, '../frontend/dist')));

// For any other route, serve the React app
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../frontend/dist/index.html'));
});

  } catch (err) {
    console.error("Failed to initialize database:", err);
  }
}

// Start the application
main();


//10:03
