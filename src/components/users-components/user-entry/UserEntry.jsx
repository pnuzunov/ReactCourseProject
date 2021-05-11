

export function UserEntry( {user} ) {
    return (
        <div>
            <p>{user.name}</p>
            <p>{user.password}</p>
        </div>
    )
}