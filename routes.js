const express = require('express');
const router = express.Router();
const config = require('./config.json');
const axios = require('axios');
const { pool } = require('./database.js');
const { constructQuery } = require('./query.js');

router.use(express.json());

router.post('/searchClinics', function (req, res) {
	console.log(req.body);	
	let geoapi = `https://api.maptiler.com/geocoding/${req.body.address}.json?key=${config.api_key}`

	//when I don't have the lat/lng
	axios.get(geoapi).then(function (response, body) {
		if (response.status== 200) {
			let features = response.data.features[0];
			let geocoord = features.center;		//holding tuple of geocoords
			let address = features.text + ", " + features.context[0].text;	//building "nearby" text
			//TODO
			//Offensive coding: Make sure we get a "valid response"
			//Check for inputs, no street address etc., display the numbers correctly by searching for
			//numbers in the query.
			let query = constructQuery(geocoord[0], geocoord[1], req.body.filter);
			console.log(query);
			pool.query(query, function(err, rows) {
				if (err)
					throw err;
				
				let re = {
					rows : rows,
					geocoord : geocoord
				}
				console.log(re);
				res.send(re);				
			});	
		}
	});
});

router.post('/getClinicData', function(req, res) {
	console.log(req.body);
	let query1 = `SELECT address, state, city, zipcode, phone, day_of_week, hour_open, hour_close `+ 
	`FROM ClinicAddress INNER JOIN ClinicHours ON ClinicHours.clinic = ClinicAddress.clinic `+
	`WHERE ` + 
	`ClinicHours.clinic = '${req.body.clinic}';`
	
	let query2 = `SELECT treatment from ClinicTreatment WHERE clinic = '${req.body.clinic}';`;

	let query3 = `SELECT language from ClinicLanguage WHERE clinic= '${req.body.clinic}';`;

	let query4 = `SELECT insurance from ClinicInsurance WHERE clinic = '${req.body.clinic}';`;
	pool.query( query1 +  query2 + query3 + query4, function(err, rows) {
		if (err)
			throw err;

		console.log(rows);	
		let re = {
			rows: rows[0],
			treatment: rows[1],
			language: rows[2],
			insurance: rows[3]
		};
		res.send(re);
	})
});	


module.exports = router;
