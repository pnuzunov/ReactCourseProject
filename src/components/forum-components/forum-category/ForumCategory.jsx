import { ForumTopic } from "../forum-topic/ForumTopic";

export function ForumCategory({ categoryUuid, name, topics }) {
 
    return (
        <div>
            <h1>{name}</h1>
            {topics.map(t => <ForumTopic key={t.key} categoryUuid={categoryUuid} name={t.name} link={t.uuid}></ForumTopic>)}
        </div>
    )
}