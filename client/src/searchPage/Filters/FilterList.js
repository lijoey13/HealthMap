import React from 'react';
import CheckListForm from './CheckListForm.js';
import Divider from '@material-ui/core/Divider';
import Slider from '@material-ui/core/Slider';
import styles from './filterList.module.css';

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
