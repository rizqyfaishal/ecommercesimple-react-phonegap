import { isUndefined } from 'lodash';

export function convertToRupiah(angka)
{
	angka = angka.toString().split('.')[0]
	let rupiah = '';		
	const angkarev = angka.toString().split('').reverse().join('');
	for(var i = 0; i < angkarev.length; i++) if(i%3 == 0) rupiah += angkarev.substr(i,3)+'.';
	return rupiah.split('',rupiah.length-1).reverse().join('');
}

export function convertErrorResponse(error) {
	return isUndefined(error) ? [] : error
}