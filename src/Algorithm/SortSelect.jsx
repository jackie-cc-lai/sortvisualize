import { useEffect, useRef } from 'react';
import { getSelectAnimations } from './Selection';
import { getBubbleAnimations } from './Bubble';
import { getInsertAnimations } from './Insertion';
import { getQuickAnimations } from './Quick';
import { getMergeAnimations } from './Merge';
import { getHeapAnimations } from './Heap';

const ANIMATION_SPEED_MS = 20;
const defaultColor = '#888';
const workColor = '#f00';
const doneColor = '#5f5';

const BAR_CLASS = {
  Selection: 'barSelect',
  Merge: 'barMerge',
  Insertion: 'barInsert',
  Quick: 'barQuick',
  Bubble: 'barBubble',
  Heap: 'barHeap',
};

function SortSelect({ data, sort, start, anireset }) {
  const timeoutsRef = useRef([]);
  const runIdRef = useRef(0);
  const prevStartRef = useRef(false);
  const barClass = BAR_CLASS[sort] || 'bar';

  const clearScheduled = () => {
    timeoutsRef.current.forEach(clearTimeout);
    timeoutsRef.current = [];
  };

  const schedule = (fn, delay, runId) => {
    const id = setTimeout(() => {
      if (runId !== runIdRef.current) return;
      fn();
    }, delay);
    timeoutsRef.current.push(id);
  };

  const resetPanelColors = () => {
    const bars = document.getElementsByClassName(barClass);
    for (let i = 0; i < bars.length; i++) {
      bars[i].style.backgroundColor = defaultColor;
    }
  };

  const makeGreen = (aniList, stepIndex, runId) => {
    if (stepIndex < aniList.length) return;
    const array = document.getElementsByClassName(barClass);
    for (let j = 0; j < array.length; j++) {
      const barStyle = array[j].style;
      schedule(() => {
        barStyle.backgroundColor = doneColor;
      }, stepIndex * ANIMATION_SPEED_MS, runId);
    }
  };

  const runAnimations = (sortdata) => {
    clearScheduled();
    runIdRef.current += 1;
    const runId = runIdRef.current;
    const working = sortdata.slice();

    let aniList;
    switch (sort) {
      case 'Merge':
        aniList = getMergeAnimations(working);
        break;
      case 'Selection':
        aniList = getSelectAnimations(working);
        break;
      case 'Quick':
        aniList = getQuickAnimations(working);
        break;
      case 'Heap':
        aniList = getHeapAnimations(working);
        break;
      case 'Insertion':
        aniList = getInsertAnimations(working);
        break;
      case 'Bubble':
        aniList = getBubbleAnimations(working);
        break;
      default:
        return;
    }

    const array = () => document.getElementsByClassName(barClass);

    let i;
    for (i = 0; i < aniList.length; i++) {
      const [aniType, first, second] = aniList[i];
      const step = i;

      if (sort === 'Selection') {
        if (aniType > 0) {
          schedule(() => {
            const barStyle = array()[second]?.style;
            if (!barStyle) return;
            barStyle.backgroundColor = aniType % 2 === 0 ? defaultColor : workColor;
          }, step * ANIMATION_SPEED_MS, runId);
        } else {
          schedule(() => {
            const barStyle = array()[first]?.style;
            if (!barStyle) return;
            barStyle.height = `${second}px`;
            if (aniType === -1) barStyle.backgroundColor = doneColor;
          }, step * ANIMATION_SPEED_MS, runId);
        }
        continue;
      }

      if (sort === 'Heap' || sort === 'Quick') {
        if (aniType > 0) {
          schedule(() => {
            const barStyle = array()[second]?.style;
            if (!barStyle) return;
            barStyle.backgroundColor =
              aniType % 3 === 0 ? 'blue' : aniType % 3 === 2 ? defaultColor : workColor;
          }, step * ANIMATION_SPEED_MS, runId);
        } else {
          schedule(() => {
            const barStyle = array()[first]?.style;
            if (!barStyle) return;
            barStyle.height = `${second}px`;
            if (aniType === -1) barStyle.backgroundColor = doneColor;
          }, step * ANIMATION_SPEED_MS, runId);
        }
        continue;
      }

      // Merge / Insertion / Bubble share the same pairwise pattern
      if (aniType > 0) {
        schedule(() => {
          const bars = array();
          const barOneStyle = bars[first]?.style;
          const barTwoStyle = bars[second]?.style;
          if (!barOneStyle || !barTwoStyle) return;
          const color = aniType % 2 === 0 ? defaultColor : workColor;
          barOneStyle.backgroundColor = color;
          barTwoStyle.backgroundColor = color;
        }, step * ANIMATION_SPEED_MS, runId);
      } else {
        schedule(() => {
          const barStyle = array()[first]?.style;
          if (!barStyle) return;
          barStyle.height = `${second}px`;
          if (sort === 'Bubble' && aniType === -1) {
            barStyle.backgroundColor = doneColor;
          }
        }, step * ANIMATION_SPEED_MS, runId);
      }
    }

    if (sort !== 'Selection') {
      makeGreen(aniList, i, runId);
    }
  };

  useEffect(() => {
    if (anireset) {
      clearScheduled();
      runIdRef.current += 1;
      resetPanelColors();
    }

    const wasStarted = prevStartRef.current;
    prevStartRef.current = start;

    // Rising edge only — prevents multi-draw while start stays true.
    if (start && !wasStarted && data.length > 0) {
      runAnimations(data);
    }

    return () => {
      clearScheduled();
    };
    // Intentionally keyed to parent sort controls; data identity changes on regenerate.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [start, anireset, data, sort]);

  return data.map((info, i) => (
    <div
      className={`bar ${barClass}`}
      style={{ height: info }}
      key={i}
    />
  ));
}

export default SortSelect;
