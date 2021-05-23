import { ForumTopic } from "../forum-topic/ForumTopic";
import "../forum-category/ForumCategory.css";

export function ForumCategory({ categoryId, name, topics }) {
 
    return (
        <div className="forum-category">
            <h1>{name}</h1>
            {topics.map(t =>
                    <ForumTopic key={t.key}
                                categoryId={categoryId} 
                                name={t.name}
                                link={t.id}>
                    </ForumTopic> ) }
        </div>
    )
}