import React from 'react';
import Tooltip from '@material-ui/core/Tooltip';
import Zoom from '@material-ui/core/Zoom';
import { withStyles } from '@material-ui/core/styles';

const imageOffset = {
  left: 15,
  top: 31
};

export default function CenterMarket(props) {
  // render

  const { left, top, className } = props

  const HtmlTooltip = withStyles((theme) => ({
    tooltip: {
      backgroundColor: '#f5f5f9',
      color: 'rgba(0, 0, 0, 0.87)',
      maxWidth: 220,
      fontSize: theme.typography.pxToRem(12),
      border: '1px solid #dadde9',
      margin: "1px 0",
    },
  }))(Tooltip);

	const style = {
      position: 'absolute',
      transform: `translate(${left - imageOffset.left}px, ${top - imageOffset.top}px)`
    }
		
    return (

      <div style={{ position: 'absolute',
					          transform: `translate(${left}px, ${top}px)`,
                    width: props.width,
                    height: props.height,
					...style}} 
          className={className || ''} >
        <HtmlTooltip title={props.name} TransitionComponent={Zoom}>
        <img src={props.img} width = {props.width} height = {props.height} alt = '' onClick={props.onClick}/>
        </HtmlTooltip>
      </div>
    )
}