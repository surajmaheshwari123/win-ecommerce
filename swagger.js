const swaggerJsDoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");

const options = {
  definition: {
    openapi: "3.0.0",  // OpenAPI Specification version
    info: {
      title: "My Node.js API",
      version: "1.0.0",
      description: "API documentation using Swagger",
    },
    servers: [
        {
            url: "http://13.61.152.150:4002/api-docs",
            description: "Live Server",
          },
    ],
  },
  apis: ["./routes/*.js"],  // Path to API route files
};

const swaggerSpec = swaggerJsDoc(options);

const swaggerDocs = (app, port) => {
  app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
  console.log(`Swagger UI available at http://13.61.152.150:${port}/api-docs`);
};

module.exports = swaggerDocs;
