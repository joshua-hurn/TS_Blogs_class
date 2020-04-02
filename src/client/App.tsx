import React from 'react'
import {
    BrowserRouter as Router,
    Switch,
    Route
} from "react-router-dom";
import Navbar from './Components/Navbar';
import Blogs from './Components/Blogs';
import PostBlog from './Components/PostBlog';
import SingleBlog from './Components/SingleBlog';

export default function App() {
    return (
        <Router>
            <Navbar />
            <Switch>
                <Route exact path="/" component={Blogs} />
                <Route exact path="/create" component={PostBlog} />
                <Route path="/blogs/:id" component={SingleBlog} />
            </Switch>
        </Router>
    )
}