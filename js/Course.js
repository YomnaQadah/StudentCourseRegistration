class Course {

    constructor(id, name) {

        this.id = id;
        this.name = name;

    }

    displayInfo() {

        return `ID: ${this.id} - Course: ${this.name}`;

    }

}