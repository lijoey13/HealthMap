import React, { useState, useEffect } from 'react';
import Axios from 'axios';
import { useHistory } from "react-router-dom";

export default function ClinicContainer(props) {
	const [rows, setRows] = useState([]);	

	let history = useHistory();

	useEffect(() => {
		async function fetchData() {
			const result = await Axios.get(`/api/getClinics`).then( function(response) {
				setRows(response.data.rows);
			});
		}
		fetchData();
	}, []);

	////////////////////////////////////////////////////////////////////
	// Temporary: maps to results pages
	///////////////////////////////////////////////////////////////////
	function handleClick(param) {
    history.push(`/result/${param}`);
	}

	return (
		<h1>{rows.map(data => <button type="button" onClick={()=>handleClick(data.clinic)}> {data.clinic} </button>)}</h1>
	);
	/////////////////////////////////////////////////////////////////////////
}


// lists clinics on page 
//<h1>{rows.map(data => <div>{data.clinic}</div>)}</h1>  
