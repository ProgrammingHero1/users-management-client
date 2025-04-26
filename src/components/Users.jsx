import React, { use, useState } from 'react';

const Users = ({ usersPromise }) => {
    const initialUsers = use(usersPromise);
    const [users, setUser] = useState(initialUsers)
    console.log(users);


    const handleAddUser = e => {
        e.preventDefault();
        const name = e.target.name.value;
        const email = e.target.email.value;
        const user = { name, email }
        console.log(user);

        // create user in the server

        fetch('http://localhost:3000/users', {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(user)
        })
            .then(res => res.json())
            .then(data => {
                console.log('new users from server', data);
                const newUsers = [...users, data];
                setUser(newUsers);
                e.target.reset();
            })

    }

    return (
        <div>
            <form onSubmit={handleAddUser}>
                <input name='name' type="text" />
                <br />
                <input name='email' type="email" />
                <br />
                <input type="submit" value="Add User" />
            </form>

            <div>
                {
                    users.map(user => <p key={user.id}>{user.name} : {user.email} <button>X</button></p>)
                }
            </div>
        </div>
    );
};

export default Users;