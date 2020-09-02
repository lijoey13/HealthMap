import React from 'react';
import styles from './App.module.css';
import  MapBox  from './Map/Map.js';
import ResultList from './Results/ResultList.js';
import SearchInput from '../Shared/SearchInput.js';
import FilterList from './Filters/FilterList.js';
import FilterModal from './Filters/FilterModal.js';
import Logo from '../Shared/Logo.js';
import { withRouter } from 'react-router-dom';
import Axios from 'axios';
import './styles.css';

class App extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			rows: this.props.location.state.rows,
			geocoord: this.props.location.state.geocoord,
			address: this.props.location.state.address,
			visibleBox: -1,							//default val
			filters: {
					Treatment: [],
					Insurance: [],
					Language: []
			},
			isDialogOpen: false,
			currentFilter: "",
		}
		this.visibleInfoBox = this.visibleInfoBox.bind(this);
		this.deactivateInfoBox = this.deactivateInfoBox.bind(this);
		this.onOpenModal = this.onOpenModal.bind(this);
		this.onClose = this.onClose.bind(this);
	}

	onOpenModal = (filterType) => () => {
		this.setState({ isDialogOpen: true,
						currentFilter: filterType });
	}

	onClose = (e) => {
		this.setState({ isDialogOpen: false });
	}

	visibleInfoBox = (k) => {
		this.setState({ visibleBox: k }); 
	}
		
	deactivateInfoBox = (k) => {
		this.setState({ visibleBox:-1 });
	}


	handleSubmit = (data) => {
		let self = this;
		Axios.post('/api/searchClinics', data).then( function(response) {
			console.log(data.address);
			self.setState({	rows: response.data.rows,
							geocoord: response.data.geocoord,
							address: data.address });
		});
	}


	filterClinic = (event) => {	
		const obj = this.state;
		const category = event.target.id;
		let filterObj = Object.assign({}, obj.filters);
		let filter = filterObj[category];
		if (event.target.checked) {
			filter.push(event.target.value);	
		}

		else {
			let i = filter.indexOf(event.target.value);
			filter.splice(i, 1)
		}

		filterObj[category] = filter;

		let filterData = {
			address: this.props.location.state.address,
			filter: obj.filters,
		}

		let that = this;
  		Axios.post('/api/searchClinics', filterData).then( function(response) {
			that.setState({ rows: response.data.rows,
							filters: obj.filters});
		});
	}

	singularFilter = (filterName, filter) => {
		let filterObj = Object.assign({}, this.state.filters);
		filterObj[filterName] = filter;
		let filterData = {
			address: this.props.location.state.address,
			filter: filterObj,
		}

		let that = this;
		  Axios.post('/api/searchClinics', filterData).then( function(response) {
			that.setState({ rows: response.data.rows,
							filters: filterObj,
							isDialogOpen: false,
							});
		});
	}


	

    render () {
        return (
            <div className = {styles.container}>
                <div className = {styles.header}>
                	<Logo name={styles.searchLogo} />
                    <SearchInput handleSubmit = {this.handleSubmit}/>
                </div>

                <div className = {styles.body}>
					
					{/*** modal for filters ***/}
					<FilterModal 
						name={this.state.currentFilter} 
						isOpen = {this.state.isDialogOpen} 
						onClose = {this.onClose} 
						onSubmit = {this.singularFilter}
					/>

                	<FilterList 
	                	onChange = {this.filterClinic} 
	                	openModal = {this.onOpenModal} 
	                	isOpen = {this.state.isDialogOpen} 
                	/>

                    <ResultList 
	                    rows={this.state.rows} 
	                    enableVisibility={this.visibleInfoBox} 
	                    disableVisibility={this.deactivateInfoBox} 
	                    address={this.state.address} 
	                    openModal = {this.onOpenClinicModal} 
                    />

                    <MapBox 
	                    rows={this.state.rows} 
	                    center = {this.state.geocoord} 
	                    openModal = {this.onOpenClinicModal} 
	                    cn = {styles.mapBox}
                    /> 
                </div>

            </div>
        );
    }
}

export default withRouter(App);



