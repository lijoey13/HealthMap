//Contains database credentials for the pooled connection

const mysql = require('mysql');

module.exports = {
	pool: mysql.createPool({
		connectionLimit: 10,
		host: "localhost",
		user: "root",
		password: "password",
		database: "clinics",
		multipleStatements: true
	})

};

