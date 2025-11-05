const express = require('express');
const connectDB = require('./config/db');
const swaggerUi = require("swagger-ui-express");
const cors = require('cors');

const authRoutes = require('./routes/auth.routes');
const userRoutes = require('./routes/user.routes');
const testRoutes = require('./routes/test.routes');
const swaggerSpec = require("../swagger");
const app = express();

connectDB();

app.use(express.json());

app.use(cors({
  origin: process.env.CLIENT_URL, // allow both dev & prod
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'], // must include Authorization if using JWT
  credentials: true, // allow cookies / auth headers
}));

app.use('/api/test', testRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/user', userRoutes);

// Swagger Docs Route
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));


module.exports = app;