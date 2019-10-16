import React from 'react';
import Swap from './Swap';
import DrawBar from './DrawBar';

class DrawDiv extends React.Component{
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
		console.log(nextProps);
		this.setState({ data: JSON.parse(JSON.stringify(nextProps.data)), sortType: nextProps.sort}, () =>{
		this.doSort()
		}); 
	}
	doSort(sortName){
		let sortdata = this.state.data;
		switch(this.state.sortType){
			case "merge":
				sortdata = mergeSort(sortdata);
				break;
			case "selection":
				sortdata = selectionSort(sortdata);
				break;
			case "quick":
				sortdata = quickSort(sortdata);
				break;
			case "heap":
				sortdata = heapSort(sortdata);
				break;
			case "insertion":
				sortdata = insertionSort(sortdata);
				break;
			case "bubble":
				sortdata = bubbleSort(sortdata);
				break;
		}
	}
	draw(){
		return (<DrawBar data = {this.state.data}/>);
	}
	render(){
		let bars = this.state.data.map(function(info, i){
			let style = {
				width: 4,
				height:info,
			}
			let id = "select" + `${i}`;
			return <div className="bar" style={style} key={i} id={id}></div>
		});
		return bars;
	}

}

export default DrawDiv;