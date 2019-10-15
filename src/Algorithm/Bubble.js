import React from 'react';
import Swap from './Swap';
import DrawBar from './DrawBar';

class Bubble extends React.Component{
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
		console.log("checking");
		let i, j;
		let done;
		let sortdata = this.state.data;
		do{
			done = false;
			for( i = 0 ; i < sortdata.length - 1 ; i ++ ){
				if(sortdata[i] > sortdata[i+1]){
					Swap(sortdata, i, i+1);
					this.setState({
						data:sortdata,
					});
					done = true;
				}
			}
		}while(done);
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
			let id = "bubble" + `${i}`;
			return <div className="bar" style={style} key={i} id={id}></div>
		});
		return bars;
	}

}

export default Bubble;