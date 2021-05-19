import { Link } from "react-router-dom";

export function ForumTopic({ categoryUuid, name, link }) {
    return (
        <div>
            <Link to={`/${categoryUuid}/${link}`}>{name}</Link>
        </div>
    )
}