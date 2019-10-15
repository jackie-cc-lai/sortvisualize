import React from 'react';
import Swap from './Swap';
import DrawBar from './DrawBar';

class Heap extends React.Component{
	constructor(props){
		super(props);
		this.state = {
			data: JSON.parse(JSON.stringify(this.props.data)),
			sortType: this.props.sort,
		}
	}
	componentDidMount(){
		this.draw();
	}
	componentWillReceiveProps(nextProps) {
		this.setState({ data: JSON.parse(JSON.stringify(nextProps.data)), sortType: nextProps.sort}, () =>{
		this.doSort()
		}); 
	}
	doSort(){
	}
	draw(){
		return (<DrawBar data = {this.state.data}/>);
	}
	render(){
		let bars = this.state.data.map(function(info, i){
			let style = {
				width: 7,
				height:info,
			}
			let id = "heap" + `${i}`;
			return <div className="bar" style={style} key={i} id={id}></div>
		});
		return bars;
	}

}

export default Heap;