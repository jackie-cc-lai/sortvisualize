import React from 'react';
import Swap from './Swap';
import DrawBar from './DrawBar';

function sort(data){
	
}
class Selection extends React.Component{
	constructor(props){
		super(props);
		this.state = {
			data: this.props.data,
		}
	}
	componentDidMount(){
		this.draw();
	}
	componentWillReceiveProps(nextProps) {
		this.setState({ data: nextProps.data,}); 
		this.draw();
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
				Swap(sortdata, i, j);
				this.setState({
					data: sortdata,
				});
			}
		}
	}
	draw(){
		console.log("draw function");
		console.log(this.state.data);
		console.log(this.state.data[0]);
		console.log(this.state.data[1]);
		return (<DrawBar data = {this.state.data}/>);
	}
	render(){
		//{this.doSort()};
		return (
			<>{this.draw()}</>
		);
	}

}

export default Selection;