import { useEffect, useState } from "react";
import { Redirect } from "react-router";
import { Link } from "react-router-dom";
import { getLoggedUser } from "../../../services/AuthService";
import { deleteUser, getUser } from "../../../services/UserService";
import "../../../index.css";

export function UserDetails(props) {

    const [user, setUser] = useState(null);
    const [redirect, setRedirect] = useState(false);

    const loggedUser = getLoggedUser();

    const linkStyle = {
        textDecoration: 'none',
        color: 'white'
    }

    useEffect(_ => {
        if(props.computedMatch.params.user) {
            getUser(props.computedMatch.params.user).then((response) => {
                setUser(response.data);
            });
        }
    }, [props.computedMatch.params.user])

    const onUserDelete = () => {
        deleteUser(user.id).then(_ => {
            setRedirect(true);
        });

    }

    return (
        <>
        {redirect && <Redirect to="/users"></Redirect>}
        <div className="max-height">
            <div>
                <span>Name: </span>
                <span>{user && user.name}</span>
            </div>
            {loggedUser && user && (loggedUser.admin || loggedUser.id === user.id) && <button className="btn btn-success"><Link style={linkStyle} to={`/users/edit/${user.id}`}>Edit</Link></button>}
            {loggedUser && user && (loggedUser.admin || loggedUser.id === user.id) && <div> <button className="btn btn-danger" onClick={onUserDelete}>Delete account</button></div>}
        </div>
        </>
    )
}