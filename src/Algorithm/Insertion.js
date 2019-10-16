import React from 'react';
import Swap from './Swap';
import DrawBar from './DrawBar';

class Insertion extends React.Component{
	constructor(props){
		super(props);
		this.state = {
			data: JSON.parse(JSON.stringify(this.props.data)),
			sortType: this.props.sort,
		}
		this.handleClick = this.handleClick.bind(this);
	}
	handleClick = () => {
		this.doSort();
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
		let i, j;
		let sortdata = this.state.data;
		for ( i = 0 ; i < sortdata.length ; i ++ ){
			let temp = sortdata[i];
			j = i;
			while ( j > 0 && temp < sortdata[j - 1]){
				sortdata[j] = sortdata[j-1];
				j--;
				this.setState({
					data:sortdata,
				});
				
			}
			sortdata[j] = temp;
			this.setState({
				data:sortdata,
			});
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
			let id = "insert" + `${i}`;
			return <div className="bar" style={style} key={i} id={id}></div>
		});
		return bars;
	}

}

export default Insertion;