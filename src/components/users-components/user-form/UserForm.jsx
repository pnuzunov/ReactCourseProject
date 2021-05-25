import { useState } from "react";
import { useEffect } from "react"
import { Redirect } from "react-router";
import { Link } from "react-router-dom";
import { getLoggedUser } from "../../../services/AuthService";
import { getUser, saveUser } from "../../../services/UserService";


export function UserForm(props) {

    const [user, setUser] = useState({id: '', name: '', username: '', password: '', admin: false});
    const [error, setError] = useState({message: null});
    const [redirect, setRedirect] = useState(false);

    const loggedUser = getLoggedUser();
    let rePassword = "";

    useEffect(_ => {
        if(props.computedMatch.params.user) {
            getUser(props.computedMatch.params.user).then((response) => {
                setUser(response.data);
            })
        }
    }, [props.computedMatch.params.user])

    const onInputChanged = (e) => {
        if(e.target.name !== "rePassword") {
            setUser((prevState) => ({
                ...prevState,
                [e.target.name]: e.target.value
            }));
        } else {
            rePassword = e.target.value;
        }
    }

    const onCheckboxChanged = (e) => {
        setUser((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.checked
        }));
    }

    const onFormSubmit = (e) => {
        e.preventDefault();
        if(user.password !== rePassword) {
            setError({message: "Passwords do not match!"});
            return;
        }

        saveUser(user).then(_ => {
            setRedirect(true);
        });
    }

    return (
        <>
        {redirect && <Redirect to={`/users`}></Redirect>}
        <div className="user-form-title">
            <h4>{user.id === "" ? "Registration form" : "Edit user details"}</h4>
        </div>
        <div className="user-form-wrapper">           
            <form className="user-form" onSubmit={onFormSubmit}>
                <div className="form-group">
                        <label htmlFor="name">Username: </label>
                        <input type="text" id="username" name="username" className="form-control" value={user.username} required onChange={onInputChanged}/>
                </div>
                <div className="form-group">
                        <label htmlFor="name">Name: </label>
                        <input type="text" id="name" name="name" className="form-control" value={user.name} required onChange={onInputChanged}/>
                </div>
                <div className="form-group">
                        <label htmlFor="name">Password: </label>
                        <input type="password" id="password" name="password" className="form-control" autoComplete="new-password" required onChange={onInputChanged}/>
                </div>
                <div className="form-group">
                        <label htmlFor="name">Repeat Password: </label>
                        <input type="password" id="rePassword" name="rePassword" className="form-control" required onChange={onInputChanged}/>
                </div>
                {loggedUser && loggedUser.admin && 
                    <div className="form-group">
                        <label htmlFor="admin">Administrator</label>
                        <input type="checkbox" id="admin" name="admin" className="form-control" checked={user.admin} onChange={onCheckboxChanged}/>
                    </div>
                }
                {error && error.message &&
                <div className="text-danger">
                    <span>{error.message}</span>
                </div>}
                <button className="btn btn-primary">{user.id === "" ? "Register" : "Save changes"}</button>
                <Link className="btn btn-disabled" to="/">Cancel</Link>
                <div>
                </div>                
            </form>
        </div>
        </>
    )
}
