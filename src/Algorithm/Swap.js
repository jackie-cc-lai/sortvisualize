import React from 'react';

function Swap(arr, num1, num2){
	let numTemp = arr[num1];
	arr[num1] = arr[num2];
	arr[num2] = arr[num1];
}

export default Swap;