const swaggerJSDoc = require("swagger-jsdoc");

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Tech-blog Api",
      version: "1.0.0",
      description: "API documentation for Tech blog app",
    },
    servers: [
      {
        url: "https://tech-blog-api-hsgm.onrender.com", // ✅ Replace with your Render URL
        description: "Staging server",
      },
      {
        url: "http://localhost:4000", // ✅ For local testing
        description: "Local server",
      },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT",
        },
      },
    },
    security: [
      {
        bearerAuth: [],
      },
    ],
  },
  apis: ["./src/routes/*.js"], // 👈 path to your route files where Swagger comments will live
};

const swaggerSpec = swaggerJSDoc(options);
module.exports = swaggerSpec;
