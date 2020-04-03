import React, { useState, useEffect } from 'react';

export default function PostBlog() {
    const [blogTitle, setBlogTitle] = useState(""),
        [blogContent, setBlogContent] = useState(""),
        [blogTags, setBlogTags] = useState([]),
        [tagOptions, setTagOptions] = useState([]);

    useEffect(() => {
        const fetchTags = async () => {
            try {
                let r = await fetch('/api/tags');
                let tags = await r.json();
                setTagOptions(tags);
            } catch (error) {
                console.log(error);
            }
        }

        fetchTags();
    }, []);

    const sendBlog = async (e: React.MouseEvent) => {
        e.preventDefault();
        const authorid = Number(localStorage.getItem('authorid'));
        try {
            let newBlog = await fetch("/api/blogs/", {
                method: "POST",
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },

                body: JSON.stringify({
                    authorid: authorid,
                    title: blogTitle,
                    content: blogContent
                })
            })
            let blogSuccess = await newBlog.json();
            console.log(blogSuccess);
            // blogTags.forEach(tag => {
                // fetch("/api/tags/", {
                //     method: "POST",
                //     headers: {
                //         'Accept': 'application/json',
                //         'Content-Type': 'application/json'
                //     },

                //     body: JSON.stringify({
                //         blogid: blogSuccess.insertId,
                //         tagid: 
                //     })
                // })
            // });

            setBlogTitle("");
            setBlogContent("");
        } catch (err) {
            console.log(err);
        }
    }

    return (
        <main className="container my-5">
            <form>
                <div className="form-group">
                    <label htmlFor="exampleFormControlInput1">Title</label>
                    <input onChange={(e) => setBlogTitle(e.target.value)} value={blogTitle} type="text" className="form-control" id="exampleFormControlInput1" placeholder="Enter a title..." />
                </div>
                <div className="form-group">
                    <label htmlFor="exampleFormControlSelect1">Select Tags</label>
                    <select onChange={(e) => { console.log(e); e.persist(); setBlogTags([...blogTags, e.target.value]); }} className="form-control" id="exampleFormControlSelect1">
                        {tagOptions.map((tag, index) => <option key={index}>{tag.name}</option>)}
                    </select>
                </div>
                <div className="form-group">
                    <label htmlFor="exampleFormControlTextarea1">Main body:</label>
                    <textarea onChange={(e) => setBlogContent(e.target.value)} value={blogContent} className="form-control" id="exampleFormControlTextarea1" data-rows="3" placeholder="..."></textarea>
                </div>
                <button onClick={(e) => sendBlog(e)} type="submit" className="btn btn-primary">Submit</button>
            </form>
        </main>
    )
}
