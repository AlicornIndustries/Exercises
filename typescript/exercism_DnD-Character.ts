export class DnDCharacter {
    strength: number;
    dexterity: number;
    constitution: number;
    intelligence: number;
    wisdom: number;
    charisma: number;
    hitpoints: number;


    public static generateAbilityScore(): number {
        return rollDice(4,6,1); // 4d6 drop lowest
    }

    public static getModifierFor(abilityValue: number): number {
        return Math.floor((abilityValue - 10)/2)
    }

    constructor() {
        this.strength = DnDCharacter.generateAbilityScore();
        this.dexterity = DnDCharacter.generateAbilityScore();
        this.constitution = DnDCharacter.generateAbilityScore();
        this.intelligence = DnDCharacter.generateAbilityScore();
        this.wisdom = DnDCharacter.generateAbilityScore();
        this.charisma = DnDCharacter.generateAbilityScore();

        this.hitpoints = 10 + DnDCharacter.getModifierFor(this.constitution)
    }
}

const rollDie = function(faces: number) {
    return Math.floor(Math.random()*faces)+1
}

const rollDice = function(dice: number, faces: number, drop?: number) {
    let results = [];
    for(let i=0; i<dice; i++) {
        results.push(rollDie(faces))
    }
    if(!drop) {
        return results.reduce((prev,curr) => prev+curr);
    }
    else {
        // Could do results.sort((a,b) => b-a), splice, reduce
        results = results.sort((a,b) => b-a)
        let out = 0;
        for(let i=0; i<dice-drop; i++) {
            out += results[i]
        }
        return out;
    }
    
}


console.clear();
const a = new DnDCharacter();
console.log(a);
