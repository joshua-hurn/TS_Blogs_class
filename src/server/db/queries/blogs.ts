import { Query } from '..';

interface TBlogs {
    id: number;
    title: string;
    content: string;
    authorid: number;
}

const all = () => Query<TBlogs[]>(`SELECT blogs.* FROM Blogs JOIN Authors ON Authors.id = Blogs.authorid`);

const one = (id: any) => Query<TBlogs[]>(`
    SELECT
        blogs.*,
    FROM Blogs
    JOIN Authors ON Authors.id = Blogs.authorid
    WHERE Blogs.id = ${id}
`);

const post = (title: string, content: string, authorid: number) => Query<TBlogs[]>(`
    INSERT INTO Blogs (title, content, authorid)
        VALUE (?, ?, ?);
`, [title, content, Number(authorid)]);

// const 

export default {
    all,
    one,
    post,

}