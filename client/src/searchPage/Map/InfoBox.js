import React from 'react';


class InfoBox extends React.Component {

	render() {
		return(	
  			<div className = "infoBox" style={{
			left: this.props.left, 
			top: this.props.top, 
			display: this.props.showBox,
			width: 100,
			height: 100,
			background: 'white',
			...(this.props.style || {})
			}}>
			<div class="arrow_box">
			</div>

			{this.props.children}
			</div>
		)
		}
	}

export default InfoBox;
