import defaultIcon from "../../../resources/default-user-icon.jpg";
import "../thread-post/ThreadPost.css";

export function ThreadPost({loggedUser, user, threadPost}) {

    const formatDate = (date) => {
        return `${new Date(date).toDateString()} ${new Date(date).toLocaleTimeString()}`;
    }

    return (
        <div className="d-flex">
            <div className="user-details-wrapper">
                <img src={(user && user.image) || defaultIcon} className="user-icon"></img>
                <h4>{user && user.name}</h4>
                {(user && user.admin) && <p>Administrator</p>}           
            </div>
            <div className="post-content-wrapper">
                <p>{threadPost && formatDate(threadPost.datePosted)} 
                   {threadPost && threadPost.dateEdited && <span> (Edited {formatDate(threadPost.dateEdited)})</span>}</p>
                <div className="post-text">
                    <p>{(threadPost && threadPost.content)}</p>
                </div>
            </div>
        </div>
    )
}