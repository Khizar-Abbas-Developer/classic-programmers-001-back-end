const express = require("express");
const app = express();
const bodyparser = require("body-parser");
const path = require("path");
const ejs = require("ejs");
const router = require("./routes/routes");
const cors = require("cors");
const { Pool } = require("pg");
require("dotenv").config();
require("./libs/db");
const PORT = 5000;

app.use(bodyparser.urlencoded({extended: false}))
app.use(express.json({ limit: "10mb" }));
app.use(cors());
app.use(router)


app.listen(PORT, ()=>{
    console.log(`Server is running at http://localhost:${PORT}`);
})