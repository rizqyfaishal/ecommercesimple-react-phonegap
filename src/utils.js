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

export const updateContactsByPhoneBook = (dispatcher, actionCreator) => {
   document.addEventListener('deviceready', () => {
      navigator.contactsPhoneNumbers.list(function(contacts) {
         console.log(contacts.length + ' contacts found');
         const emails = [];
         const phoneNumbers = [];
         for(var i = 0; i < contacts.length; i++) {
            console.log(contacts[i].emails);
            console.log(contacts[i].phoneNumbers);
            if(contacts[i].emails) {
            	contacts[i].emails.forEach(email => {
	              if(emails.indexOf(email) == -1) {
	                 emails.push(email.email);
	              }
	            })
            } 

            if(contacts[i].phoneNumbers) {
            	contacts[i].phoneNumbers.forEach(phoneNumber => {
	              if(phoneNumbers.indexOf(phoneNumber) == -1) {
	                 phoneNumbers.push(phoneNumber.normalizedNumber);
	              }
	            })
            }
         }
         dispatcher(actionCreator(emails, phoneNumbers));
      }, function(error) {
         console.error(error);
      });
   }, false)
}