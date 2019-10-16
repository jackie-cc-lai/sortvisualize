
import Swap from './Swap';

export function getBubbleAnimations(sortdata){
	let i;
	let done;
	do{
		done = false;
		for( i = 0 ; i < sortdata.length - 1 ; i ++ ){
			if(sortdata[i] > sortdata[i+1]){
				Swap(sortdata, i, i+1);
				done = true;
			}
		}
	}while(done);
	return sortdata;
}