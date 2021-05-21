import { Link } from "react-router-dom";

export function ThreadListItem({uuid, name}) {


    return(
        <div className="d-flex">
            <Link to={"/threads/" + uuid}>{name}</Link>            
        </div>

    )
}