/*-----------------------------------
NEXT STEPS:
Refactor internal data structure for cash into the 
cidNew = {
  PENNY: 101
  ,NICKEL: 205
  etc
}
object.
Write helper functions for converting to/from format.


-----------------------------------*/




/*
Here be absolute spaghetti code.
FUTURE: more elegant handling of dollars/cents.

Maybe convert the whole cid input into an object like
cidNew = {
  PENNY: 101
  ,NICKEL: 205
  etc
}
More validation in general (e.g. prevent having fractional nickels)

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

function totalCents(cash) {
	let sum = 0;
	// TODO: replace with cleaner dot method
	for(elem of cash) {
		sum += elem[1]*100
	}
	return sum.toFixed(0);
}

/* Main logic */

// in: change in cents. out: change in denoms array
// Does not mutate cid. Yet.
function makeChange(centsDue,cid) {
  if(centsDue > totalCents(cid)) {
    return {status: "INSUFFICIENT_FUNDS",change: []}
  }
  
  // Fill this out with amounts due as we go.
  // FUTURE: reformatting cid and changeOut to non-arrays so order doesn't matter
  let changeOut = [["ONE HUNDRED", 0], ["TWENTY", 0], ["TEN", 0], ["FIVE", 0],
    ["ONE", 0], ["QUARTER", 0], ["DIME", 0], ["NICKEL", 0], ["PENNY", 0]]
  
	// TODO: add in remaining denoms
	/* Ex.:
		centsDue = 3 cents
		[["PENNY", 1.01]] -> (cid[0][1]>100) -> 101 cents
		101 >= 3.
	*/
	
	// If we owe at least one nickel, and we have at least one nickel
	if(centsDue>5 && cid[1][1]>0.05) {
	  /* TODO roll this into a helper function
	    changeFromDenom(centsDue,dollars,denom) e.g. (16 cents,0.1,"NICKEL")
	    return [remainingCentsDue,changeDue for that denom]]
	  
	  Ex.:
	  centsDue == 16
	  cid[1][1] == 0.10 (2 nickels) --> 10 cents --> centsDrawer = 10
	  let centsDrawer = cid[1][1]*100
	  
  	  if(centsDue > centsDrawer) {
  	    centsDue -= centsDrawer;
        changeDue = [denom,centsDrawer] // ["NICKELS",0.10] all of it.
  	  }
  	  
  	 
  	 return [6, ["NICKELS",0.10]  ] // can also return object, destructuring
	  
	  */
	}
	
	
	// If we owe pennies and we have enough pennies in drawer:
	if(centsDue>0 && (cid[0][1]*100)>=centsDue) {
		// Add the remaining centsDue to the change we return.
		changeOut[8][1] = (centsDue/100).toFixed(2);
		centsDue = 0;
	}
	
	// If at end of this, centsDue!=0, return INSUFFICIENT_FUNDS
	if(centsDue!==0) {
	  return {status: "INSUFFICIENT_FUNDS",change: []};
	}
	else {
	  // TODO handling for exactsies, totalCents(changeOut) equals changeDue
	  return {status: "OPEN",change:changeOut};
	}
}


/* Testing vals */
let cid = [["PENNY", 1.01], ["NICKEL", 2.05], ["DIME", 3.1], ["QUARTER", 4.25], ["ONE", 90], ["FIVE", 55], ["TEN", 20], ["TWENTY", 60], ["ONE HUNDRED", 100]];
let due = 3;
let tst = makeChange(due,cid);
console.log(tst);









function checkCashRegister(price, cash, cid) {
  const funds = totalCents(cid);
  const changeDue = (cash-price)*100; // convert to cents
  
  // TODO
  
}
