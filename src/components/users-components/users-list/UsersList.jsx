import { useEffect, useState } from "react";
import { getUsers } from "../../../services/UserService";
import { UserEntry } from "../user-entry/UserEntry";
import "../users-list/UserList.css";

export function UsersList() {
    
    const [users, setUsers] = useState([]);

    useEffect(_ => {
        getUsers().then(response => {
            setUsers(response.data);
        })
    }, []);

    return (
        <div className="user-list">
            <h2 className="m-5"> Users </h2>
            { users.map(user => <UserEntry key={user.name} user={user} ></UserEntry>) }
        </div> 
    )
}