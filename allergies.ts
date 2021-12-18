export class Allergies {
  #allergenIndex: number;
  constructor(allergenIndex: number) {
    this.#allergenIndex = allergenIndex;
  }

  public list(): string[] {
    let allergens: string[] = [];
    // I would probably want an enum of allergens if we were on Serious Mode.
    // If we were repeatedly accessing it, we could generate the array in the constructor and just save it.
    // Learned something new: for-of gets the values ('peanuts'), for-in gets the keys
    for (let allergen of ['eggs','peanuts','shellfish','strawberries','tomatoes','chocolate','pollen','cats']) {
      if(this.allergicTo(allergen)) {
        allergens.push(allergen);
      }
    }
    return allergens;
  
  }

  // tests only check if this is truthy/falsy; it could also be coerced to a bool.
  public allergicTo(allergen: string): number {
    /* bitwise AND
     e.g. allergen is binary 101 (5, 4+1, shellfish+eggs), then 101 & 100 -> 100 is truthy 
    */
    switch(allergen) {
      case 'eggs': {
        return this.#allergenIndex & 1;
      }
      case 'peanuts': {
        return this.#allergenIndex & 2;
      }
        case 'shellfish': {
        return this.#allergenIndex & 4;
      }
        case 'strawberries': {
        return this.#allergenIndex & 8;
      }
        case 'tomatoes': {
        return this.#allergenIndex & 16;
      }
        case 'chocolate': {
        return this.#allergenIndex & 32;
      }
        case 'pollen': {
        return this.#allergenIndex & 64;
      }
        case 'cats': {
        return this.#allergenIndex & 128;
      }
      default: {
        return 0;
      }
    }
  }
}
