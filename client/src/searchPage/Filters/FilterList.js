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
			{ label: "Coronavirus", name: "coronavirus" },
			{ label: "SARS", name: "sars"},
			{ label: "Ebola", name: "ebola"}
		];

		const insurance = [
			{ label: "MediCare", name: "medicare" },
			{ label: "MediCal", name: "medical"},
			{ label: "Medicaid", name: "medicaid"}
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
						<CheckListForm filterName="Treatment" options={diseases} onChange = {this.props.onChange} 
						onClick = {this.props.openModal("Treatment")}/>
					</div>
					
					<Divider />
					<div className={styles.filterMenus}>
						<CheckListForm filterName="Insurance" options={insurance} onChange = {this.props.onChange} 
						onClick = {this.props.openModal("Insurance")} />
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
