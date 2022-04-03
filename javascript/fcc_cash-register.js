/*

Roughing out logic:
* if price > totalCents cid: INSUFFICIENT_FUNDS
* if price == totalCents cid: CLOSED
* otherwise:
let changeDueCents = cash-price
convert changeDueCents into coins // hard part
Probably use a for loop or switch, going "down the list" of denoms. Modulo?


*/

// Enums (real enums are a TypeScript thing, alas)
const denoms = Object.freeze({
  "PENNY": 1
  ,"NICKEL": 5
  ,"DIME": 10
  ,"QUARTER": 25
  ,"ONE": 100
  ,"FIVE": 500
  ,"TEN": 1000
  ,"TWENTY": 2000
  ,"ONE HUNDRED": 10000
})

/* Helper functions */

// cashToDenom("NICKEL",0.25) --> 5 nickels
function cashToDenom(denom,dollars) {
	return (dollars/denoms[denom])*100
}

function makeChange(change,cid) {
	// TODO
	/*
		Loop from largest denom to smallest?
	
	*/
}

function totalCents(cid) {
	let sum = 0;
	// TODO: replace with cleaner dot method
	for(elem of cid) {
		console.log(elem)
		sum += elem[1]*100
	}
	return sum.toFixed(0);
}

function checkCashRegister(price, cash, cid) {
  const funds = totalCents(cid);
  const changeDue = cash-price;
  
  // TODO
  
}
