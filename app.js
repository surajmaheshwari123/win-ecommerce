require("newrelic");
require("dotenv").config();
const express = require("express");
const app = express();
const rateLimit = require("express-rate-limit");
const helmet =  require("helmet");
app.use(helmet());
const cors = require("cors");
const cookieParser = require("cookie-parser");
const  morganMiddleware  = require("./logger/morgan.logger");
const router = express.Router()
const db = require("./db/postgre");
const swaggerDocs = require("./swagger");
const port = process.env.PORT || 4002;
swaggerDocs(app, port); // Initialize Swagger

global.knexSqlDb = db;

app.use(cors());
app.use(morganMiddleware);
app.use(express.json());
app.use(express.urlencoded({ extended: true, limit: "16kb" }));
app.use(cookieParser());
app.use(cors({
    methods: "GET,POST,PUT,DELETE",
    credentials: true
}));

const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // Limit each IP to 100 requests per windowMs
    message: "Too many requests, please try again later."
});



app.get('/health', (req,res) =>  {
    res.send(
        "Server is up and running"
    )
})
app.use('/apis',limiter, require('./routes/category'));
app.use('/apis',limiter, require('./routes/products'));
app.use('/apis',limiter, require('./routes/variants'));


// app.use("/", router);

module.exports = {
    app,
    router
}