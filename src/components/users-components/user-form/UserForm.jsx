import { useState } from "react";
import { useEffect } from "react"
import { getUser } from "../../../services/UserService";


export function UserForm(props) {

    const [user, setUser] = useState({id: ''});

    useEffect(_ => {
        if(props.computedMatch.params.user) {
            getUser(props.computedMatch.params.user).then((response) => {
                setUser(response.data);
            })
        }
    }, [props.computedMatch.params.user])

    return (
        <div>
            <p>Edit user {user.name}</p>
        </div>
    )
}