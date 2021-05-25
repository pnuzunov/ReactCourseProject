import { Link } from "react-router-dom";


export function UserEntry( {user} ) {
    return (
        <div>
            <Link to={`/users/edit/${user.id}`}>{user.name}</Link>
        </div>
    )
}