import React from 'react';
import CheckIcon from '@material-ui/icons/Check';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
//generic component for icon then text!
export default function CheckText (props) {
	const useStyles = makeStyles((theme: Theme) =>
	createStyles({
	    root: {
	        float: 'left'
	    }
	}),
);

	const classes = useStyles();
	return (
	    <div className={props.name}>
		<CheckIcon className={classes.root}/>
		    <p className={props.textName}>{props.text}</p>
	    </div>
	);
}
