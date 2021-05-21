import { useEffect, useState } from "react"
import { getThread, getThreadPosts } from "../../../services/ForumService";
import { getInvolvedUsers } from "../../../services/UserService";
import { ThreadPost } from "../thread-post/ThreadPost";

export function Thread(props) {

    const [currentThread, setCurrentThread] = useState([]);
    const [threadPosts, setThreadPosts] = useState([]);
    const [users, setUsers] = useState([]);

    useEffect(_ => {

        const thread = props.match.params.thread;

        getThreadPosts(thread).then(data => {
            setThreadPosts(data);
        })
        .then( _ => {
            getInvolvedUsers(threadPosts)
                .then(data => {
                    setUsers(data);
                });
        })

        getThread(thread).then(data => {
            setCurrentThread(data);
        })


    }, [props.match.params.thread])

    return (
        <div>
            <h2>{currentThread.name}</h2>
            {threadPosts.map(tp =>
                <ThreadPost key={tp.uuid} user={users.find(user => user.uuid === tp.postedBy)?.name} content={tp.content}>
                </ThreadPost>
            ) }
        </div>
    )
}