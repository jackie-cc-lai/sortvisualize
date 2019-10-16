export function getInsertAnimations(sortdata){
	let i, j;
	for ( i = 0 ; i < sortdata.length ; i ++ ){
		let temp = sortdata[i];
		j = i;
		while ( j > 0 && temp < sortdata[j - 1]){
			sortdata[j] = sortdata[j-1];
			j--;	
		}
		sortdata[j] = temp;
	}
	return sortdata;
}