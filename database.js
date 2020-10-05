const mysql = require('mysql');

module.exports = {
	pool: mysql.createPool({
		connectionLimit: 10,
		host: "localhost",
		user: "admin",
		password: "password",
		database: "clinics",
		multipleStatements: true
	})

};

