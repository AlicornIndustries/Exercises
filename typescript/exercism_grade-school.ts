// TODO: add check in GradeSchool.add() to prevent adding a student with the same name as another student



/*

Finding the best data structure for _classRoster was tricky, and I'm not satisfied with what I have.
Ideally, I want:
* Constant time look-up of a specific student by some sort of student ID
* Easy access to "students in grade X" without iterating across all students
* Clean support for students moving between grades
* Some sort of index for fast lookup (this would definitely require extra setup and a more intense structure)

*/


class GradeSchool {


    private _classRoster: StudentByID = {};
    private _nextID: number = 0;
    // We could use a UUID or AtomicInteger?? if we wanted to get funky
    // For now, just an incrementing int.
    // In present state, we don't actually do much with student IDs, but just referring to students
    // by name and grade means we can't have two Steves (although tests actually expect there to be only 1)


    roster() {
        // return format: {1: ['name of student in grade 1','another student in grade 1], 2:[]}
        /* Essentially: for each student:
        1. if out has a subarray for student's grade, put them there
        2. else make a new subarray in out and put student there

        */

        const out: {[key: number]: [string]} = {}
        Object.values(this._classRoster).forEach(student => {
            if(student.grade in out) {
                out[student.grade].push(student.name)
            } else {
                // (out as any) avoids the implicit 'any' type, but seems awkward
                (out as any)[student.grade] = [].concat(student.name)
            }
        })

        // Sort alphabetically in each grade
        Object.keys(out).forEach(grade => (out as any)[grade].sort())

        return out;
    }

    add(name: string, grade: number) {
       this._classRoster[this._nextID] = {'name': name, 'grade': grade}
       this._nextID++;
    }

    grade(num: number) {
        // Return alphabetized array of student (names) in grade num
        // Naive solution: loop over _classRoster
        return Object.values(this._classRoster).
            filter(student => student['grade'] === num).
            map(student => student.name).
            sort()
    }

    tester() {
        console.log(this._classRoster)
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
//school.tester()
console.log(school.roster())
