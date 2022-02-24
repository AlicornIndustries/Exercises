/*
We could go deep on data structures for the class roster. This is quick-n'-dirty.
Known problems:
* Doesn't store the list sorted alphabetically, has to be explicitly sorted each time
* Similarly, no proper indexing for e.g. "find students in grade 2" without searching whole roster
* Hard to get from student to student ID number

*/


class GradeSchool {


    private _classRoster: StudentByID = {};
    //private _classRoster = new Map<number,Student>(); // experimented with using a map
    private _nextID: number = 0;
    // We could use a UUID or AtomicInteger if we wanted to get funky
    // For now, just an incrementing int.
    // In present state, we don't actually do much with student IDs


    roster() {
        // (I would call this either getRoster or use a proper getter)
        // Format: [1: ['name of student in grade 1','another student in grade 1], 2:[]]

        console.log(Object.entries(this._classRoster))

        // TODO


    }

    add(name: string, grade: number) {
       this._classRoster[this._nextID] = {'name': name, 'grade': grade}
       //this._classRoster.set(this._nextID,{'name':name,'grade':grade}) // the map way to do it
       this._nextID++;
    }

    grade(num: number) {
        // Return alphabetized array of students in grade num
        // Naive solution: loop over _classRoster
        // Looks like return format desired is just array of students' names
        return Object.values(this._classRoster).
            filter(student => student['grade'] === num).
            map(student => student.name).
            sort()
    }
}

interface Student {
    name: string;
    grade: number
}
interface StudentByID {
    [key: number]: Student
}

console.clear()
const school = new GradeSchool();
school.add('Alice',1)
school.add('Bob',2)
school.add('Bertha',2)
school.add('Xerxes',3)
school.roster()


// const myMap = new Map();
// myMap.set('100',{name: 'Alice', grade: 2})
// console.log(myMap)
