import Swap from './Swap';
let n; //global length variable
export function getHeapAnimations(data){
	const animations = [];
	Heap(data, animations);
	return animations;
}

function Heap(data, animations){
	let i;
	n = data.length;
	for(i = Math.floor(n/2) ; i >= 0 ; i--){ //use floor so that if the array has odd number of elements we don't get something awkward to deal with
		HeapMakeRoot(data,i, animations);
	}
	for( i = n - 1 ; i > 0 ; i--){
		Swap(data, 0, i);
		animations.push([-2, 0, data[0]]);
		animations.push([-2,i,data[i]]);
		n--;
		HeapMakeRoot(data,0, animations);
	}
}

function HeapMakeRoot(data, i, animations){

	let max = i;
	const l = 2*i + 1;
	const r = 2*i + 2;
	animations.push([1,0,i]);
	
	if(l < n && data[l] > data[max]){
		max = l;
		animations.push([1,0,max]);
	}
	
	if( r < n && data[r] > data[max]){
		animations.push([2,0,max]);
		max = r;
		animations.push([1,0,max]);
	}
	if(max !== i){
		Swap(data, i, max);
		animations.push([-2, max, data[max]]);
		animations.push([-2,i,data[i]]);
		animations.push([2,0,i]);
		animations.push([2,0,max]);
		HeapMakeRoot(data, max, animations);
	}
	animations.push([2,0,i]);
}