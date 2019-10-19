import React from 'react';

class Merge extends React.Component{
	constructor(props){
		super(props);
		this.state = {
			data: JSON.parse(JSON.stringify(this.props.data)),
			sortType: this.props.sort,
		}
	}
	componentDidMount(){
	}
	UNSAFE_componentWillReceiveProps(nextProps) {
		this.setState({ data: JSON.parse(JSON.stringify(nextProps.data)), sortType: nextProps.sort}, () =>{
			let sortdata = this.state.data;
			sortdata = this.doSort(sortdata);
			this.setState({
				data: sortdata,
			});
		}); 
	}
	doSort(array){
		if(array.length === 1){
			return array;
		}
		const middle = Math.floor(array.length / 2 );
		const left = array.slice(0, middle);
		const right = array.slice(middle);
		return this.merge(this.doSort(left), this.doSort(right));
	}
	merge(arrLeft, arrRight){
		let resultArray = [], leftIndex = 0, rightIndex = 0;
		while(leftIndex < arrLeft.length && rightIndex < arrRight.length){
			if(arrLeft[leftIndex] < arrRight[rightIndex]){
				resultArray.push(arrLeft[leftIndex]);
				leftIndex++;
			}else{
				resultArray.push(arrRight[rightIndex]);
				rightIndex++;
			}
		}
		return resultArray.concat(arrLeft.slice(leftIndex)).concat(arrRight.slice(rightIndex));
	}
	render(){
		let bars = this.state.data.map(function(info, i){
			let style = {
				height:info,
			}
			return <div className="bar" style={style} key={i}></div>
		});
		return bars;
	}

}

export default Merge;