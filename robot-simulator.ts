export class InvalidInputError extends Error {
  constructor(message: string) {
    super()
    this.message = message || 'Invalid Input'
  }
}

type Direction = 'north' | 'east' | 'south' | 'west'
type Coordinates = [number, number] // x,y, increasing to north and east

export class Robot {
  private _coordinates: Coordinates;
  private _bearing: Direction;


  constructor() {
    this._coordinates = [0,0] // future: take initial coords as optional arg
    this._bearing = 'north'
  }

  get bearing(): Direction {
    return this._bearing;
  }
  get coordinates(): Coordinates {
    return this._coordinates;
  }

  place({direction, x, y}: {x: number; y: number; direction: Direction}) {
    if(!(['north','east','south','west'].includes(direction))) {
      throw new InvalidInputError(`Invalid input: direction: ${direction}, x: ${x}, y:${y}`)
    }

    this._coordinates = [x,y];
    this._bearing = direction;
  }

  turnR() {
    // If Direction were an enum, we could just grab the next one/wrap around
    // Should also just have a turn() function that handles left/right
    switch(this._bearing) {
      case 'north': {
        this._bearing = 'east'
        break;
      }
      case 'east': {
        this._bearing = 'south'
        break;
      }
      case 'south': {
        this._bearing = 'west'
        break;
      }
      case 'west': {
        this._bearing = 'north'
        break;
      }
    }
  }
  turnL() {
    switch(this._bearing) {
      case 'north': {
        this._bearing = 'west'
        break;
      }
      case 'east': {
        this._bearing = 'north'
        break;
      }
      case 'south': {
        this._bearing = 'east'
        break;
      }
      case 'west': {
        this._bearing = 'south'
        break;
      }
    }
  }
  advance() {
    switch(this._bearing) {
      case 'north': {
        this.place({direction: this._bearing, x: this._coordinates[0], y: this._coordinates[1]+1})
        break;
      }
      case 'east': {
        this.place({direction: this._bearing, x: this._coordinates[0]+1, y: this._coordinates[1]})
        break;
      }
      case 'south': {
        this.place({direction: this._bearing, x: this._coordinates[0], y: this._coordinates[1]-1})
        break;
      }
      case 'west': {
        this.place({direction: this._bearing, x: this._coordinates[0]-1, y: this._coordinates[1]})
        break;
      }
    }
  }

  evaluate(instructions: string) {
    //let instructionArray: string[] = instructions.split("");
    for(let instruction of instructions.split("")) {
      switch(instruction) {
        case 'R': {
          this.turnR();
          break;
        }
        case 'L': {
          this.turnL();
          break;
        }
        case 'A': {
          this.advance();
          break;
        }
        default: {
          throw new InvalidInputError(`Invalid input: instructions: ${instructions}`);
        }
      }
    }
  }


  // Helper function, not needed for tests
  logInfo() {
    console.log(`bearing: ${this._bearing}, coords: ${this._coordinates}`)
  }
}
