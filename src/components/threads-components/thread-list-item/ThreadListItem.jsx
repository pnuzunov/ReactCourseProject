import { Link } from "react-router-dom";

export function ThreadListItem({id, name}) {


    return(
        <div className="d-flex">
            <Link to={"/threads/" + id}>{name}</Link>            
        </div>

    )
}