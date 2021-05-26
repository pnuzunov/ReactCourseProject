import { useEffect, useState } from "react";
import { Redirect } from "react-router";
import { Link } from "react-router-dom";
import { getLoggedUser, logout } from "../../../services/AuthService";

export function Navigation() {

    const [redirect, setRedirect] = useState(false);
    const [loggedUser, setLoggedUser] = useState(null);

    useEffect(_ => {
        setLoggedUser(getLoggedUser());
    }, [])

    const onLogout = () => {
        if(getLoggedUser()) {
            logout();
            setLoggedUser(null);
            setRedirect(true);
        }
    }

    document.addEventListener('loggedIn', function() {
        setLoggedUser(getLoggedUser());
      });

    return (
        <>
        {redirect && <Redirect to="/"></Redirect>}
        <div>
            <nav className="navbar navbar-expand-lg navbar-light bg-light">
                    <span className="navbar-brand">Forum</span>
                    <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>

                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav mr-auto">
                        <li className="nav-item active">
                            <Link className="nav-link" to="/">Home</Link>
                        </li>
                        {loggedUser && loggedUser.admin && <li className="nav-item active">
                            <Link className="nav-link" to="/users">Users</Link>
                        </li>}
                        {loggedUser && <li className="nav-item active">
                            <Link className="nav-link" to={`/users/${loggedUser.id}`}>Account</Link>
                        </li>}
                        {!loggedUser && <li className="nav-item active">
                            <Link className="nav-link" to="/login">Sign In</Link>
                        </li>}
                        {loggedUser && <li className="nav-item active">
                            <Link className="nav-link" to="" onClick={onLogout}>Sign Out</Link>
                        </li>}
                        </ul>
                    </div>
            </nav>
        </div>
        </>
     )
}