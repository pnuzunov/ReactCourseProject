import { useEffect, useState } from "react";
import { Redirect } from "react-router";
import { Link } from "react-router-dom";
import { getLoggedUser } from "../../../services/AuthService";
import { deleteUser, getUser } from "../../../services/UserService";
import "../../../index.css";
import defaultIcon from "../../../resources/default-user-icon.jpg";

export function UserDetails(props) {

    const [user, setUser] = useState(null);
    const [redirect, setRedirect] = useState(false);

    const loggedUser = getLoggedUser();

    const linkStyle = {
        textDecoration: 'none',
        color: 'white'
    }

    const iconStyle = {
        width: "150px",
        height: "150px"
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
            <div className="container d-float float-left m-5">
                <img style={iconStyle} src={(user && user.image) || defaultIcon} alt="user-img"></img>
                <table className=" d-inline table table-striped col-md-6">
                    <tbody className="">
                        <tr>
                            <th scope="row">ID</th>
                            <td>{user && user.id}</td>
                        </tr>
                        <tr>
                            <th scope="row">Name</th>
                            <td>{user && user.name}</td>
                        </tr>
                        <tr>
                            <th scope="row">Username</th>
                            <td>{user && user.username}</td>
                        </tr>
                    </tbody>
                </table>
                <div className="m-2">
                    {loggedUser && user && (loggedUser.admin || loggedUser.id === user.id) && <button className="btn btn-success"><Link style={linkStyle} to={`/users/edit/${user.id}`}>Edit</Link></button>}
                    {loggedUser && user && (loggedUser.admin || loggedUser.id === user.id) && <div> <button className="btn btn-danger" onClick={onUserDelete}>Delete account</button></div>}
                </div>
            </div>
        </div>
        </>
    )
}