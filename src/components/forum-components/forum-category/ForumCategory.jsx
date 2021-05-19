import { ForumTopic } from "../forum-topic/ForumTopic";

export function ForumCategory({ categoryKey, name, topics }) {
 
    return (
        <div>
            <h1>{name}</h1>
            {topics.map(t => <ForumTopic key={t.key} categoryKey={categoryKey} name={t.name} link={t.key}></ForumTopic>)}
        </div>
    )
}