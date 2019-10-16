import React from 'react';
import './App.css';
import Merge from "./Algorithm/Merge";
import Quick from "./Algorithm/Quick";
import Heap from "./Algorithm/Heap";
import SortSelect from "./Algorithm/SortSelect";

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
		this.state = {
			data: [],
			start: false,
		};
	}
	
	componentDidMount(){
		this.MakeArray();
	}
	
	MakeArray(ArrSize = 60){
		var toSort = makeRandomArray(ArrSize);
		this.setState({
			data: toSort,
			start: false,
		});
	}
	StartSort(){
		this.setState({
			start: true,
		});
		console.log("Begin sorting and animation");
	}
	SortSelect(sortType){
		if(sortType === "Bubble"){
			return <div className="sort" id = {sortType}>Bubble Sort<div className="sortMain"><SortSelect data={this.state.data} sort={sortType} start={this.state.start}/> </div></div>;
		}else if (sortType === "Insertion"){
			return <div className="sort" id = {sortType}>Insertion Sort<div className="sortMain"><SortSelect data={this.state.data} sort={sortType} start={this.state.start}/> </div></div>;
		}else if (sortType ==="Quick"){
			return <div className="sort" id = {sortType}>Quick Sort<div className="sortMain"><Quick data={this.state.data} sort={sortType}/> </div></div>;
		}else if (sortType ==="Heap"){
			return <div className="sort" id = {sortType}>Heap Sort<div className="sortMain"><Heap data={this.state.data} sort={sortType}/> </div></div>;
		}else if (sortType ==="Merge"){
			return <div className="sort" id = {sortType}>Merge Sort<div className="sortMain"><Merge data={this.state.data} sort={sortType} start={this.state.start}/> </div></div>;
		}
		return <div className="sort" id = {sortType}>Selection Sort<div className="sortMain"> <SortSelect data={this.state.data} sort={sortType} start={this.state.start}/> </div></div>;
	}
	render(){
		return (
    <div className="App">
      <header className="App-header">
	  <button className="btnTop" onClick={() => this.MakeArray()}> Generate New Array </button>
	  <button className="btnTop" onClick={() => this.StartSort()}> Begin Sort! </button>
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
