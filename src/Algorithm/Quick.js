import Swap from './Swap';

export function getQuickAnimations(data){
	const animations = [];
	doQuick(data, 0, data.length - 1, animations);
	return animations;
}
function doQuick(data, low, high, animations){
	if(low < high){
		let newIndex = partition(data, low, high, animations);
		doQuick(data, low, newIndex - 1, animations);
		doQuick(data, newIndex + 1, high, animations);
	}
}
const partition = (data, low, high, animations) => {
	let pivot = data[high];
	animations.push([3,0,high]);
	let i = low - 1;
	console.log(i);
	for ( let j = low ; j <=high - 1 ; j ++){
		animations.push([1,0,j]);
		if(data[j] < pivot){
			i++;
			animations.push([1,0,i]);
			Swap(data, i, j);
			animations.push([-2,i,data[i]]);
			animations.push([-2,j,data[j]]);
			animations.push([2,0,i]);
		}
		animations.push([2,0,j]);

	}
	Swap(data, i+1, high);
	animations.push([-2,i+1, data[i+1]]);
	animations.push([-2,high,data[high]]);
	animations.push([2,0,high]);
	return (i+1);
}