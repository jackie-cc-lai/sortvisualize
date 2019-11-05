import React from 'react';
import './App.css';
import SortSelect from "./Algorithm/SortSelect";

const getMaxSize = (screenWidth = window.outerWidth) => {
	return (screenWidth < 900) ? 40 : (screenWidth < 1100)? 80 : (screenWidth < 1200) ? 50 : 68;
}

const makeRandomArray = (ArrSize = getMaxSize() ) =>{
	var arr = [];
	console.log(ArrSize);
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
			anireset: null,
		};
	}
	
	componentDidMount(){
		this.MakeArray();
	}
	
	MakeArray(ArrSize){
		var toSort = makeRandomArray(ArrSize);
		this.setState({
			data: toSort,
			start: false,
			anireset: true,
		});
	}
	MakeOptimal(ArrSize = getMaxSize()){
		const toSort = [];
		let i;
		for(i = 1 ; i < ArrSize+1 ; i ++ ){
			toSort.push(i*4);
		}
		this.setState({
			data: toSort,
			start:false,
			anireset: true,
		});
	}
	MakeWorst(ArrSize = getMaxSize()){
		const toSort = [];
		let i;
		for( i = ArrSize + 1 ; i > 0 ; i -- ){
			toSort.push(i*4);
		}
		this.setState({
			data: toSort,
			start:false,
			anireset:true,
		});
	}
	StartSort(){
		this.setState({
			start: true,
		});
	}
	SortSelect(sortType){
		return <div className="sort" id = {sortType}>{sortType} Sort<div className="sortMain"> <SortSelect data={this.state.data} sort={sortType} start={this.state.start} anireset={this.state.anireset}/> </div></div>;
	}
	render(){
		let maxSize = getMaxSize();
		console.log("rendering maxSize is:");
		console.log(maxSize);
		return (
    <div className="App">
      <header className="App-header">
	  <button className="btnTop" onClick={() => this.MakeArray(15)}> Generate Small Array </button>
	  <button className="btnTop" onClick={() => this.MakeArray(30)}> Generate Medium Array </button>
	  <button className="btnTop" onClick={() => this.MakeArray()}> Generate Large Array </button>
	  <button className="btnTop" onClick={() => this.MakeOptimal()}> Optimal Case Array </button>
	  <button className="btnTop" onClick={() => this.MakeWorst()}> Worst Case Array </button>
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
