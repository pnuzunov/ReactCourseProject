import { Link } from "react-router-dom";

export function ForumTopic({ categoryId, name, link }) {
    return (
        <div className="d-block p-2">
            <Link to={`/topics/${link}`}>{name}</Link>
        </div>
    )
}