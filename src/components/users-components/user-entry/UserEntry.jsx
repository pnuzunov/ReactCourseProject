import { Link } from "react-router-dom";

export function UserEntry( {user} ) {

    return (
        <>
        <div className="d-flex">
        <Link to={`/users/${user.id}`}>{user.name}</Link>
        <Link to={`/users/edit/${user.id}`}> | Edit</Link>
        </div>
        </>
    )
}