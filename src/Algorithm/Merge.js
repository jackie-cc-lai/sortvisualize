export function getMergeAnimations(data){
	const animations = [];
	const endIndex = data.length - 1;
	const refArray = JSON.parse(JSON.stringify(data)); //Get a reference array to know where the values are originally so we can push using indexing
	if(data.length <= 1) return data;
	doSort(data, refArray, animations, 0, endIndex);
	return animations;
}
function doSort(data, refArray,animations, leftIndex, rightIndex){
	if (rightIndex == leftIndex) return;
	const split = Math.floor( (rightIndex + leftIndex) / 2 );
	//Reverse the data here because data gets changed during calls
	doSort(refArray, data, animations, leftIndex, split);
	doSort(refArray, data, animations, split + 1, rightIndex);
	merge(data, refArray,animations, leftIndex, split, rightIndex);
}
function merge(data, refArray,animations, startIndex, splitIndex, lastIndex){
	let leftCheck = startIndex;
	let rightCheck = splitIndex + 1;
	let refpt = startIndex;
	//Change the original push loop to left and right sliced arrays to directly affecting the main array
	while(leftCheck <= splitIndex && rightCheck <= lastIndex){
		animations.push([1,leftCheck,rightCheck]);
		animations.push([2,leftCheck,rightCheck]);
		if(refArray[leftCheck] <= refArray[rightCheck]){
			animations.push([-2,refpt, refArray[leftCheck]]);
			data[refpt] = refArray[leftCheck];
			leftCheck++;
			refpt++;
		}else{
			animations.push([-2,refpt, refArray[rightCheck]]);
			data[refpt] = refArray[rightCheck];
			rightCheck++;
			refpt++;
		}
	}
	//Change my original concatenation to while push loops
	while(leftCheck <= splitIndex){
		animations.push([1,leftCheck,leftCheck]);
		animations.push([2,leftCheck,leftCheck]);
		animations.push([-2,refpt, refArray[leftCheck]]);
		data[refpt] = refArray[leftCheck];
		leftCheck++;
		refpt++;
	}
	while(rightCheck <= lastIndex){
		animations.push([1,rightCheck,rightCheck]);
		animations.push([2,rightCheck,rightCheck]);
		animations.push([-2,refpt, refArray[rightCheck]]);
		data[refpt] = refArray[rightCheck];
		rightCheck++;
		refpt++;
	}
}