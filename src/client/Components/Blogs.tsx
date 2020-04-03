import * as React from 'react';
import { response } from 'express';

class Blogs extends React.Component<IAppProps, IAppState> {
	constructor(props: IAppProps) {
		super(props);
		this.state = {
			blogs: [],
			tags: []
		};
	}

	async componentDidMount() {
		localStorage.setItem('authorid', "1");
		this.fetchBlogs();
	}

	fetchBlogs = async () => {
		try {
			let r = await fetch('/api/blogs/');
			let blogs = await r.json();
			this.setState({ blogs });
		} catch (error) {
			console.log(error);
		}
	}

	deleteBlog = async (id: number) => {
		try {
			let r = await fetch(`/api/blogs/${id}`, {
				method: "delete"
			});
			let res = await r.json();
			console.log(res);
			this.fetchBlogs();
		} catch(error) {
			console.log(error);
		}
	}

	render() {
		return (
			<main className="container my-5">
				{this.state.blogs.map(blog => (
					<div key={blog.id} className="card" style={{ width: "18rem" }}>
						<div className="card-body">
							<h5 className="card-title">{blog.title}</h5>
							<p className="card-text">{blog.content}</p>
							<button type="button">
								<a href={`/blogs/${blog.id}`}>Read More</a>
							</button>
							<img onClick={() => this.deleteBlog(blog.id)} src="../img/delete.png" alt="trash can icon. click to delete."/>
						</div>
					</div>
				))}
			</main>
		);
	}
}

export interface IAppProps { }

export interface IAppState {
	blogs: Array<IBlog>;
	tags: Array<ITags>;
}

interface IBlog {
	id: number;
	title: string;
	content: string;
	authorid: string;
}

interface ITags {
	id: number;
	name: string;
}

export default Blogs;
