import React from 'react';
import Result from './Result.js';
import './ResultList.css'


class ResultList extends React.Component {


    render() {
		const rows = this.props.rows;

        return (
            <div className = "resultListDiv">
                <h2 id ="nearby">Clinics nearby {this.props.address}</h2>
				<ul className = "resultList">
				{rows.map((data, k) => (
					<li key={k}>
						<Result index={k} key={"r" + k.toString()} name={data.clinic} 
						distance={data.distance} enableVisibility={this.props.enableVisibility} 
						disableVisibility={this.props.disableVisibility} 
						lng = {data.longitude} lat = {data.latitude} />
					</li>))}
				</ul>
			</div>
		);
    };
}

export default ResultList;
