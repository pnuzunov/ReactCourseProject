import defaultIcon from "../../../resources/default-user-icon.jpg";
import { getLoggedUser } from "../../../services/AuthService";
import "../thread-post/ThreadPost.css";

export function ThreadPost({user, threadPost, onPostEdit, onPostDelete}) {

    const loggedUser = getLoggedUser();

    return (
        <div className="d-flex">
            <div className="user-details-wrapper">
                <img alt="user-img" src={(user && user.image) || defaultIcon} className="user-icon"></img>
                <h4>{user && user.name}</h4>
                {(user && user.admin) && <p>Administrator</p>}           
            </div>
            <div className="post-content-wrapper">
                {threadPost && threadPost.datePosted && <span> {threadPost.datePosted} </span>} 
                {threadPost && threadPost.dateEdited && <span> (Edited {threadPost.dateEdited}))</span>}
                {user && loggedUser && user.id === loggedUser.id
                    && <div>
                            <button className="btn btn-danger d-float float-right"
                                onClick={() => onPostDelete(threadPost.id)}> Delete </button>
                            <button className="btn btn-primary d-float float-right"
                                onClick={() => onPostEdit(threadPost)}> Edit </button>
                        </div>}
                
                <div className="post-text">
                    <p>{(threadPost && threadPost.content)}</p>
                </div>
            </div>
        </div>
    )
}