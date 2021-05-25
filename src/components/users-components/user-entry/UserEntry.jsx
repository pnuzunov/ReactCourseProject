import { useState } from "react";
import { Link, Redirect } from "react-router-dom";
import { getLoggedUser } from "../../../services/AuthService";
import { deleteUser } from "../../../services/UserService";


export function UserEntry( {user} ) {

    const [state, setState] = useState(null);

    const loggedUser = getLoggedUser();

    const onUserDelete = () => {
        deleteUser(user.id).then(_ => {
            setState(user);
        });

    }

    return (
        <>
        {state && <Redirect to="/users"></Redirect>}
        <div className="d-flex">
            <Link to={`/users/edit/${user.id}`}>{user.name}</Link>
            {loggedUser && loggedUser.admin && <div> <button className="nav-link" onClick={onUserDelete}>Delete user</button></div>}
        </div>
        </>
    )
}