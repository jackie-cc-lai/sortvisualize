import React from 'react';
import logo from './logo.svg';
import './App.css';
import Insertion from "./Insertion";
import Merge from "./Merge";
import Selection from "./Selection";
import Bubble from "./Bubble";
import Quick from "./Quick";

function App() {
	const divStyle={
		height: 300,
		width: 10,
	}
	const divStyle1={
		height: 150,
		width: 10,
	}
	const divStyle2={
		height: 250,
		width: 10,
	}
	const divStyle3={
		height: 200,
		width: 10,
	}
  return (
    <div className="App">
      <header className="App-header">
	  </header>
	  <div className = "main">
		  <div className = "sortContainer">
			<div className = "sort" id = "merge">Merge Sort
				<div className = "sortMain">
					<div className = "bar" style={divStyle}></div>
					<div className = "barSelect" style = {divStyle1}></div>
					<div className = "barSelect" style = {divStyle2}></div>
					<div className = "bar" style = {divStyle3}></div>
					<div className = "bar" style = {divStyle1}></div>

				</div>
			</div>
			<div className = "sort" id = "select">Selection Sort</div>
			<div className = "sort" id = "insert">Insertion Sort</div>
			<div className = "sort" id = "bubble">Bubble Sort</div>
			<div className = "sort" id = "heap">Heap Sort</div>
			<div className = "sort" id = "quick">Quick Sort</div>
		  </div>
	  </div>
    </div>
  );
}

export default App;
