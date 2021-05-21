import { Redirect } from "react-router";
import { getLoggedUser } from "../services/AuthService.js";

export function AuthenticatedRoute(props) {
    const user = getLoggedUser();

    if (props.admin && user && user.admin) {
        return <props.component {...props} />;
    }

    if (!props.admin && user) {
        return <props.component {...props} />;
    }

    return <Redirect to='/login' />;
}