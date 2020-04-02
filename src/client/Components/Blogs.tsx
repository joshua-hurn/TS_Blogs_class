import * as React from 'react';

class App extends React.Component<IAppProps, IAppState> {
	constructor(props: IAppProps) {
		super(props);
		this.state = {
			blogs: []
		};
	}

	async componentDidMount() {
		try {
			let r = await fetch('/api/blogs');
			let blogs = await r.json();
			this.setState({ blogs });
		} catch (error) {
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
}

interface IBlog {
	id: number;
	title: string;
	content: string;
	authorid: string;
}

export default App;
