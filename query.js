/** params
	lat : latitude
	lng : longitude
	filters: object of filters e.g
		insurance: [a, b, c],
		etc.
**/
function constructQuery(lat, lng, filters = false) {
	let joins = "";
	let where = "";

	//find non-empty indices
	for (let i = 0; i < Object.keys(filters).length; i++) {
		let key = Object.keys(filters)[i];

		if (filters[key].length == 0)
			continue;

		where += ` AND Clinic${key}.${key.toLowerCase()} IN (${filters[key].map(j => `'${j}'`).join(',')})`;
		joins += `INNER JOIN Clinic${key} ON ClinicCoords.clinic = Clinic${key}.clinic `;	
	}
	


	let query = `SELECT 
		    *,
		    (3959 * ACOS(COS(RADIANS(${lat})) * COS(RADIANS(latitude)) 
		    * COS(RADIANS(longitude) - RADIANS(${lng})) + SIN(RADIANS(${lat}))
		    * SIN(RADIANS(latitude)))) AS distance
		FROM ClinicCoords ` + joins + ` ` + `
		WHERE MBRContains
		    (
		    LineString
		        (
		        Point (
		             ${lng} + 10 / (111.320 * COS(RADIANS(${lat}))),
		            ${lat} + 10 / 111.133
		        ),
		        Point (
		            ${lng} - 10 / (111.320 * COS(RADIANS(${lat}))),
		            ${lat} - 10 / 111.133
		        )
		    ),
		    coords
		    )
		HAVING distance < 5 `+ where +
		` ORDER By distance;`
		
	return query;
}

module.exports = { constructQuery};
