import { Link } from "react-router-dom";

export function ForumTopic({ categoryUuid, name, link }) {
    return (
        <div className="d-block p-2">
            <Link to={`/topics/${categoryUuid}/${link}`}>{name}</Link>
        </div>
    )
}