// Clase base para los Usuarios
class User {
    constructor(username, role) {
        this.username = username;
        this.role = role;
    }

    getDetails() {
        return `${this.username} - Rol: ${this.role}`;
    }
}

// Subclases de usuarios
class AdminUser extends User {
    constructor(username) {
        super(username, 'Administrador');
    }
}

class RegularUser extends User {
    constructor(username) {
        super(username, 'Usuario');
    }
}

class GuestUser extends User {
    constructor(username) {
        super(username, 'Invitado');
    }
}

// Factory para crear usuarios
class UserFactory {
    static createUser(role, username) {
        switch (role) {
            case 'admin':
                return new AdminUser(username);
            case 'user':
                return new RegularUser(username);
            case 'guest':
                return new GuestUser(username);
            default:
                throw new Error('Rol de usuario no válido');
        }
    }
}

// Singleton para gestionar todos los usuarios
class UserManager {
    constructor() {
        if (UserManager.instance) {
            return UserManager.instance;
        }
        this.users = [];
        UserManager.instance = this;
    }

    addUser(user) {
        this.users.push(user);
    }

    getUsers() {
        return this.users;
    }
}

// Función para agregar un usuario
function addUser(event) {
    event.preventDefault();
    const username = document.getElementById('username').value;
    const userRole = document.getElementById('userRole').value;

    const newUser = UserFactory.createUser(userRole, username);
    const manager = new UserManager();
    manager.addUser(newUser);
    displayUsers(manager.getUsers());
    document.getElementById('userForm').reset();
}

// Función para mostrar los usuarios
function displayUsers(users) {
    const userList = document.getElementById('users');
    userList.innerHTML = ''; // Limpiar la lista antes de mostrar

    users.forEach(user => {
        const li = document.createElement('li');
        li.textContent = user.getDetails();
        userList.appendChild(li);
    });
}

// Event Listener para el formulario
document.getElementById('userForm').addEventListener('submit', addUser);
