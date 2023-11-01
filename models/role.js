const fs = require('fs');

class Role {
  constructor() {}

  createRole(title) {
    try {
      const roles = this.getRoles();
      const roleId = roles.length > 0 ? roles[roles.length - 1].id + 1 : 1;

      const role = {
        id: roleId,
        title,
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      roles.push(role);
      this.saveRoles(roles);

      return role;
    } catch (error) {
      console.error('Error while creating role:', error);
      return null;
    }
  }

  getRoles() {
    try {
      const data = fs.readFileSync('roles.json', 'utf-8');
      return JSON.parse(data);
    } catch (error) {
      console.error('Error while getting roles:', error);
      return [];
    }
  }

  saveRoles(roles) {
    try {
      fs.writeFileSync('roles.json', JSON.stringify(roles), 'utf-8');
    } catch (error) {
      console.error('Error while saving roles:', error);
    }
  }
}

module.exports = Role;