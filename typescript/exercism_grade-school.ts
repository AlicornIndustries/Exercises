/*
Next steps: figure out how we want to do student IDs/data structure


*/


class GradeSchool {


    private classRoster: object = {}; // {  id:{name,age} } ?? (Exercise doesn't ask for ID)
    private nextID: number = 0;
    // We could use a UUID if we wanted to get funky
    // For now, just an incrementing int.





    roster() {
        // (I would call this either getRoster or use a proper getter)
        throw new Error('Remove this statement and implement this function')
    }

    add(name: string, grade: number) {
       // this.classRoster[nextID] = {'name': name, 'grade': grade}
    }

    grade(num: number) {
        // Return alphabetized array of students in grade num


        throw new Error('Remove this statement and implement this function')
    }
}

interface Student {
    id: number;
    name: string;
    grade: string
}
