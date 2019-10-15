import React from 'react';
import logo from './logo.svg';
import './App.css';
import Insertion from "./Algorithm/Insertion";
import Merge from "./Algorithm/Merge";
import Selection from "./Algorithm/Selection";
import Bubble from "./Algorithm/Bubble";
import Quick from "./Algorithm/Quick";
import Heap from "./Algorithm/Heap";

const makeRandomArray = (ArrSize) =>{
	var arr = [];
	for(let i = 0 ; i < ArrSize ; i ++){
		arr.push(Math.ceil(Math.random()*350));
	}
	return arr;
}
class App extends React.Component { //Currently statically written divs but will make them dynamic if possible (should be possible)
	constructor(props){
		super(props);
		this.state = {data: []};
	}
	
	componentDidMount(){
		this.MakeArray();
	}
	
	MakeArray(ArrSize = 40){
		var toSort = makeRandomArray(ArrSize);
		this.setState({
			data: toSort,
		});
	}
	SortSelect(sortType){
		if(sortType === "Bubble"){
			return <div className="sort" id = {sortType}>Bubble Sort<div className="sortMain"><Bubble data={this.state.data} sort={sortType}/> </div></div>;
		}else if (sortType === "Insertion"){
			return <div className="sort" id = {sortType}>Insertion Sort<div className="sortMain"><Insertion data={this.state.data} sort={sortType}/> </div></div>;
		}else if (sortType ==="Quick"){
			return <div className="sort" id = {sortType}>Quick Sort<div className="sortMain"><Quick data={this.state.data} sort={sortType}/> </div></div>;
		}else if (sortType ==="Heap"){
			return <div className="sort" id = {sortType}>Heap Sort<div className="sortMain"><Heap data={this.state.data} sort={sortType}/> </div></div>;
		}else if (sortType ==="Merge"){
			return <div className="sort" id = {sortType}>Merge Sort<div className="sortMain"><Merge data={this.state.data} sort={sortType}/> </div></div>;
		}
		return <div className="sort" id = {sortType}>Selection Sort<div className="sortMain"> <Selection data={this.state.data} sort={sortType}/> </div></div>;
	}
	render(){
		return (
    <div className="App">
      <header className="App-header">
	  </header>
	  <div className = "main">
		  <div className = "sortContainer">
			{this.SortSelect("Merge")}
			{this.SortSelect("Selection")}				
			{this.SortSelect("Insertion")}				
			{this.SortSelect("Bubble")}				
			{this.SortSelect("Heap")}				
			{this.SortSelect("Quick")}
		  </div>
	  </div>
    </div>
  );
	}
  
}

export default App;
