/*

Finding the best data structure for _classRoster was tricky, and I'm not satisfied with what I have.
Ideally, I want:
* Constant time look-up of a specific student by some sort of student ID
* Easy access to "students in grade X" without iterating across all students
* Clean support for students moving between grades
* Some sort of index for fast lookup (this would definitely require extra setup and a more intense structure)

*/


export class GradeSchool {


    private _classRoster: StudentByID = {};
    private _nextID: number = 0;
    // We could use a UUID or AtomicInteger?? if we wanted to get funky
    // For now, just an incrementing int.
    // In present state, we don't actually do much with student IDs, but just referring to students
    // by name and grade would cause problems later if we wanted to add support for multiple kids with same name

    roster() {
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
        const id: number = this.getStudentsID(name)       
        if(id >= 0) {
            // If student with name already in roster, change their grade instead
            this._classRoster[id]['grade'] = grade
        } else {
            // Create a new student
            this._classRoster[this._nextID] = {'name': name, 'grade': grade}
            this._nextID++
        }
    }

    grade(num: number) {
        // Return alphabetized array of student (names) in grade num
        return Object.values(this._classRoster).
            filter(student => student['grade'] === num).
            map(student => student.name).
            sort()
    }
    
    getStudentsID(name: string): number {
        // Given the data structure, I don't think we can do this without O(n) looping over each student
        // (if we had used name as a "primary key" instead of a unique student ID, we could)

        // -1 if student with name not on _classRoster
        const student = Object.entries(this._classRoster).find(student => student[1]['name'] === name)
        // Another flaw of my data structure: this isn't really a Student, as defined by the interface
        // it's an array [studentID, {name,grade}] in other words, [studentID, student]
        if(student !== undefined) {
            return +student[0] // learned that object keys are always strings, hence conversion to number
        }
        else {
            return -1
        }
    }
}

interface Student {
    name: string;
    grade: number
}
interface StudentByID {
    [key: number]: Student
}
