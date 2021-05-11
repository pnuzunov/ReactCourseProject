import { useEffect, useState } from "react";
import { GetUsers } from "../../../services/UserService";
import { UserEntry } from "../user-entry/UserEntry";


export function UsersList() {
    
    const [users, setUsers] = useState([]);

    useEffect(_ => {
        GetUsers().then(response => {
            setUsers(response.data);
        })
    }, []);

    return (
        <div>
            { users.map(user => <UserEntry key={user.name} user={user} ></UserEntry>) }
        </div> 
    )
}