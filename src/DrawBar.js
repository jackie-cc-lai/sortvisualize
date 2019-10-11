import React from 'react';
import ReactDOM from 'react-dom';

class DrawBar extends React.Compoonent{
	constructor(props){
		super(props);
		this.state = {
			data = this.props.data,
		}
	}
	createBars(){
	}
	render(){
		return(
			<div className = "BarChart">
			{this.createBars()}
			</div>
		)
	}
}