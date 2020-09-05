import React, { useState, useEffect } from 'react';
import styles from './App.module.css';
import MapBox  from './Map/Map.js';
import ResultList from './Results/ResultList.js';
import SearchInput from '../Shared/SearchInput.js';
import FilterList from './Filters/FilterList.js';
import FilterModal from './Filters/FilterModal.js';
import Logo from '../Shared/Logo.js';
import { withRouter } from 'react-router-dom';
import Axios from 'axios';
import qs from 'qs';
import './styles.css';

export default function App (props) {
	const [rows, setRows] = useState([]);
	const [geocoord, setGeocoord] = useState([0, 0]);
	const [address, setAddress] = useState("");
	const [filters, setFilters] = useState({Treatment: [], Insurance: [], Language: []});
	const [isDialogOpen, setDialogOpen] = useState(false);
	const [currentFilter, setCurrentFilter] = useState("");
	const [visibleBox, setVisibleBox] = useState(-1);

	
	useEffect(() => {
		async function fetchData() {
			const result = await Axios.get(`../api/searchClinics/${props.match.params.address}`).then( function(response) {
				setRows(response.data.rows);
				setGeocoord([...response.data.geocoord]);
			});
		}
		setAddress(props.match.params.address);
		fetchData();
	}, []);

	const onOpenModal = (filterType) => () => {
		setDialogOpen(true);
		setCurrentFilter(filterType);
	}

	const onClose = (e) => {
		setDialogOpen(false);
	}

	const visibleInfoBox = (k) => {
		setVisibleBox(k);
	}
		
	const deactivateInfoBox = (k) => {
		setVisibleBox(-1);
	}


	const handleSubmit = (data) => {
		Axios.get(`../api/searchClinics/${data.address}`).then( function(response) {
			setRows(response.data.rows);
			setGeocoord([...response.data.geocoord]);
			setAddress(data.address);
		});
	}


	const filterClinic = (event) => {
		let cloneFilters = {...filters};
		const category = event.target.id;
		let filter = cloneFilters[category];

		if (event.target.checked) {
			filter.push(event.target.value);	
		}

		else {
			let i = filter.indexOf(event.target.value);
			filter.splice(i, 1)
		}

		let filterData = {
			filter: cloneFilters,
			geocoord: geocoord,
		}

		
  		Axios.post('/api/filterClinics', filterData).then( function(response) {
			setRows(response.data.rows);
			setFilters(cloneFilters);
		});

	}

	const singularFilter = (filterName, filter) => {
		let cloneFilters = {...filters};
		cloneFilters[filterName] = filter;

		let filterData = {
			filter: cloneFilters,
			geocoord: geocoord,
		}

		  Axios.post('/api/filterClinics', filterData).then( function(response) {
		  	/*
			that.setState({ rows: response.data.rows,
							filters: filterObj,
							isDialogOpen: false,
							});
			*/
			setFilters(cloneFilters);
			setDialogOpen(false);
			setRows(response.data.rows);
		});
	}


	

        return (
            <div className = {styles.container}>
                <div className = {styles.header}>
                	<Logo name={styles.searchLogo} />
                    <SearchInput handleSubmit = {handleSubmit}/>
                </div>

                <div className = {styles.body}>
					
					{/*** modal for filters ***/}
					<FilterModal 
						name={currentFilter} 
						isOpen = {isDialogOpen} 
						onClose = {onClose} 
						onSubmit = {singularFilter}
					/>

                	<FilterList 
	                	onChange = {filterClinic} 
	                	openModal = {onOpenModal} 
	                	isOpen = {isDialogOpen} 
                	/>

                    <ResultList 
	                    rows={rows} 
	                    enableVisibility={visibleInfoBox} 
	                    disableVisibility={deactivateInfoBox} 
	                    address={address} 
                    />

                    <MapBox 
	                    rows={rows} 
	                    center = {geocoord} 
	                    cn = {styles.mapBox}
                    /> 
                </div>

            </div>
        );
}




