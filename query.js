/** params
	lat : latitude
	lng : longitude
	filters: object of filters e.g
		insurance: [a, b, c],
		etc.
**/
function constructQuery(lng, lat, filters = false, d) {
	let joins = "";
	let where = "WHERE";
	//find non-empty indices
	for (let i = 0; i < Object.keys(filters).length; i++) {
		let key = Object.keys(filters)[i];

		if (filters[key].length == 0)
			continue;

		where += ` Clinic${key}.${key.toLowerCase()} IN (${filters[key].map(j => `'${j}'`).join(',')}) AND`;
		joins += `INNER JOIN Clinic${key} ON ClinicCoords.clinic = Clinic${key}.clinic `;	
	}
	
	if (where == "WHERE")
		where = "";

	where = where.substring(0, where.length - 3);

	let query = `SELECT DISTINCT
    ClinicCoords.clinic, longitude, latitude,
    ST_Distance_Sphere(
        point(${lat}, ${lng}),
        point(latitude, longitude)
    ) * .000621371192 AS distance
FROM ClinicCoords ` + joins + ` ` + where + `
HAVING distance < ${d} ORDER BY distance;`

		
	return query;
}

module.exports = { constructQuery};
