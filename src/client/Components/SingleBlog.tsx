import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

export default function SingleBlog() {
    const [blog, setBlog] = useState([]);
    let { id } = useParams();

    useEffect(() => {
        const getBlog = async () => {
            let res = await fetch(`/api/blogs/${id}`);
            let blogs = await res.json();
            console.log(blogs);
            setBlog(blogs);
        }

        getBlog();
    }, [id]);

    if (blog.length <= 0) {
        return null
    } else {
        return (
            <div className="card" style={{ width: "18rem" }}>
                <div className="card-body">
                    <h5 className="card-title">{blog[0].title}</h5>
                    <h6 className="card-subtitle mb-2 text-muted">{blog[0].content}</h6>
                </div>
            </div>
        )
    }
}