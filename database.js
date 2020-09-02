const mysql = require('mysql');

module.exports = {
	pool: mysql.createPool({
		connectionLimit: 10,
		host: "sh4ob67ph9l80v61.cbetxkdyhwsb.us-east-1.rds.amazonaws.com",
		user: "sntzr8hroxqyfr0j",
		password: "u77rq4qkpa361vcy",
		database: "smktyb6nnz6aeuho",
		multipleStatements: true
	})

};

