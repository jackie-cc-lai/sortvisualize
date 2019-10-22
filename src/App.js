import React from 'react';
import './App.css';
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
			anireset: null,
		};
	}
	
	componentDidMount(){
		this.MakeArray();
	}
	
	MakeArray(ArrSize = 40){
		var toSort = makeRandomArray(ArrSize);
		this.setState({
			data: toSort,
			start: false,
			anireset: true,
		});
	}
	MakeOptimal(ArrSize = 40){
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
	MakeWorst(ArrSize = 40){
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
		return (
    <div className="App">
      <header className="App-header">
	  <button className="btnTop" onClick={() => this.MakeArray()}> Generate New Array </button>
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
