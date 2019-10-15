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
	doSort(){
		let i, j,k = 0;
		let sortdata = this.state.data;
		for( i = 0 ; i < sortdata.length -1 ; i ++ ){
			let arrMin = i;
			for(j = i+1 ; j < sortdata.length ; j ++ ){
				if(sortdata[j] < sortdata[arrMin]){
					arrMin = j;
				}
			}
			if(arrMin != i){
				Swap(sortdata, i, arrMin);
				this.setState({
					data: sortdata,
				});
				k++
				
			}
		}

	}
	draw(){
		return (<DrawBar data = {this.state.data}/>);
	}
	render(){
		return (
			<>{this.draw()}</>
		);
	}

}

export default DrawDiv;