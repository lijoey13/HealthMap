import React from 'react';
import { useHistory } from 'react-router-dom';
import { createStyles } from '@material-ui/core/styles';
export default function Logo (props) {
	let history = useHistory();

	const redirectHome = (e) => {
    	history.push('/');
  	}


	return (
		<h1 id={props.name} onClick={redirectHome}>
		ClinicLocator
		</h1>
	)
}