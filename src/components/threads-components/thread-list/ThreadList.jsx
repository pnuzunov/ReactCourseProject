import { useState } from "react";
import { useEffect } from "react"
import { getThreadsByTopic } from "../../../services/ForumService";

export function ThreadList(props) {

    const [threads, setThreads] = useState([]);

    useEffect(_ => {
        getThreadsByTopic(props.match.params.topic).then(response => {
            setThreads(response);
        })
    }, [props.match.params.topic]);

    return (
        <div>
            { threads.map(t => <p key={t.name}>{t.name}</p> ) }
        </div>
    )
}