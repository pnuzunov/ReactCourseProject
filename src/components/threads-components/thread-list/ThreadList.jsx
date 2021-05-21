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
            { threads.map(t => <ThreadListItem key={t.name} uuid={t.uuid} name={t.name}></ThreadListItem> ) }
        </div>
    )
}