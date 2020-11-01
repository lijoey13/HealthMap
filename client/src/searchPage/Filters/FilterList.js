import React from 'react';
import CheckListForm from './CheckListForm.js';
import Divider from '@material-ui/core/Divider';
import Slider from '@material-ui/core/Slider';
import styles from './filterList.module.css';
import Typography from '@material-ui/core/Typography';

function valuetext(value) {
  return `${value}°C`;
}

class FilterList extends React.Component {
	valuetext(value) {
	  return `${value}°C`;
	}

	render() {	
		const diseases = [
			{ label: "Primary Care", name: "primaryCare" },
			{ label: "Mental Health", name: "mentalHealth"},
			{ label: "Immunizations", name: "immunizations"}
		];

		const insurance = [
			{ label: "Medicare", name: "medicare" },
			{ label: "Medi-Cal", name: "medi-cal"},
			{ label: "My Health LA", name: "mlha"}
		];

		const languages = [
			{ label: "English", name: "english" },
			{ label: "Cantonese", name: "cantonese" },
			{ label: "Mandarin", name: "mandarin" },
		];
		
		

		return (
				<div className= {styles.filters}>
					<h3 id={styles.filterTitle}> Filters </h3>

					<div className={styles.distance}>
					 <Typography id="discrete-slider" gutterBottom>
				        Distance
				      </Typography>
				      <Slider
				        defaultValue={this.props.distance}
				        getAriaValueText={valuetext}
				        aria-labelledby="discrete-slider"
				        valueLabelDisplay="auto"
				        step={5}
				        marks
				        min={5}
				        max={25}
				        onChangeCommitted = {this.props.onDistanceChange}
				      />
					</div>
					<div className={styles.filterMenus}>
						<CheckListForm filterName="Services" options={diseases} onChange = {this.props.onChange} 
						onClick = {this.props.openModal("Services")}/>
					</div>
					
					<Divider />
					<div className={styles.filterMenus}>
						<CheckListForm filterName="Insurance & Payment" options={insurance} onChange = {this.props.onChange} 
						onClick = {this.props.openModal("Insurance & Payment")} />
					</div>
					<Divider />
					<div className={styles.filterMenus}>
						<CheckListForm filterName="Language" options={languages} onChange = {this.props.onChange} 
						onClick = {this.props.openModal("Language")} />
					</div>
				</div>
			);
	}
}

export default FilterList;
