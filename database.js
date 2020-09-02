const mysql = require('mysql');

module.exports = {
	pool: mysql.createPool({
		connectionLimit: 10,
		host: "z8dl7f9kwf2g82re.cbetxkdyhwsb.us-east-1.rds.amazonaws.com",
		user: "mr7q136txktceuc8",
		password: "a80lgsshnn4w3jkj",
		database: "hw9gfhlgbkd96zuj",
		multipleStatements: true
	})

};

