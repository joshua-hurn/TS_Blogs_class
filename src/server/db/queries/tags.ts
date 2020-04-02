import { Query } from '..';

interface TTags {
    id: number;
    name: string;
}

const all = () => Query<TTags[]>(`SELECT * FROM Tags`);

// const one = (id: any) => Query<TTags[]>(`SELECT blogs.* FROM Tags JOIN Authors ON Authors.id = Blogs.authorid WHERE Blogs.id = ${id}`);

// const post = (title: string, content: string, authorid: number) => Query<TBlogs[]>(`INSERT INTO Blogs (title, content, authorid) VALUE (?, ?, ?);`, [title, content, Number(authorid)]);

export default {
    all,
    // one
}