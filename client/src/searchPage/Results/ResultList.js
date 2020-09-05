import React from 'react';
import Result from './Result.js';
import './ResultList.css'


class ResultList extends React.Component {


    render() {
		const rows = this.props.rows;
		let content;
		if (rows.length == 0) {
			content = <div className="error"><h2>Oops, we couldn't find any clinics nearby. FOH</h2></div>
		}

		else {
			content = <ul className="resultList">
			{rows.map((data, k) => (
					<li key={k}>
						<Result index={k} key={"r" + k.toString()} name={data.clinic} 
						distance={data.distance} enableVisibility={this.props.enableVisibility} 
						disableVisibility={this.props.disableVisibility} 
						lng = {data.longitude} lat = {data.latitude} />
			</li>))}
			</ul>
		}
        return (
            <div className = "resultListDiv">
                <h2 id ="nearby">Clinics nearby {this.props.address}</h2>
                {content}
			</div>
		);
    };
}

export default ResultList;
