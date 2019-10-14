import React from 'react';
import logo from './logo.svg';
import './App.css';
import Insertion from "./Algorithm/Insertion";
import Merge from "./Algorithm/Merge";
import Selection from "./Algorithm/Selection";
import Bubble from "./Algorithm/Bubble";
import Quick from "./Algorithm/Quick";

const makeRandomArray = (ArrSize) =>{
	var arr = [];
	for(let i = 0 ; i < ArrSize ; i ++){
		arr.push(Math.floor(Math.random()*350));
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
	
	MakeArray(ArrSize = 20){
		var toSort = makeRandomArray(ArrSize);
		this.setState({
			data: toSort,
		});
	}
	SortSelect(){
		console.log("SortSelect in app.js");
		console.log(this.state.data);
		return <Selection data={this.state.data}/>;
	}
	render(){
		return (
    <div className="App">
      <header className="App-header">
	  </header>
	  <div className = "main">
		  <div className = "sortContainer">
			<div className = "sort" id = "merge">Merge Sort

			</div>
			<div className = "sort sortFirst" id = "select">Selection Sort
				<div className = "sortMain">
					{this.SortSelect()}
				</div></div>
			<div className = "sort" id = "insert">Insertion Sort</div>
			<div className = "sort" id = "bubble">Bubble Sort</div>
			<div className = "sort" id = "heap">Heap Sort</div>
			<div className = "sort" id = "quick">Quick Sort</div>
		  </div>
	  </div>
    </div>
  );
	}
  
}

export default App;
