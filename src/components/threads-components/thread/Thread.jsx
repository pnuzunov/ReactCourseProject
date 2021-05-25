import { useEffect, useState } from "react"
import { deleteThread, getThread, getThreadPosts, saveThreadPost } from "../../../services/ForumService";
import { getUsers } from "../../../services/UserService";
import { getLoggedUser } from "../../../services/AuthService";
import { ThreadPost } from "../thread-post/ThreadPost";
import { Link, Redirect } from "react-router-dom";

export function Thread(props) {

    const [currentThread, setCurrentThread] = useState({id: '', parent: '', name: ''});
    const [threadPosts, setThreadPosts] = useState([]);
    const [newThreadPost, setNewThreadPost] = useState({id: '', content: '', parent: '', postedBy: ''});
    const [users, setUsers] = useState([]);
    const [redirect, setRedirect] = useState(false);

    const loggedUser = getLoggedUser();  

    useEffect(_ => {

        const queries = [];

        queries.push(getThread(props.match.params.thread))
        queries.push(getThreadPosts(props.match.params.thread));
        queries.push(getUsers());

        Promise.all(queries).then((response) => {
            setCurrentThread(response[0]);
            setThreadPosts(response[1]);
            setUsers(response[2].data);
            setNewThreadPost((prevState) => ({
                ...prevState,
                parent: currentThread.id,
                postedBy: loggedUser?.id
            }))
        });
    }, [currentThread.id, loggedUser?.id, props.match.params.thread])

    const onInputChanged = (e) => {
        setNewThreadPost((prevState) => ({
            ...prevState,
            parent: currentThread.id,
            content: e.target.value
        }));
    }

    const onCreatePost = (e) => {
        if(e.code === 'Enter') {
            e.target.value = '';
            saveThreadPost(newThreadPost).then(_ => {
                getThreadPosts(currentThread.id).then((data) => {
                    setThreadPosts(data);
                })
            });
        }
        
    }

    const onDeleteThread = () => {
        deleteThread(currentThread.id).then(_ => {
            setRedirect(true);
        });
    }

    return (
        <>
        {redirect && <Redirect to={`/topics/${currentThread.parent}`}></Redirect>}
        <div>
            <h2>{currentThread && currentThread.name}</h2>
            {loggedUser && loggedUser.admin && <Link to={`/threads/edit/${currentThread.id}`}>Edit this thread</Link>} 
            {loggedUser && loggedUser.admin && <span onClick={onDeleteThread}> | Delete this thread</span>}
            {threadPosts
            .sort((a,b) => a.datePosted > b.datePosted ? 1 : -1)
            .map(tp =>
                <ThreadPost key={tp.id} user={users.find(user => user.id === tp.postedBy)} threadPost={tp}>
                </ThreadPost>
            ) }
            {loggedUser && currentThread && currentThread.open 
                &&  <div>
                        <textarea onChange={onInputChanged} onKeyPress={onCreatePost}>

                        </textarea>
                    </div> }
            {currentThread && !currentThread.open && <p>This thread is closed. You cannot make new posts here.</p>}
            {!loggedUser && currentThread && currentThread.open && <p>Please <Link to="/login">sign in </Link> to make a new post.</p>}
        </div>
        </> 
    )
}