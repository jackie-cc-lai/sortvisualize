import React from 'react';
import Swap from './Swap';
import {getSelectAnimations} from './Selection';
import {getBubbleAnimations} from './Bubble';
import {getInsertAnimations} from './Insertion';
//import {getMergeAnimations} from './Merge';

const ANIMATION_SPEED_MS = 20;
const defaultColor = '#888';
class DrawDiv extends React.Component{
	constructor(props){
		super(props);
		this.state = {
			data: JSON.parse(JSON.stringify(this.props.data)),
			sortType: this.props.sort,
			start: this.props.start,
		}
	}
	componentDidMount(){
	}
	componentWillReceiveProps(nextProps) {
		this.setState({ data: JSON.parse(JSON.stringify(nextProps.data)), sortType: nextProps.sort, start: nextProps.start}, () =>{
		if(this.state.start === true){
			this.doSort(this.state.sortType);
		}
		}); 
	}
	doSort(sortName){
		let sortdata;
		switch(this.state.sortType){
			case "Merge":
				this.drawMerge();
				break;
			case "Selection":
				this.drawSelection();
				break;
			case "Quick":
				this.drawQuick();
				break;
			case "Heap":
				this.drawHeap();
				break;
			case "Insertion":
				this.drawInsert();
				break;
			case "Bubble":
				this.drawBubble();
				break;
		}
	}
	drawSelection(){
		let sortdata = this.state.data;
		let finishedIndex = 0;
		const aniList = getSelectAnimations(sortdata);
		console.log(aniList);
		for(let i = 0 ; i < aniList.length ; i++){
			const array = document.getElementsByClassName('barSelect');
			const [aniType, first, second] = aniList[i];
			if(aniType > 0){
				if(aniType === 1 || aniType === 2){
					console.log(aniList[i]);
				}
				const barStyle = array[second].style;
				const color = aniType% 2 === 0 ? defaultColor: '#f00';
				setTimeout(() => {
					barStyle.backgroundColor = color;
				}, i*ANIMATION_SPEED_MS);
			}else{
				setTimeout(() =>{

					const barStyle = array[first].style;
					barStyle.height = `${second}px`;
					if(aniType === -1){
						barStyle.backgroundColor ='#5f5'; //because that one's completed
					}
				}, i*ANIMATION_SPEED_MS);
			}

		}
	}
	drawBubble(){
		let sortdata = this.state.data;
		sortdata = getBubbleAnimations(sortdata);
		this.setState({
			data:sortdata,
		});
	}
	drawHeap(){
	}
	drawInsert(){
		const aniList = getInsertAnimations(this.state.data);
		this.setState({
			data:aniList,
		});
	}
	drawQuick(){
	}
	
	drawMerge() {
	}
	render(){
		let sortType = this.state.sortType;
		let bars = this.state.data.map(function(info, i){
			let style = {
				width: 4,
				height:info,
			}
			console.log(sortType);
			if(sortType === 'Selection'){
				return <div className="bar barSelect" style={style} key={i}></div>
			}else if (sortType ==='Merge'){
				return <div className="bar barMerge" style={style} key={i}></div> 
			}else if (sortType ==='Insertion'){
				return <div className="bar barInsert" style={style} key={i}></div>
			}else if (sortType ==='Quick'){
				return <div className="bar barQuick" style={style} key={i}></div>
			}else if (sortType ==='Bubble'){
				return <div className="bar barBubble" style={style} key={i}></div>
			}else if (sortType ==='Heap'){
				return <div className="bar barHeap" style={style} key={i}></div>
			}else return <div className="bar" style={style} key={i}></div>
		});
		return bars;
	}

}

export default DrawDiv;