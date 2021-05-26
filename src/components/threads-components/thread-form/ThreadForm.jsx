import { useEffect, useState } from "react"
import { getLoggedUser } from "../../../services/AuthService";
import { getCategories, getThread, getTopics, saveThread } from "../../../services/ForumService";
import { Redirect } from "react-router";
import "../thread-form/ThreadForm.css";
import { Link } from "react-router-dom";

export function ThreadForm(props) {
    
    const [categories, setCategories] = useState([]);
    const [topics, setTopics] = useState([]);
    const [allTopics, setAllTopics] = useState([]);
    const [currentThread, setCurrentThread] = useState({
        id: '', 
        open: true,
        name: '', 
        parent: '', 
        createdBy: '',
        category: ''
    });
    const [threadPost, setThreadPost] = useState({
        id: '', 
        content: '', 
        parent: '', 
        postedBy: '', 
        datePosted: '', 
        dateEdited: ''
    });
    const [error, setError] = useState(null);
    const [redirect, setRedirect] = useState(false);

    const loggedUser = getLoggedUser();

    useEffect(_ => {

        const queries = [];
        queries.push(getCategories());
        queries.push(getTopics());
        if(props.computedMatch.params.thread){
            queries.push(getThread(props.computedMatch.params.thread));
        }
        Promise.all(queries).then((response) => {
            setCategories(response[0].data);
            setAllTopics(response[1].data);

            if(props.computedMatch.params.thread) {
                setCurrentThread({...response[2]});
                // if( !loggedUser.admin && response[2].createdBy !== loggedUser.id ) {
                //     setRedirect(true);
                // }
                filterTopics(response[1].data, response[2].category);
            }
            
        });
    }, [ loggedUser.admin, loggedUser.id, props.computedMatch.params.thread]);

    const filterTopics = (all_topics, category) => {
        setTopics(all_topics.filter(topic => topic.parent === category));
    }

    const onInputChanged = (e) => {
        
        if(e.target.name === 'category') {
            setTopics(allTopics.filter(topic => topic.parent === e.target.value));
            setCurrentThread( (prevState) => ({
                ...prevState,
                parent: allTopics.filter(topic => topic.parent === e.target.value)[0]?.id
            }));
        }
        if(e.target.name !== 'content') {
            setCurrentThread( (prevState) => ({
                ...prevState,
                createdBy: (currentThread.id === '' ? loggedUser.id : currentThread.createdBy),
                [e.target.name]: e.target.value
            }));       
        }


        else if(e.target.name === 'content')
            setThreadPost( (prevState) => ({
                ...prevState,
                [e.target.name]: e.target.value,
                postedBy: loggedUser.id
            }));
    }

    const onCheckboxChanged = (e) => {
        setCurrentThread( (prevState) => ({
            ...prevState,
            [e.target.name]: e.target.checked
        }))
    }

    const onFormSubmit = (e) => {
        e.preventDefault();

        if(currentThread.parent === '') {
            setError({message: 'Please select a category and topic.'});
            return;
        }

        saveThread(currentThread, threadPost).then(_ => {
            setRedirect(true);
        });
        
    }

    return (
        <>
        {redirect && <Redirect to={`/topics/${currentThread.parent}`}></Redirect>}
        <div className="thread-form-title">
            <h4>{currentThread.id === "" ? "Create a new thread" : "Edit thread"}</h4>
        </div>
        <div className="thread-form-wrapper">           
            <form className="thread-form" onSubmit={onFormSubmit}>
                <div className="form-group">
                    <label htmlFor="category">Category: </label>
                    <select name="category" id="category" className="form-control" onChange={onInputChanged} value={currentThread.category}>
                        <option hidden disabled value=""></option>
                        {categories.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
                    </select>
                </div>
                <div className="form-group">
                    <label htmlFor="parent">Topic: </label>
                    <select name="parent" id="parent" className="form-control" onChange={onInputChanged} value={currentThread.parent}>
                        <option hidden disabled value=""></option>
                        {topics.map(topic => <option key={topic.id} value={topic.id}>{topic.name}</option>)}
                    </select>
                </div>
                <div className="form-group">
                        <label htmlFor="name">Title: </label>
                        <input type="text" id="name" name="name" className="form-control" value={currentThread.name} required onChange={onInputChanged}/>
                </div>
                {(currentThread.id === '') && <div className="form-group">
                    <label htmlFor="content">Post: </label>
                    <textarea id="content" name="content" className="form-control" required onChange={onInputChanged}/>
                </div>}
                {loggedUser && loggedUser.admin && 
                    <div className="form-group">
                        <label htmlFor="open">Open</label>
                        <input type="checkbox" id="open" name="open" className="form-control" checked={currentThread.open} onChange={onCheckboxChanged}/>
                    </div>
                }
                {error && 
                <div className="text-danger">
                    <span>{error.message}</span>
                </div>}
                <button className="btn btn-primary">{currentThread.id === "" ? "Create" : "Save changes"}</button>
                <Link className="btn btn-disabled" to="/">Cancel</Link>
                <div>
                </div>                
            </form>
        </div>
        </>
    )
}
