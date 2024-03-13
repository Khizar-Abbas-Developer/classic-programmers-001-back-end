const Pool = require("pg").Pool;



const pool = new Pool({
    user: process.env.USER_NAME,
    host: process.env.HOST_NAME,
    database: process.env.DB_NAME,
    password: process.env.DB_PASSWORD,
    dialect: process.env.DB_DIALECT,
    port: process.env.PORT_NUMBER
});

pool.connect((err)=>{
    if(err){
        return console.error("Error in connection");
    }
    else{
        console.log("Connected to postgreSQL database");
    }
})

module.exports = pool;