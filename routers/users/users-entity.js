export class UserEntity {
    users = [
        {
            id: 1,
            name: "Luis",
        },
        {
            id: 2,
            name: "Juanito",
        },
        {
            id: 3,
            name: "Pedrito",
        },
    ];

    // getAll

    getAll() {
        return this.users;
    }

    // get

    get(id) {
        return this.users.find((u) => u.id === id);
    }

    // create

    create(user) {
        const newUser = { name: user.name, id: this.users.length + 1 };
        this.users.push(newUser);
        return newUser;
    }

    // update

    update(id, userData) {
        const newUsers = this.users.filter((u) => u.id !== id);

        const updated = { id: id, name: userData.name };
        newUsers.push(updated);

        this.users = newUsers;

        return updated;
    }
    // delete

    delete(id) {
        this.users = this.users.filter((u) => u.id !== id);
    }
}
