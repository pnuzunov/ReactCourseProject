import { useEffect, useState } from "react"
import { getLoggedUser } from "../../../services/AuthService";
import { getCategories, getTopics, saveThread } from "../../../services/ForumService";
import { v4 as uuidv4 } from 'uuid';
import { Redirect } from "react-router";

export function ThreadForm(props) {
    
    const [categories, setCategories] = useState([]);
    const [topics, setTopics] = useState([]);
    const [allTopics, setAllTopics] = useState([]);
    const [currentThread, setCurrentThread] = useState({
        id: '', 
        open: true,
        name: '', 
        parent: '', 
        createdBy: ''
    });
    const [threadPost, setThreadPost] = useState({
        id: '', 
        content: '', 
        parent: '', 
        postedBy: '', 
        datePosted: '', 
        dateEdited: ''
    });
    const [redirect, setRedirect] = useState(false);

    const loggedUser = getLoggedUser();

    useEffect(_ => {
        getCategories().then(response => {
            setCategories(response.data);
        })
        getTopics().then(response => {
            setAllTopics(response.data);
        })
    }, []);

    const filterTopics = (e) => {
        setTopics(allTopics.filter(topic => topic.parent === e.target.value));
    }

    const onInputChanged = (e) => {
        
        setCurrentThread( (prevState) => ({
            ...prevState,
            createdBy: loggedUser.id,
            [e.target.name]: e.target.value
        }))

        setThreadPost( (prevState) => ({
            ...prevState,
            content: currentThread.firstPost,
            postedBy: loggedUser.id
        }))
        delete currentThread.firstPost;
    }

    const onCheckboxChanged = (e) => {
        setCurrentThread( (prevState) => ({
            ...prevState,
            [e.target.name]: e.target.checked
        }))
    }

    const onFormSubmit = (e) => {
        e.preventDefault();

        setCurrentThread( (prevState) => ({
            ...prevState,
            createdBy: loggedUser.id
        }))

        saveThread(currentThread, threadPost).then(_ => {
            setRedirect(true);
        });

        
    }
    
    return (
        <>
        {redirect && <Redirect to="/"></Redirect>}
        <div className="thread-form-wrapper">           
            <form className="thread-form" onSubmit={onFormSubmit}>
            {/* { error && <span className="text-danger">{error}</span> } */}
                <div className="form-group">
                    <label>Category: </label>
                    <select onChange={filterTopics} defaultValue="">
                        <option hidden disabled value=""></option>
                        {categories.map(category => <option key={category.id} value={category.id}>{category.name}</option>)}
                    </select>
                </div>
                <div className="form-group">
                    <label htmlFor="parent">Topic: </label>
                    <select name="parent" id="parent" onChange={onInputChanged} defaultValue="">
                        <option hidden disabled value=""></option>
                        {topics.map(topic => <option key={topic.id} value={topic.id}>{topic.name}</option>)}
                    </select>
                </div>
                <div className="form-group">
                        <label htmlFor="name">Title: </label>
                        <input type="text" id="name" name="name" className="form-control" onChange={onInputChanged}/>
                </div>
                <div className="form-group">
                    <label htmlFor="firstPost">Post: </label>
                    <textarea id="firstPost" name="firstPost" className="form-control" required onChange={onInputChanged}/>
                </div>
                {loggedUser && loggedUser.admin && 
                    <div className="form-group">
                        <label htmlFor="open">Open</label>
                        <input type="checkbox" id="open" name="open" className="form-control" defaultChecked onChange={onCheckboxChanged}/>
                    </div>
                }
                <button className="btn btn-primary">Create</button>
                <div>
                </div>                
            </form>
        </div>
        </>
    )
}