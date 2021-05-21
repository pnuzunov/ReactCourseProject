import { useEffect, useState } from "react";
import { Redirect } from "react-router";
import { getLoggedUser, logout } from "../../../services/AuthService";

export function Navigation() {

    const [loggedUser, setLoggedUser] = useState([]);
    const [redirect, setRedirect] = useState(false);

    useEffect(_ => {
        setLoggedUser(getLoggedUser());
    }, []);

    const onLogout = () => {
        if(getLoggedUser()) {
            logout();
            setRedirect(true);
        }
    }

    return (
        <>
        {redirect && <Redirect to="/"></Redirect>}
        <div>
            <nav className="navbar navbar-expand-lg navbar-light bg-light">
                    <a className="navbar-brand" href="#">Navbar</a>
                    <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>

                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav mr-auto">
                        <li className="nav-item active">
                            <a className="nav-link" href="/">Home <span className="sr-only">(current)</span></a>
                        </li>
                        {loggedUser && loggedUser.admin && <li className="nav-item active">
                            <a className="nav-link" href="/users">Users</a>
                        </li>}
                        {!loggedUser && <li className="nav-item active">
                            <a className="nav-link" href="/login">Sign In</a>
                        </li>}
                        {loggedUser && <li className="nav-item active">
                            <a className="nav-link" href="" onClick={onLogout}>Sign Out</a>
                        </li>}
                        </ul>
                    </div>
            </nav>
        </div>
        </>
     )
}