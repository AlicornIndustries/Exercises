class ListNode {
     val: number
    next: ListNode | null
    constructor(val?: number, next?: ListNode | null) {
        this.val = (val===undefined ? 0 : val)
        this.next = (next===undefined ? null : next)
    }
}

function addTwoNumbers(l1: ListNode, l2: ListNode): ListNode | null {
    let num1 = listToInt(l1);
    let num2 = listToInt(l2);
    return intToList(num1+num2);
};

function listToInt(node: ListNode): number {
    let num = node.val;
    let power = 1;
    while(node.next) {
        node = node.next;
        num += (node.val)*(10**power);
        power++;
    }

    return num;
}

function intToList(num: number | bigint): ListNode {
    // A few ways to do this: could go digit-by-digit by dividing by 10 to avoid toString
    let str = num.toString(10);
    let node = new ListNode(+str[0],null);

    for(let i=1; i<str.length; i++) {
        let newNode = new ListNode(+str[i],node);
        node = newNode;
    }
    return node;
}

/* Testing */
console.clear();

const l1 = new ListNode(2,
    new ListNode(4,
    new ListNode(3,null)))
const l2 = new ListNode(5,
    new ListNode(6,
    new ListNode(4,null)))
//let out = 0;
//out = listToInt(l1);
//console.log(out);

//let out = intToList(243);
//console.log(out);
//console.log(listToInt(out))





/*
Naive: traverse each linked list, convert each to int, add those, convert that to list, return.
Optimization: instead add as you go (adding each node in l1 to node in l2, storing in l3 node).
    Omits intermediate representation (just need a carry digit)

    Optimization would also help us handle large numbers. Currently, 1000000000000000000000000000001 fails.
*/
