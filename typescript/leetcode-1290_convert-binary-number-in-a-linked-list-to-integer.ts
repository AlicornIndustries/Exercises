class ListNode {
     val: number
    next: ListNode | null
    constructor(val?: number, next?: ListNode | null) {
        this.val = (val===undefined ? 0 : val)
        this.next = (next===undefined ? null : next)
    }
}

/* This is most significant bit first (100->4, not 1). That makes it a bit trickier.
If it were least-first, we could just traverse, incrementing power by 1 each time and summing/exponentiating.
Here, I don't think we can know the correct power to assign a digit before we get to the end of the list.
Naive: store intermediate representation as a string?


*/
function getDecimalValue(node: ListNode): number {
    let str = '';
    while(node) {
        str+=node.val;
        node = node.next;
    }
    return parseInt(str,2);
}

/* Testing */
// l1 = 101 in binary, 5 in decimal
const l1 = new ListNode(1,
    new ListNode(0,
    new ListNode(0,null)))
const out = getDecimalValue(l1);
console.log(out);

// Old least significant first way
// function getDecimalValue(node: ListNode): number {
    // let num = node.val;
    // let power = 1;
    // while(node.next) {
        // node = node.next;
        // num += (node.val)*(2**power);
        // power++;
    // }
    // return num;
// }
