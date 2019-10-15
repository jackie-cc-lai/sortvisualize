import React from 'react';
import Swap from './Swap';
import DrawBar from './DrawBar';

class Selection extends React.Component{
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
		setTimeout(function(){this.doSort()}.bind(this),2000);
		}); 
	}
	doSort(){
		let i, j;
		let sortdata = this.state.data;
		for( i = 0 ; i < sortdata.length -1 ; i ++ ){
			let arrMin = i;
			for(j = i+1 ; j < sortdata.length ; j ++ ){
				if(sortdata[j] < sortdata[arrMin]){
					arrMin = j;
				}
			}
			if(arrMin != i){
				Swap(sortdata, i, arrMin)
				this.setState({
					data: sortdata,
				});					
			}
		}

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
			let id = "select" + `${i}`;
			return <div className="bar" style={style} key={i} id={id}></div>
		});
		return bars;
	}

}

export default Selection;