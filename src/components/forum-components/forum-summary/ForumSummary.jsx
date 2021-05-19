import { useEffect, useState } from "react";
import { getCategories, getTopics } from "../../../services/ForumService";
import { ForumCategory } from "../forum-category/ForumCategory";

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
        topicsMapped[element.name] = topics.filter(t => t.parent === element.name);
    });

    return ( 
        <div>
            {categories.map(category => <ForumCategory categoryKey={category.key} name={category.name} topics={topicsMapped[category.name]} key={category.name}></ForumCategory> )}
        </div>
    )
}