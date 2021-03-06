import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getCategories, getTopics } from "../../../services/ForumService";
import { ForumCategory } from "../forum-category/ForumCategory";
import "../../../index.css"

export function ForumSummary() {
    const [categories, setCategories] = useState([]);
    const [topics, setTopics] = useState([]);

    useEffect(_ => {

        getCategories().then(categoriesResponse => {
            setCategories(categoriesResponse.data);
        })

        getTopics().then( topicsResponse => {
            setTopics(topicsResponse.data);
        });

    }, []);

    var topicsMapped = [];
    categories.forEach(element => {
        topicsMapped[element.name] = topics.filter(t => t.parent === element.id);
    });

    return (
        <div className="max-height">
            <Link className="d-flex m-3" to="/threads/create">Create a thread</Link>
            {categories.map(category => <ForumCategory categoryId={category.id} name={category.name} topics={topicsMapped[category.name]} key={category.id}></ForumCategory> )}
        </div>
    )
}