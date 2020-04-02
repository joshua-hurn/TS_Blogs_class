import React from 'react'
import {
    BrowserRouter as Router,
    Switch,
    Route
} from "react-router-dom";
import Blogs from './Components/Blogs';
import SingleBlog from './Components/SingleBlog';

export default function App() {
    return (
        <Router>
            <h1>Hookie McBlogerson</h1>
            <Switch>
                <Route exact path="/" component={Blogs} />
                <Route path="/blogs/:id" component={SingleBlog} />
            </Switch>
        </Router>
    )
}