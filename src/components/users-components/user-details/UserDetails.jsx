import { useEffect, useState } from "react";
import { Redirect } from "react-router";
import { getLoggedUser } from "../../../services/AuthService";
import { deleteUser, getUser } from "../../../services/UserService";


export function UserDetails(props) {

    const [user, setUser] = useState(null);
    const [redirect, setRedirect] = useState(false);

    const loggedUser = getLoggedUser();

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
        <div>
            <div>
                <span>Name: </span>
                <span>{user && user.name}</span>
            </div>
            {loggedUser && loggedUser.admin && <div> <button className="btn btn-danger d-block m-auto" onClick={onUserDelete}>Disable account</button></div>}
        </div>
        </>
    )
}