import { Link } from "react-router-dom";

export function ForumTopic({ categoryKey, name, link }) {
    return (
        <div>
            <Link to={`/${categoryKey}/${link}`}>{name}</Link>
        </div>
    )
}