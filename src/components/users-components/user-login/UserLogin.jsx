import { useState } from "react";
import { Redirect } from "react-router";
import { Link } from "react-router-dom";
import { login } from "../../../services/AuthService";

export function UserLogin() {

    const [userData, setUserData] = useState(null);
    const [redirect, setRedirect] = useState(false);
    const [error, setError] = useState('');

    const onInputChange = (event) => {
        event.persist();

        setUserData((prevState) => ({
            ...prevState,
            [event.target.name]: event.target.value
        }));
    }

    const onFormSubmit = (event) => {
        event.preventDefault();

        login(userData).then(_ => {
            setRedirect(true);
        })
        .catch(err => setError(err.message));
    }

    return (
        <>
        { redirect && <Redirect to='/' /> }
        <div className="login-form-wrapper">           
            <form className="login-form" onSubmit={onFormSubmit}>
            { error && <span className="text-danger">{error}</span>}
                <div className="form-group">
                    <label htmlFor="username">Username: </label>
                    <input type="text" id="username" name="username" className="form-control" onChange={onInputChange} required/>
                </div>
                <div className="form-group">
                    <label htmlFor="password">Password: </label>
                    <input type="password" id="password" name="password" className="form-control" onChange={onInputChange} required/>
                </div>
                <button className="btn btn-primary">Sign In</button>
                <div>
                    <Link to="/register">Dont have an account yet?</Link>
                </div>                
            </form>
        </div>
        </>
    )
}