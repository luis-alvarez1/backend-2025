export class UserEntity {
    users = [
        { id: 1, name: "Luis", age: 23 },
        { id: 2, name: "Pepito", age: 39 },
        { id: 3, name: "Juanita", age: 25 },
    ];

    findOne(id) {
        return this.users.find((user) => user.id === id);
    }

    findAll() {
        return this.users;
    }

    create(user) {
        if (!user.id) {
            const newId = this.findAll().length + 1;
            user.id = newId;
        }
        this.users.push(user);
        return this.findOne(user.id);
    }

    update(id, user) {
        const userDb = this.findOne(id);

        this.users = this.users.filter((u) => u.id !== id);

        const updatedUser = {
            ...userDb,
            ...user,
        };
        return this.create(updatedUser);
    }

    delete(id) {
        this.users = this.users.filter((u) => u.id !== id);
        return "User Deleted";
    }
}
