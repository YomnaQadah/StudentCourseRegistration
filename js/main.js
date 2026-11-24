// Create the system

const system = new Registration();


// HTML elements

const studentForm = document.getElementById("studentForm");

const courseForm = document.getElementById("courseForm");

const registrationForm = document.getElementById("registrationForm");


// Add student

studentForm.addEventListener("submit", function(event) {

    event.preventDefault();

    const id = Number(document.getElementById("studentId").value);

    const name = document.getElementById("studentName").value.trim();


    if (!Number.isInteger(id) || id <= 0 || !name) {

        alert("Please enter a valid student ID and name.");

        return;

    }


    const student = new Student(id, name);

    const message = system.addStudent(student);

    alert(message);


    if (message === "Student added successfully!") {

        studentForm.reset();

        displayStudents();

        updateDashboard();

    }

});


// Display students

function displayStudents() {

    const studentsList = document.getElementById("studentsList");

    const studentSelect = document.getElementById("studentSelect");

    const registeredStudentSelect = document.getElementById("registeredStudentSelect");


    studentsList.innerHTML = "";

    studentSelect.innerHTML = '<option value="">Choose Student</option>';

    registeredStudentSelect.innerHTML = '<option value="">Select Student</option>';


    system.students.forEach(student => {

        studentsList.innerHTML += `

            <div class="item">

                ID: ${student.id} | Name: ${student.name}

            </div>

        `;


        studentSelect.innerHTML += `

            <option value="${student.id}">

                ${student.name}

            </option>

        `;


        registeredStudentSelect.innerHTML += `

            <option value="${student.id}">

                ${student.name}

            </option>

        `;

    });

}


// Add course

courseForm.addEventListener("submit", function(event) {

    event.preventDefault();


    const id = Number(document.getElementById("courseId").value);

    const name = document.getElementById("courseName").value.trim();


    if (!Number.isInteger(id) || id <= 0 || !name) {

        alert("Please enter a valid course ID and name.");

        return;

    }


    const course = new Course(id, name);

    const message = system.addCourse(course);

    alert(message);


    if (message === "Course added successfully!") {

        courseForm.reset();

        displayCourses();

        updateDashboard();

    }

});


// Display courses

function displayCourses() {

    const coursesList = document.getElementById("coursesList");

    const courseSelect = document.getElementById("courseSelect");


    coursesList.innerHTML = "";

    courseSelect.innerHTML = '<option value="">Choose Course</option>';


    system.displayCourses().forEach(course => {

        coursesList.innerHTML += `

            <div class="item">

                ID: ${course.id} | Course: ${course.name}

            </div>

        `;


        courseSelect.innerHTML += `

            <option value="${course.id}">

                ${course.name}

            </option>

        `;

    });

}


// Register student

registrationForm.addEventListener("submit", function(event) {

    event.preventDefault();


    const studentId = Number(

        document.getElementById("studentSelect").value

    );


    const courseId = Number(

        document.getElementById("courseSelect").value

    );


    if (!studentId || !courseId) {

        alert("Please select a student and a course.");

        return;

    }


    const message = system.registerStudent(studentId, courseId);

    alert(message);


    if (message === "Registration successful!") {

        registrationForm.reset();

        updateDashboard();

    }

});


// Display student's registered courses

document.getElementById("registeredStudentSelect")

.addEventListener("change", function() {

    const studentId = Number(this.value);

    const result = document.getElementById("registeredCourses");


    result.innerHTML = "";


    if (!studentId) {

        return;

    }


    const student = system.students.find(

        s => s.id === studentId

    );


    const courses = system.displayStudentCourses(studentId);


    result.innerHTML = `<h3>Courses registered by ${student.name}</h3>`;


    if (courses.length === 0) {

        result.innerHTML += `

            <div class="item">

                No registered courses.

            </div>

        `;

        return;

    }


    courses.forEach(course => {

        result.innerHTML += `

            <div class="item">

                ID: ${course.id} | Course: ${course.name}

            </div>

        `;

    });

});


// Update dashboard

function updateDashboard() {

    document.getElementById("studentCount").textContent =

        system.students.length;


    document.getElementById("courseCount").textContent =

        system.courses.length;


    document.getElementById("registrationCount").textContent =

        system.registrations.length;

}