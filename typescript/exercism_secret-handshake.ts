function commands(num: number): string[] {
    const out: string[] = [];
    const reversed = num & 16; // add to start instead of end of array if reversed

    if(num & 1) {
        reversed ? out.unshift('wink') : out.push('wink'); 
    }
    if(num & 2) {
        reversed ? out.unshift('double blink') : out.push('double blink'); 
    }
    if(num & 4) {
        reversed ? out.unshift('close your eyes') : out.push('close your eyes'); 
    }
    if(num & 8) {
        reversed ? out.unshift('jump') : out.push('jump'); 
    }

    return out;
}

console.clear();
let com = commands(19);
console.log(com)
