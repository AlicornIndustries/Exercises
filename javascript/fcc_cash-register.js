/*-----------------------------------
NEXT STEPS:
* Convert makeChange into a cleaner loop.
FUTURE: refactor enums, optimize
More validation in general (e.g. prevent having fractional nickels)
-----------------------------------*/


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

// FUTURE: replace this with cleaner enum? Combine with denoms? Better ways to handle sorting?
const denomList = Object.freeze(
  ["ONE HUNDRED","TWENTY","TEN","FIVE","ONE","QUARTER","DIME","NICKEL","PENNY"]
  );

/* Helper functions */

function cidToDrawer(cid) {
  // cid in dollars -> drawer object in cents
  let drawer = {};
  cid.forEach(elem => drawer[elem[0]] = dollarsToCents(elem[1]))
  return drawer;
}

function drawerToCid(drawer) {
  // Returns largest to smallest denom (in dollars),
  // omitting denoms with 0 cents
  let cid = [];
  denomList.forEach( (d) => {
    if(drawer[d]>0) {
      //console.log(`${d} ${drawer[d]}`)
      cid.push([d, centsToDollars(drawer[d])])
    }
  })
  return cid;
}

function dollarsToCents(dollars) {
  return Math.round(dollars*100)
}
function centsToDollars(cents) {
  return cents/100;
}

function totalCents(drawer) {
  // FUTURE: move to method on a Drawer object?
  return Object.values(drawer).reduce((a,b) => a+b);
}

function changeForDenom(centsDue,denom,centsDenom) {
  /* TESTS: concept is:
  // changeForDenom(12,"NICKEL",10) is change for 12 cents using 2 nickels
  // return: [2 remainingCentsDue, 10 cents in nickels used]
  // changeForDenom(12,"NICKEL",15) ->
  // return: [2 remainingCentsDue, 10 cents in nickels used]
  changeForDenom(7,"NICKEL",10) -> [2,5]
  */
  if(centsDue<=0) {
    // TODO
  }
  
  let changeOut = 0;
  let remainingCentsDue = 0;
  
  // if we owe a denom and have some of that denom in drawer:
  if(centsDue>=centsDenom) {
    // e.g. 17 centsDue, 10 drawer.NICKEL, 17-10 = 7
    changeOut = centsDenom;
    remainingCentsDue = centsDue-centsDenom;
  }
  else {
    // e.g. 7 centsDue, 10 drawer.NICKEL -> 7-5=2 cents left, 5 cents in changeOut
    // 7%5=2
    
    // 12 centsDue, 15 drawer.NICKEL -> 12-10=2 cents left, 10 cents in changeOut
    // 12%5 = 2
    // centsDue%denoms.NICKEL = remainingCentsDue
    // changeOut.NICKEL = 12-2 = originalCentsDue-remainingCentsDue
    changeOut = centsDue - (centsDue % denoms[denom]);
    remainingCentsDue = centsDue % denoms[denom]
  }
  
  return [remainingCentsDue,changeOut]
}

/* Main logic */

function makeChange(centsDue,drawer) {
  if(centsDue > totalCents(drawer)) {
    return "INSUFFICIENT_FUNDS";
  }
  else if(centsDue === totalCents(drawer)) {
    return "CLOSED";
  }
  
  // Fill this out with amounts due as we go.
  let changeOut = {};
  let remainingCentsDue = centsDue;
  
  // FUTURE: convert into a clean loop
  // Go down list of denoms
  //[centsDue,changeOut[denom]] = changeForDenom(centsDue,denom,drawer.Denom)
  [remainingCentsDue,changeOut["ONE HUNDRED"]] = changeForDenom(remainingCentsDue,"ONE HUNDRED",drawer["ONE HUNDRED"]);
  [remainingCentsDue,changeOut["TWENTY"]] = changeForDenom(remainingCentsDue,"TWENTY",drawer["TWENTY"]);
  [remainingCentsDue,changeOut["TEN"]] = changeForDenom(remainingCentsDue,"TEN",drawer["TEN"]);
  [remainingCentsDue,changeOut["FIVE"]] = changeForDenom(remainingCentsDue,"FIVE",drawer["FIVE"]);
  [remainingCentsDue,changeOut["ONE"]] = changeForDenom(remainingCentsDue,"ONE",drawer["ONE"]);
  [remainingCentsDue,changeOut["QUARTER"]] = changeForDenom(remainingCentsDue,"QUARTER",drawer["QUARTER"]);
  [remainingCentsDue,changeOut["DIME"]] = changeForDenom(remainingCentsDue,"DIME",drawer["DIME"]);
  [remainingCentsDue,changeOut["NICKEL"]] = changeForDenom(remainingCentsDue,"NICKEL",drawer["NICKEL"]);
  
  if(remainingCentsDue>0 && drawer["PENNY"]>=remainingCentsDue) {
    changeOut.PENNY = remainingCentsDue;
    remainingCentsDue = 0;
  }
  if(remainingCentsDue>0) {
    // could not make exact change
    return "INSUFFICIENT_FUNDS";
  }

  return changeOut;
}

function checkCashRegister(price, cash, cid) {
  const drawer = cidToDrawer(cid);
  const centsDue = dollarsToCents(cash-price);
  
  // FUTURE: cleaner handling. I'd like changeDrawer to be consistently a drawer obj.
  const changeDrawer = makeChange(centsDue,drawer);
  if(changeDrawer=="INSUFFICIENT_FUNDS") {
    return {status: "INSUFFICIENT_FUNDS", change: []}
  }
  else if(changeDrawer=="CLOSED") {
    // We *don't* reorder the cid if closed.
    return {status: "CLOSED", change: cid}
  }
  else {
    return{status: "OPEN", change: drawerToCid(changeDrawer)}
  }
}

/* Example */
/*
let cid = [["PENNY", 1.01], ["NICKEL", 2.05], ["DIME", 3.1], ["QUARTER", 4.25], ["ONE", 90], ["FIVE", 55], ["TEN", 20], ["TWENTY", 60], ["ONE HUNDRED", 100]];
let price = 19.5;
let cash = 20;
let out = checkCashRegister(price,cash,cid)
console.log(out);
*/

