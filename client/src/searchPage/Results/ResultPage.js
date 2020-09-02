import React from 'react';
import SearchInput from '../../Shared/SearchInput.js';
import Map from 'pigeon-maps';
import Marker from 'pigeon-marker';
import SimpleList from './SideLinks.js';
import CheckText from './PaymentCheck.js';
import Logo from '../../Shared/Logo.js';
import styles from './resultPage.module.css';
import { withRouter } from 'react-router-dom';


function tConvert (time) {
  // Check correct time format and split into components
  time = time.toString ().match (/^([01]\d|2[0-3])(:)([0-5]\d)(:[0-5]\d)?$/) || [time];

  if (time.length > 1) { // If time format correct
    time = time.slice (1);  // Remove full string match value
    time[5] = +time[0] < 12 ? 'AM' : 'PM'; // Set AM/PM
    time[0] = +time[0] % 12 || 12; // Adjust hours
  }
	time[3] = " ";
  return time.join (''); // return adjusted time or original string
}

function isOpen(open, close) {
	if (open == close)
		return false;
	let o = open.split(':'); // split it at the colons
	let c = close.split(':');
	// minutes are worth 60 seconds. Hours are worth 60 minutes.
	let o_seconds = (+o[0]) * 60 * 60 + (+o[1]) * 60 + (+o[2]); 
	let c_seconds = (+c[0]) * 60 * 60 + (+c[1]) * 60 + (+c[2]);
	
	let seconds = new Date().getTime() / 1000;
	return seconds >= o_seconds && c_seconds >= seconds;
}


function mapTileProvider (x, y, z, dpr) {
  return `https://api.maptiler.com/maps/streets/256/${z}/${x}/${y}${dpr >= 2 ? '@2x' : ''}.png?key=0qXe9fatH9TgwZzcuFgC`;
}

function convertHours(hours) {
	let hr = [];
	for (let i = 0; i < 7; i++) {
		if (hours[i].hour_open == hours[i].hour_close) {
			hr[i] = "Closed";
			}
		else {
			hr[i] = tConvert(hours[i].hour_open) + " - " + tConvert(hours[i].hour_close);
		}
	} 	
	return hr;
}

function createChecks(data, type) {
	let checks = [];
	for (let i = 0; i < data.length; i++)
		checks.push(<CheckText name="checkIcon" text={data[i][type]}/>);	
	return checks;
}

class ResultPage extends React.Component {
	constructor(props) {
		super(props);
		let loc = props.location.state;
		let d = new Date();
		let n = d.getDay();

		this.state = {
			lat: loc.lat,
			lng: loc.lng,
			name: loc.name,
			language: createChecks(loc.language, "language"),
			insurance: createChecks(loc.insurance, "insurance"),
			treatment: createChecks(loc.treatment, "treatment"),
			address: loc.rows[0].address,
			state: loc.rows[0].state,
			zipcode: loc.rows[0].zipcode,
			city: loc.rows[0].city,
			phone: loc.rows[0].phone,
			hours: convertHours(loc.rows),
			currentOpen: loc.rows[n].hour_open,
			currentClose: loc.rows[n].hour_close,
			isOpen: (isOpen(loc.rows[n].hour_open, loc.rows[n].hour_close)) ? "Open" : "Close"
		}
	}

	render() {
		let d = new Date();
		let n = d.getDay();

		const map = (
			<Map provider={mapTileProvider} center={[this.state.lng, this.state.lat]} zoom={16} dprs={[1, 2]} mouseEvents={false} touchEvents={false} width={250} height = {150}>
				<Marker anchor={[this.state.lng, this.state.lat]} />
			</Map>

		);

		return (
		<div className = {styles.resultContainer}>
			<div className = {styles.header}>
				<Logo name={styles.searchLogo}/>
				<SearchInput />	
			</div>
		
			<div className = {styles.body}>
				<div className = {styles.content}>

				<div className = {styles.bodyHeader}>
					<h1>{this.state.name}</h1>
					<h3 className = {styles.currentHour}>{((this.state.hours[n] != "Closed") ? "Open" : "") + " " + this.state.hours[n]}</h3>
				</div>

				<div className = {styles.about}>
					<h2> About </h2>
					<p> Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla id sapien iaculis, ornare nisi id, malesuada sapien. Curabitur luctus tincidunt augue, sit amet tincidunt nibh ornare a. Mauris bibendum rhoncus dui non sodales. Integer sit amet magna nec arcu egestas fringilla. Nunc sit amet sem eget tortor hendrerit egestas. Phasellus et dignissim turpis. Maecenas ac porta dui, ac semper ante. Phasellus in augue felis. </p>
				</div>

				<div className = {styles.locationHours}>
					<h2> Location and Hours </h2>
					<div className = {styles.map}>
						{map}
						<h5 className = {styles.address}>{this.state.address}<br />  {this.state.city + ", " + this.state.state + " " + this.state.zipcode} </h5>	
					</div>

					<div className = {styles.hours}>
						<b className={styles.day1}>Mon</b><div className="hour1">{this.state.hours[0]}</div>
						<b className={styles.day2}>Tue</b><div className="hour2">{this.state.hours[1]}</div>
						<b className={styles.day3}>Wed</b><div className="hour3">{this.state.hours[2]}</div>
						<b className={styles.day4}>Thu</b><div className="hour4">{this.state.hours[3]}</div>
						<b className={styles.day5}>Fri</b><div className="hour5">{this.state.hours[4]}</div>
						<b className={styles.day6}>Sat</b><div className="hour6">{this.state.hours[5]}</div>
						<b className={styles.day7}>Sun</b><div className="hour7">{this.state.hours[6]}</div>
					</div>
				
				</div>

					<div className = {styles.ameneties}>
						<div className = {styles.language}>
						<h4>Language</h4>
						{this.state.language}<br />
						</div>
						<div className = {styles.insurance}>
						<h4>Insurance</h4>
						{this.state.insurance}<br />
						</div>
						<div className = {styles.treatment}>
						<h4>Treatments</h4>
						{this.state.treatment}<br />
						</div>
					</div>
				</div>

				<SimpleList directions = {"https://google.com"} phone = {this.state.phone} />
			</div>
		</div>
		)
	}
}	

export default withRouter(ResultPage);

