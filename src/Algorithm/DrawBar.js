import React from 'react';

class DrawBar extends React.Component{
	constructor(props){
		super(props);
		this.state = {
			data: this.props.data,
		}
	}
	componentWillReceiveProps(nextProps) {
		this.setState({ data: nextProps.data,}); 
	}
	render(){
		let bars = this.state.data.map(function(info, i){
			let style = {
				width: 7,
				height:info,
			}
			return <div className="bar" style={style} key={i}></div>
		});
		return bars;
	}
}

export default DrawBar;