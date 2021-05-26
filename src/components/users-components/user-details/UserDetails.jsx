import { useEffect, useState } from "react";
import { getUser } from "../../../services/UserService";


export function UserDetails(props) {

    const [user, setUser] = useState(null);

    useEffect(_ => {
        if(props.computedMatch.params.user) {
            getUser(props.computedMatch.params.user).then((response) => {
                setUser(response.data);
            });
        }
    }, [props.computedMatch.params.user])

    return (
        <div>
            <div>
                <span>Name: </span>
                <span>{user && user.name}</span>
            </div>
        </div>
    )
}