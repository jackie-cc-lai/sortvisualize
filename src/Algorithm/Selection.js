import Swap from './Swap';

export function getSelectAnimations(sortdata){
	let i, j;
	const animations =[];
	for( i = 0 ; i < sortdata.length -1 ; i ++ ){
		let arrMin = i;
		animations.push([3,0,arrMin]); //push arrMin to red
		for(j = i+1 ; j < sortdata.length ; j ++ ){
			animations.push([1,0,j]); //push the color I need, 1 stands for color change
			animations.push([2,0,j]);
			if(sortdata[j] < sortdata[arrMin]){
				animations.push([4,0,arrMin]);
				arrMin = j;
				animations.push([3,0,arrMin]);
			}
			
		}
		
		if(arrMin != i){
			Swap(sortdata, i, arrMin);
			
		}
		animations.push([4,0,arrMin]); //remove the red bar for arrMin
		animations.push([-1,i,sortdata[i]]); //push the two heights through, -1 stands for change height
		animations.push([-2,arrMin, sortdata[arrMin]]);
		
	}
	animations.push([-1,sortdata.length-1, sortdata[sortdata.length-1]]); //push the last piece through to change colors
	return animations;
}

/*
Key:
-1: Correctly sorted
-2: Height swapped
 1: j iteration color change to red
 2: j iteration color return to grey
 3: arrMin color change to red
 4: former arrMin color change back to grey
*/	