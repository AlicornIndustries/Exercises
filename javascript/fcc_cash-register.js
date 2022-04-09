/*
Here be absolute spaghetti code.
FUTURE: refactor enums
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


/* Helper functions */

function formatCid(cid) {
  // cid in dollars -> drawer object in cents
  let drawer = {};
  cid.forEach(elem => drawer[elem[0]] = Math.round(elem[1]*100))
  return drawer;
}

// DELETEME
//let cid = [["PENNY", 1.01], ["NICKEL", 2.05], ["DIME", 3.1], ["QUARTER", 4.25], ["ONE", 90], ["FIVE", 55], ["TEN", 20], ["TWENTY", 60], ["ONE HUNDRED", 100]];
//let drawer = formatCid(cid);
//console.log(drawer);

function totalCents(drawer) {
  // FUTURE: move to method on a Drawer object?
  return Object.values(drawer).reduce((a,b) => a+b);
}

function makeChange(centsDue,drawer) {
  if(centsDue > totalCents(drawer)) {
    return {status: "INSUFFICIENT_FUNDS",change: []}
  }
  
  // Fill this out with amounts due as we go.
  let changeOut = {};

  if(centsDue>0) {
    if(centsDue>=drawer.NICKEL) {
      // e.g. 17 centsDue, 10 drawer.NICKEL, 17-10 = 7
      changeOut.NICKEL = drawer.NICKEL;
      centsDue-=drawer.NICKEL;
    }
    else {
      // e.g. 7 centsDue, 10 drawer.NICKEL -> 7-5=2 cents left, 5 cents in changeOut
      // 7%5=2
      
      // 12 centsDue, 15 drawer.NICKEL -> 12-10=2 cents left, 10 cents in changeOut
      // 12%5 = 2
      // centsDue%denoms.NICKEL = remainingCentsDue
      // changeOut.NICKEL = 12-2 = originalCentsDue-remainingCentsDue
      
      changeOut.NICKEL = centsDue - (centsDue % denoms.NICKEL)
      centsDue = centsDue % denoms.NICKEL;
    }
  
  }



  
  // If we owe pennies and have enough pennies in the drawer:
  if(centsDue>0 && drawer.PENNY>=centsDue) {
    // Add the remaining centsDue to the change we return
    changeOut.PENNY = centsDue;
    centsDue = 0;
  }
  return changeOut;
}

let cid = [["PENNY", 0.20], ["NICKEL", 0.10]];
let drawer = formatCid(cid);
console.log(makeChange(12,drawer))


// cashToDenom("NICKEL",0.25) --> 5 nickels
/*function cashToDenom(denom,dollars) {
//	return (dollars/denoms[denom])*100
}*/


/* Main logic */

// in: change in cents. out: change in denoms array
// Does not mutate cid. Yet.
// function makeChange(centsDue,cid) {
  // if(centsDue > totalCents(cid)) {
    // return {status: "INSUFFICIENT_FUNDS",change: []}
  // }
  
  // // Fill this out with amounts due as we go.
  // // FUTURE: reformatting cid and changeOut to non-arrays so order doesn't matter
  // let changeOut = [["ONE HUNDRED", 0], ["TWENTY", 0], ["TEN", 0], ["FIVE", 0],
    // ["ONE", 0], ["QUARTER", 0], ["DIME", 0], ["NICKEL", 0], ["PENNY", 0]]
  
	// // TODO: add in remaining denoms
	// /* Ex.:
		// centsDue = 3 cents
		// [["PENNY", 1.01]] -> (cid[0][1]>100) -> 101 cents
		// 101 >= 3.
	// */
	
	// // If we owe at least one nickel, and we have at least one nickel
	// if(centsDue>5 && cid[1][1]>0.05) {
	  // /* TODO roll this into a helper function
	    // changeFromDenom(centsDue,dollars,denom) e.g. (16 cents,0.1,"NICKEL")
	    // return [remainingCentsDue,changeDue for that denom]]
	  
	  // Ex.:
	  // centsDue == 16
	  // cid[1][1] == 0.10 (2 nickels) --> 10 cents --> centsDrawer = 10
	  // let centsDrawer = cid[1][1]*100
	  
  	  // if(centsDue > centsDrawer) {
  	    // centsDue -= centsDrawer;
        // changeDue = [denom,centsDrawer] // ["NICKELS",0.10] all of it.
  	  // }
  	  
  	 
  	 // return [6, ["NICKELS",0.10]  ] // can also return object, destructuring
	  
	  // */
	// }
	
	
	// // If we owe pennies and we have enough pennies in drawer:
	// if(centsDue>0 && (cid[0][1]*100)>=centsDue) {
		// // Add the remaining centsDue to the change we return.
		// changeOut[8][1] = (centsDue/100).toFixed(2);
		// centsDue = 0;
	// }
	
	// // If at end of this, centsDue!=0, return INSUFFICIENT_FUNDS
	// if(centsDue!==0) {
	  // return {status: "INSUFFICIENT_FUNDS",change: []};
	// }
	// else {
	  // // TODO handling for exactsies, totalCents(changeOut) equals changeDue
	  // return {status: "OPEN",change:changeOut};
	// }
// }


/* Testing vals */
//let cid = [["PENNY", 1.01], ["NICKEL", 2.05], ["DIME", 3.1], ["QUARTER", 4.25], ["ONE", 90], ["FIVE", 55], ["TEN", 20], ["TWENTY", 60], ["ONE HUNDRED", 100]];
//let due = 3;
//let tst = makeChange(due,cid);
//console.log(tst);









function checkCashRegister(price, cash, cid) {
  const funds = totalCents(cid);
  const changeDue = (cash-price)*100; // convert to cents
  
  // TODO
  
}
