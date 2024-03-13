const express = require("express");
const router = express.Router();
require("dotenv").config();
// require("../libs/db");
const Pool = require("pg");
const pool = require("../libs/db");
const { postData } = require("../controllers/getData");
const { registerValidation } = require("../schema/schema");


//postApi to add user in database
exports.postData = async(req, res)=>{
    const {first_name, last_name, email_address} = req.body;
    try {
      const { error } = registerValidation({ first_name, last_name, email_address });
      if (error) {
          const errorMessage = error.details.map((detail) => detail.message).join(', ');
          return res.status(400).json({ message: errorMessage });
      }
      const result = await pool.query(`insert into customers (first_name, last_name, email_address) values ($1, $2, $3)
      RETURNING *`, [first_name, last_name, email_address])
      res.status(200).json({status: "Created_Success", user: {first_name, last_name, email_address}})
    } catch (error) {
        console.error(error)
        console.log("error is adding todo");
        res.status(500).json({success: false})
    }
}


//getAPI to get the users from the database
exports.getData = async (req, res) => {
    try {
        // Fetch data from the customers table
        const result = await pool.query('SELECT * FROM customers');

        // Extract the rows from the result
        const customers = result.rows;

        // Return the fetched data as a JSON response
        res.status(200).json({ success: true, data: customers });
    } catch (error) {
        // Handle any errors that occur during the process
        console.error(error);
        res.status(500).json({ success: false, message: "An error occurred while fetching data from the database." });
    }
};


//delete api to delete one users with user_id from the database
exports.deleteUser = async(req, res)=>{
    try {
        const userId = req.params.user_id;
        if (!userId) {
            return res.status(400).json({ success: false, message: "User ID is required." });
        }
        const result = await pool.query('DELETE FROM customers WHERE user_id = $1', [userId]);
        if (result.rowCount === 0) {
            return res.status(404).json({ success: false, message: "User not found." });
        }
        res.status(200).json({ success: true, message: "User deleted successfully." });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: "An error occurred while deleting the user." });
    }
}

exports.deleteAllUser = async(req, res)=>{
    try {
        const result = await pool.query('DELETE FROM customers');
        // if (result.rowCount === 0) {
        //     return res.status(404).json({ success: false, message: "No users found to delete." });
        // }
        res.status(200).json({ success: true, message: "All users deleted successfully." });
    } catch (error) {
        console.log(error)
        res.status(500).json({ success: false, message: "An error occurred while deleting all users." });
    }
}

exports.updateUser = async (req, res) => {
    try {
        const userId = req.params.user_id;
        if (!userId) {
            return res.status(400).json({ success: false, message: "User ID is required." });
        }

        // Extract fields to update from request body
        const { first_name, last_name, email_address } = req.body;

        let updateQuery = 'UPDATE customers SET ';
        const updateValues = [];
        const updateFields = [];

        if (first_name !== undefined) {
            updateFields.push('first_name = $1');
            updateValues.push(first_name);
        }

        if (last_name !== undefined) {
            updateFields.push('last_name = $2');
            updateValues.push(last_name);
        }

        if (email_address !== undefined) {
            updateFields.push('email_address = $3');
            updateValues.push(email_address);
        }

        if (updateFields.length === 0) {
            return res.status(400).json({ success: false, message: "At least one field to update is required." });
        }

        // Combine the update fields into the query
        updateQuery += updateFields.join(', ') + ' WHERE user_id = $' + (updateValues.length + 1);
        updateValues.push(userId);

        // Execute the update query
        const result = await pool.query(updateQuery, updateValues);

        if (result.rowCount === 0) {
            return res.status(404).json({ success: false, message: "User not found." });
        }

        res.status(200).json({ success: true, message: "User updated successfully." });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: "An error occurred while updating the user." });
    }
}
