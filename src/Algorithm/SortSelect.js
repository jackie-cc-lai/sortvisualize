import React from 'react';
import {getSelectAnimations} from './Selection';
import {getBubbleAnimations} from './Bubble';
import {getInsertAnimations} from './Insertion';
//import {getMergeAnimations} from './Merge';

const ANIMATION_SPEED_MS = 20;
const defaultColor = '#888';
const workColor = '#f00';
const doneColor = '#5f5';
class DrawDiv extends React.Component{
	constructor(props){
		super(props);
		this.state = {
			data: JSON.parse(JSON.stringify(this.props.data)),
			sortType: this.props.sort,
			start: this.props.start,
			anireset: null
		}
	}
	componentDidMount(){
	}
	UNSAFE_componentWillReceiveProps(nextProps) {
		this.setState({ data: JSON.parse(JSON.stringify(nextProps.data)), sortType: nextProps.sort, start: nextProps.start, anireset: nextProps.anireset}, () =>{
		if(this.state.start === true){
			this.doSort(this.state.sortType);
		}
		if(this.state.anireset === true){
			let i;
			const array = document.getElementsByClassName('bar');
			for ( i = 0 ; i < array.length ; i ++ ){
				const barStyle = array[i].style;
				barStyle.backgroundColor=defaultColor;
			}
		}
		
		}); 
	}
	doSort(sortName){
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
			default:
				break;
		}
	}
	drawSelection(){
		let sortdata = this.state.data;
		const aniList = getSelectAnimations(sortdata);
		for(let i = 0 ; i < aniList.length ; i++){
			const array = document.getElementsByClassName('barSelect');
			const [aniType, first, second] = aniList[i];
			if(aniType > 0){
				const barStyle = array[second].style;
				const color = aniType% 2 === 0 ? defaultColor: workColor;
				setTimeout(() => {
					barStyle.backgroundColor = color;
				}, i*ANIMATION_SPEED_MS);
			}else{
				setTimeout(() =>{

					const barStyle = array[first].style;
					barStyle.height = `${second}px`;
					if(aniType === -1){
						barStyle.backgroundColor =doneColor; //because that one's completed
					}
				}, i*ANIMATION_SPEED_MS);
			}

		}
	}
	drawBubble(){
		let sortdata = this.state.data;
		const aniList = getBubbleAnimations(sortdata);
		let i;
		for(i = 0 ; i < aniList.length ; i ++ ) {
			const array = document.getElementsByClassName('barBubble');
			const [aniType,first,second] = aniList[i];
			
			if(aniType > 0 ){
				const barOneStyle = array[first].style;
				const barTwoStyle = array[second].style;
				const color = aniType % 2 === 0 ? defaultColor: workColor;
				setTimeout(() => {
					barOneStyle.backgroundColor = color;
					barTwoStyle.backgroundColor = color;
				}, i*ANIMATION_SPEED_MS);
			}else{
				const barStyle = array[first].style;
				setTimeout(() => {
					barStyle.height = `${second}px`;
				}, i*ANIMATION_SPEED_MS);
			}
		}
	}
	drawHeap(){
	}
	drawInsert(){
		const aniList = getInsertAnimations(this.state.data);
		let i;
		for(i = 0 ; i < aniList.length ; i ++ ) {
			const array = document.getElementsByClassName('barInsert');
			const [aniType,first,second] = aniList[i];
			
			if(aniType > 0 ){
				const barOneStyle = array[first].style;
				const barTwoStyle = array[second].style;
				const color = aniType % 2 === 0 ? defaultColor: workColor;
				setTimeout(() => {
					barOneStyle.backgroundColor = color;
					barTwoStyle.backgroundColor = color;
				}, i*ANIMATION_SPEED_MS);
			}else{
				const barStyle = array[first].style;
				setTimeout(() => {
					barStyle.height = `${second}px`;
				}, i*ANIMATION_SPEED_MS);
			}
		}
		const array = document.getElementsByClassName('barInsert');
		while ( i >= aniList.length){
			let j;
			for(j = 0 ; j < array.length ; j ++ ){
			const barStyle = array[j].style;
			setTimeout(() => {
				barStyle.backgroundColor = doneColor;
			},i*ANIMATION_SPEED_MS);
			}
			if(j >=array.length){
				break; //there should be a more elegant way of doing this...
			}
		}
		
	}
	drawQuick(){
	}
	
	drawMerge() {
	}
	render(){
		let sortType = this.state.sortType;
		let bars = this.state.data.map(function(info, i){
			let style = {
				height:info,
			}
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