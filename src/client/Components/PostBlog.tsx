import React, { useState, useEffect } from 'react';

export default function PostBlog() {
    const [blogTitle, setBlogTitle] = useState("");
    const [blogContent, setBlogContent] = useState("");
    const [tags, setTags] = useState([]);

    useEffect(() => {
        const fetchTags = async () => {
            try {
                let r = await fetch('/api/tags');
                let tags = await r.json();
                setTags(tags);
            } catch (error) {
                console.log(error);
            }
        }

        fetchTags();
    }, []);

    const sendBlog = e => {
        e.preventDefault();
        fetch("api/blogs/", {
            method: "post",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },

            //make sure to serialize your JSON body
            body: JSON.stringify({
                authorid: 1,
                title: blogTitle,
                content: blogContent
            })
        })
            .then((res) => console.log(res));
    }

    return (
        <main className="container my-5">
            <form>
                <div className="form-group">
                    <label htmlFor="exampleFormControlInput0">Title</label>
                    <input onChange={(e) => setBlogTitle(e.target.value)} type="text" className="form-control" id="exampleFormControlInput0" placeholder="" />
                </div>
                <div className="form-group">
                    <label htmlFor="exampleFormControlInput1">Title</label>
                    <input onChange={(e) => setBlogTitle(e.target.value)} type="text" className="form-control" id="exampleFormControlInput1" placeholder="Enter a title..." />
                </div>
                <div className="form-group">
                    <label htmlFor="exampleFormControlSelect1">Example select</label>
                    <select className="form-control" id="exampleFormControlSelect1">
                        {tags.map(tag => <option>{tag.name}</option>)}
                    </select>
                </div>
                <div className="form-group">
                    <label htmlFor="exampleFormControlTextarea1">Main body:</label>
                    <textarea onChange={(e) => setBlogContent(e.target.value)} className="form-control" id="exampleFormControlTextarea1" data-rows="3" placeholder="..."></textarea>
                </div>
                <button onClick={(e) => sendBlog(e)} type="submit" className="btn btn-primary">Submit</button>
            </form>
        </main>
    )
}
