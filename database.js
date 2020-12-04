//Contains database credentials for the pooled connection

const mysql = require('mysql');
require('dotenv').config()

module.exports = {
	pool: mysql.createPool({
		connectionLimit: 10,
		host: process.env.DB_HOST,
		user: process.env.DB_USER,
		password: process.env.DB_PASSWORD,
		database: process.env.DB,
		multipleStatements: true
	})

};

