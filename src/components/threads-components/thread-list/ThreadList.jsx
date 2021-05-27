import { useState } from "react";
import { useEffect } from "react"
import { Link } from "react-router-dom";
import { getThreadsByTopic, getTopic } from "../../../services/ForumService";
import { ThreadListItem } from "../thread-list-item/ThreadListItem";
import "../../../index.css";

export function ThreadList(props) {

    const [topic, setTopic] = useState({});
    const [threads, setThreads] = useState([]);

    useEffect(_ => {
        if(props.match.params.topic) {
            getTopic(props.match.params.topic).then((response) => {
                setTopic(response.data);
            })

            getThreadsByTopic(props.match.params.topic).then(response => {
                setThreads(response);
            })
        }

    }, [props.match.params.topic]);

    return (
        <div className="max-height m-3">
            <h2 className="m-3">{topic.name}</h2>
            {threads.length === 0 && 
            <div>
                <h4>No threads in this topic.</h4>
                <p><Link to="/threads/create">Create</Link> a new thread</p>
            </div>
            }
            { threads.map(t => <ThreadListItem key={t.name} id={t.id} name={t.name}></ThreadListItem> ) }
        </div>
    )
}