const fs = require('fs');

class User {
    constructor(id, email, password, firstName, lastName, roleId) {
        this.id = id;
        this.email = email;
        this.password = password;
        this.firstName = firstName;
        this.lastName = lastName;
        this.roleId = roleId;
    }
    get fullName() {
        return `${this.firstName} ${this.lastName}`
    }
}

module.exports = User;