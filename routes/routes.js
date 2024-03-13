const express = require("express");
const router = express.Router();
require("dotenv").config();
// require("../libs/db");
const pool = require("../libs/db");
const Pool = require("pg");
const { postData, getData, deleteUser, deleteAllUser, updateUser } = require("../controllers/getData");


// //routes
router.post("/postData", postData);
router.get("/getData", getData);
router.delete('/users/:user_id', deleteUser);
router.delete('/deleteAll', deleteAllUser);
router.put('/users/:user_id', updateUser);



module.exports = router;
