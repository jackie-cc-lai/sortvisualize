import { useEffect, useState } from 'react';
import './App.css';
import SortSelect from './Algorithm/SortSelect';

const SORT_TYPES = ['Merge', 'Selection', 'Insertion', 'Bubble', 'Heap', 'Quick'];

const getMaxSize = (screenWidth = window.outerWidth) => {
  return screenWidth < 900 ? 40 : screenWidth < 1100 ? 80 : screenWidth < 1200 ? 50 : 68;
};

const makeRandomArray = (ArrSize = getMaxSize()) => {
  const arr = [];
  for (let i = 0; i < ArrSize; i++) {
    arr.push(Math.ceil(Math.random() * 350));
  }
  return arr;
};

function App() {
  const [data, setData] = useState([]);
  const [start, setStart] = useState(false);
  const [anireset, setAnireset] = useState(false);

  const makeArray = (ArrSize) => {
    setData(makeRandomArray(ArrSize));
    setStart(false);
    setAnireset(true);
  };

  const makeOptimal = (ArrSize = getMaxSize()) => {
    const toSort = [];
    for (let i = 1; i < ArrSize + 1; i++) {
      toSort.push(i * 4);
    }
    setData(toSort);
    setStart(false);
    setAnireset(true);
  };

  const makeWorst = (ArrSize = getMaxSize()) => {
    const toSort = [];
    for (let i = ArrSize + 1; i > 0; i--) {
      toSort.push(i * 4);
    }
    setData(toSort);
    setStart(false);
    setAnireset(true);
  };

  const startSort = () => {
    setStart(true);
  };

  useEffect(() => {
    makeArray();
    // Initial array only on mount (matches prior componentDidMount).
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <button className="btnTop" onClick={() => makeArray(15)}>
          Generate Small Array
        </button>
        <button className="btnTop" onClick={() => makeArray(30)}>
          Generate Medium Array
        </button>
        <button className="btnTop" onClick={() => makeArray()}>
          Generate Large Array
        </button>
        <button className="btnTop" onClick={() => makeOptimal()}>
          Optimal Case Array
        </button>
        <button className="btnTop" onClick={() => makeWorst()}>
          Worst Case Array
        </button>
        <button className="btnTop" onClick={() => startSort()}>
          Begin Sort!
        </button>
      </header>
      <div className="main">
        <div className="sortContainer">
          {SORT_TYPES.map((sortType) => (
            <div className="sort" id={sortType} key={sortType}>
              {sortType} Sort
              <div className="sortMain">
                <SortSelect
                  data={data}
                  sort={sortType}
                  start={start}
                  anireset={anireset}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;
