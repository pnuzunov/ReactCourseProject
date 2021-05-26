import { Redirect } from "react-router";
import { getLoggedUser } from "../services/AuthService.js";

export function AuthenticatedRoute(props) {
    const user = getLoggedUser();

    if (props.admin && user && user.admin) {
        return <props.component {...props} />;
    }

    if(props.sameUser && user && (user.id === props.computedMatch.params.user || user.admin)) {
        return <props.component {...props} />;
    }

    if (!props.admin && !props.sameUser && user) {
        return <props.component {...props} />;
    }

    return <Redirect to='/login' />;
}