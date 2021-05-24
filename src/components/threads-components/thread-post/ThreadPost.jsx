import defaultIcon from "../../../resources/default-user-icon.jpg";
import "../thread-post/ThreadPost.css";

export function ThreadPost({user, threadPost}) {

    return (
        <div className="d-flex">
            <div className="user-details-wrapper">
                <img alt="user-img" src={(user && user.image) || defaultIcon} className="user-icon"></img>
                <h4>{user && user.name}</h4>
                {(user && user.admin) && <p>Administrator</p>}           
            </div>
            <div className="post-content-wrapper">
                <p>{threadPost && threadPost.datePosted} 
                   {threadPost && threadPost.dateEdited && <span> (Edited threadPost.dateEdited))</span>}</p>
                <div className="post-text">
                    <p>{(threadPost && threadPost.content)}</p>
                </div>
            </div>
        </div>
    )
}