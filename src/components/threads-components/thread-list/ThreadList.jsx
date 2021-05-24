import { useState } from "react";
import { useEffect } from "react"
import { getThreadsByTopic } from "../../../services/ForumService";
import { ThreadListItem } from "../thread-list-item/ThreadListItem";

export function ThreadList(props) {

    const [threads, setThreads] = useState([]);

    useEffect(_ => {
        getThreadsByTopic(props.match.params.topic).then(response => {
            setThreads(response);
        })
    }, [props.match.params.topic]);

    return (
        <div>
            {threads.length === 0 && <h4>No threads in this topic.</h4>}
            { threads.map(t => <ThreadListItem key={t.name} id={t.id} name={t.name}></ThreadListItem> ) }
        </div>
    )
}