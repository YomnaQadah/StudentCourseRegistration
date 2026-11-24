class Registration {

    constructor() {

        this.students = [];
        this.courses = [];
        this.registrations = [];

    }


    // Add student

    addStudent(student) {

        const exists = this.students.find(
            s => s.id === student.id
        );

        if (exists) {

            return "Student ID already exists!";

        }

        this.students.push(student);

        return "Student added successfully!";

    }


    // Add course

    addCourse(course) {

        const exists = this.courses.find(
            c => c.id === course.id
        );

        if (exists) {

            return "Course ID already exists!";

        }

        this.courses.push(course);

        return "Course added successfully!";

    }


    // Display available courses

    displayCourses() {

        return this.courses;

    }


    // Register student in course

    registerStudent(studentId, courseId) {

        const student = this.students.find(
            s => s.id === studentId
        );

        const course = this.courses.find(
            c => c.id === courseId
        );


        if (!student) {

            return "Student not found!";

        }

        if (!course) {

            return "Course not found!";

        }


        const exists = this.registrations.find(

            r => r.studentId === studentId &&
                 r.courseId === courseId

        );


        if (exists) {

            return "Student is already registered in this course!";

        }


        this.registrations.push({

            studentId: studentId,
            courseId: courseId

        });


        return "Registration successful!";

    }


    // Display courses registered by a student

    displayStudentCourses(studentId) {

        const student = this.students.find(
            s => s.id === studentId
        );

        if (!student) {

            return [];

        }


        const studentRegistrations = this.registrations.filter(

            r => r.studentId === studentId

        );


        const courses = studentRegistrations.map(

            r => this.courses.find(
                c => c.id === r.courseId
            )

        );


        return courses.filter(course => course !== undefined);

    }

}