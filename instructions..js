// -- to select a database
// postgres=# \c sales;
// -- You are now connected to database "sales" as user "postgres".

// -- to create a table inside a database after selecting it
// -- sales=# CREATE TABLE customers(
// -- sales(# customer_id SERIAL PRIMARY KEY,
// -- sales(# first_name VARCHAR(255) NOT NULL,
// -- sales(# last_name VARCHAR(255) NOT NULL,
// -- sales(# email_address VARCHAR(255) NOT NULL,
// -- sales(# phone_number INTEGER NOT NULL,
// -- sales(# number_of_complaints INTEGER NOT NULL);
// -- CREATE TABLE

// -- to list all the tables inside a database
// -- sales=# \dt
// --                     List of relations
// --  Schema |           Name            |   Type   |  Owner
// -- --------+---------------------------+----------+----------
// --  public | customers                 | table    | postgres
// --  public | customers_customer_id_seq | sequence | postgres
// -- (2 rows)

// -- to insert a data inside a table inside a database but first make sure the db is selected
// -- sales=# INSERT INTO customers (first_name, last_name, email_address, phone_number, number_of_complaints)
// -- sales-# VALUES ('Khizar', 'Abbas', 'khizarnot7@gmail.com', 0302, 2);
// INSERT 0 1

// -- to see all the data inside a db inside a table but make sure the db is selected 
// sales=# SELECT * FROM customers;
//  customer_id | first_name | last_name |    email_address     | phone_number | number_of_complaints
// -------------+------------+-----------+----------------------+--------------+----------------------
//            1 | Khizar     | Abbas     | khizarnot7@gmail.com |          302 |                    2
//            2 | Fazal      | Abbas     | khizarnot7@gmail.com |          302 |                    2
//            3 | Hassaan    | Bashir    | khizarnot7@gmail.com |          302 |                    2
//            4 | Umer       | Kala      | khizarnot7@gmail.com |          302 |                    2
// (4 rows)

// INSERT INTO customers (first_name, last_name, email_address, phone_number, number_of_complaints)
// VALUES ('Khizar', 'Abbas', 'khizarnot7@gmail.com', 0302, 2);


// INSERT INTO customers (first_name, last_name, email_address)
// VALUES ('Khizar', 'Abbas', 'khizarnot7@gmail.com');

// CREATE TABLE customers(
//     customer_id SERIAL PRIMARY KEY,
//     first_name VARCHAR(255) NOT NULL,
//     last_name VARCHAR(255) NOT NULL,
//     email_address VARCHAR(255) NOT NULL,
// );