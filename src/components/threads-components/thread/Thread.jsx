import { useEffect, useState } from "react"
import { getThread, getThreadPosts } from "../../../services/ForumService";
import { getInvolvedUsers } from "../../../services/UserService";
import { getLoggedUser } from "../../../services/AuthService";
import { ThreadPost } from "../thread-post/ThreadPost";
import { Link } from "react-router-dom";

export function Thread(props) {

    const [currentThread, setCurrentThread] = useState(null);
    const [threadPosts, setThreadPosts] = useState([]);
    const [users, setUsers] = useState([]);
    const [loggedUser, setLoggedUser] = useState(null);

    useEffect(_ => {

        const thread = props.match.params.thread;

        setLoggedUser(getLoggedUser());

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
            console.log(data);
        })

    }, [props.match.params.thread])

    return (
        <div>
            <h2>{currentThread && currentThread.name}</h2>
            {threadPosts
            .sort((a,b) => a.datePosted > b.datePosted ? 1 : -1)
            .map(tp =>
                <ThreadPost key={tp.uuid} loggedUser={loggedUser} user={users.find(user => user.uuid === tp.postedBy)} threadPost={tp}>
                </ThreadPost>
            ) }
            {loggedUser && currentThread && currentThread.open && <Link to="/post">Write a post...</Link>}
            {loggedUser && currentThread && !currentThread.open && <p>This thread is closed. You cannot make new posts here.</p>}
            {!loggedUser && currentThread && currentThread.open && <p>Please <Link to="/login">sign in </Link> to make a new post.</p>}
        </div>
    )
}