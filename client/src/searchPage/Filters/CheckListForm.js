import React from 'react';
import FormLabel from '@material-ui/core/FormLabel';
import FormControl from '@material-ui/core/FormControl';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import FormHelperText from '@material-ui/core/FormHelperText';

//props
//filter name, names, labels
class CheckListForm extends React.Component {
	handleClick() {
		console.log("Clicked");
	}
	render() {
		const options = this.props.options;
		return (

		<FormControl component="fieldset">
			<FormLabel component="legend">{this.props.filterName}</FormLabel>
				<FormGroup>
					{options.map((data, k) => (
						<FormControlLabel index={data.name + k} 
						control={<Checkbox id = {this.props.filterName} value={data.name} 
						onChange = {this.props.onChange} />} 
						label={data.label} 
						onChange = {this.props.onChange} 
						style = {{fontSize: 13}}/>
					))}
						<FormHelperText onClick = {this.props.onClick} style={{cursor: "pointer"}}>See all</FormHelperText>
				</FormGroup>
		</FormControl>
			)
	}
}

export default CheckListForm;