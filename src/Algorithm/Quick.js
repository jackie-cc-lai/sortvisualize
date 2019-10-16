import React from 'react';
import Swap from './Swap';

class Quick extends React.Component{
	constructor(props){
		super(props);
		this.state = {
			data: JSON.parse(JSON.stringify(this.props.data)),
			sortType: this.props.sort,
		}
	}
	componentDidMount(){
	}
	componentWillReceiveProps(nextProps) {
		this.setState({ data: JSON.parse(JSON.stringify(nextProps.data)), sortType: nextProps.sort}, () =>{
		this.doSort()
		}); 
	}
	doSort(){
		
	}
	render(){
		let bars = this.state.data.map(function(info, i){
			let style = {
				width: 4,
				height:info,
			}
		return <div className="bar" style={style} key={i}></div>
		});
		return bars;
	}

}

export default Quick;