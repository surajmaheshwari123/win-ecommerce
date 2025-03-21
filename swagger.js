const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');
const { authorizeCookieForSwagger } = require("../helpers/constantdata/authhelper");
const express = require('express');
const { integrationServiceUrl } = require('../helpers/constantdata/config');

const openAPISpecification = swaggerJsdoc({
  definition: {
    openapi: "3.1.0",
    servers: [
      {
        url: "http://localhost:8010",
        description: "Local Server",
      },
      {
        url: "https://api.leverageedu.com/services/integrations",
        description: "Live Server",
      },
    ],
    info: {
      title: "Integration Service API Docs",
      description: "API Endpoint specifications for integrations-service",
      version: "1.0.0",
    },
  },
  apis: [
    "./api/models/swagger/**/*.yaml",
    "./api/swagger/global/**/*.yaml",
    "./api/routes/*.js",
  ],
});

module.exports = (app) => {
  app.use("/swagger/assets", express.static("api/swagger/assets"));

  app.use(
    "/api-docs",
    authorizeCookieForSwagger,
    swaggerUi.serve,
    swaggerUi.setup(openAPISpecification, {
      explorer: true,
    //   customCssUrl: integrationServiceUrl + "swagger/assets/logo-change-hack.css",
      customSiteTitle: "Api Docs",
    }),
  );
};