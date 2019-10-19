export function getMergeAnimations(data){
	const sortedData = doSort(data);
	if(data.length <= 1) return data;
	return sortedData;
}
function doSort(array){
	if(array.length === 1){
		return array;
	}
	const middle = Math.floor(array.length / 2 );
	const left = array.slice(0, middle);
	const right = array.slice(middle);
	return merge(doSort(left), doSort(right));
}
function merge(arrLeft, arrRight){
	let resultArray = [], leftIndex = 0, rightIndex = 0;
	while(leftIndex < arrLeft.length && rightIndex < arrRight.length){
		if(arrLeft[leftIndex] < arrRight[rightIndex]){
			resultArray.push(arrLeft[leftIndex]);
			leftIndex++;
		}else{
			resultArray.push(arrRight[rightIndex]);
			rightIndex++;
		}
	}
	return resultArray.concat(arrLeft.slice(leftIndex)).concat(arrRight.slice(rightIndex));
}