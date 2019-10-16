export function getInsertAnimations(sortdata){
	const animations = [];
	let i, j;
	for ( i = 0 ; i < sortdata.length ; i ++ ){
		let temp = sortdata[i];
		j = i;
		while ( j > 0 && temp < sortdata[j - 1]){
			animations.push([1,j,j-1]);
			
			sortdata[j] = sortdata[j-1];
			
			animations.push([-1,j,sortdata[j]]);
			animations.push([2,j,j-1]);
			j--;	
		}
		sortdata[j] = temp;
		animations.push([-1,j,sortdata[j]]);
	}
	return animations;
}