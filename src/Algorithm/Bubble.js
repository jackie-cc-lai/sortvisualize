import Swap from './Swap';

export function getBubbleAnimations(sortdata){
	let i;
	let done;
	let length = sortdata.length - 1;
	const animations = [];
	do{
		done = false;
		for( i = 0 ; i < length ; i ++ ){
			animations.push([1,i, i+1]);
			if(sortdata[i] > sortdata[i+1]){
				Swap(sortdata, i, i+1);
				animations.push([-2,i,sortdata[i]]);
				animations.push([-2,i+1,sortdata[i+1]]);
				done = true;
			}
			animations.push([2,i,i+1]);
		}
		animations.push([-1,length,sortdata[length]]);
		length--;
	}while(done);
	return animations;
}