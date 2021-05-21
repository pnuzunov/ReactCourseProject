import { ForumTopic } from "../forum-topic/ForumTopic";
import "../forum-category/ForumCategory.css";

export function ForumCategory({ categoryUuid, name, topics }) {
 
    return (
        <div className="forum-category">
            <h1>{name}</h1>
            {topics.map(t =>
                    <ForumTopic key={t.key}
                                categoryUuid={categoryUuid} 
                                name={t.name}
                                link={t.uuid}>
                    </ForumTopic> ) }
        </div>
    )
}