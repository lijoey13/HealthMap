import React from 'react';
import SearchInput from '../Shared/SearchInput.js';
import Axios from 'axios';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import { useHistory } from 'react-router-dom';
import Logo from '../Shared/Logo.js';
import styles from './homeSearch.module.css';
export default function HomeSearch() {

	const useStyles = makeStyles({
		root: {
			fontFamily: "Helvetica",
			paddingRight: 0,
		}
	})


	let history = useHistory();
	const handleSubmit = (data) => {
		Axios.post('/api/searchClinics', data).then( function(response) {
			history.push({pathname: '/search',
						  state: {rows: response.data.rows,
							  	  geocoord: response.data.geocoord,
							      address: data.address}});
		});
	}

	const classes = useStyles();
	return(
		<div className={styles.container}>
			<div className={styles.center}>
			<Logo name={styles.homeLogo} />
			<SearchInput 
			handleSubmit = {handleSubmit} />
			</div>
		</div>
	);
}

