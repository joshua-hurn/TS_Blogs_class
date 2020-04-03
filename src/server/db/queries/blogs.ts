import { Query } from '..';

interface TBlogs {
    id: number;
    title: string;
    content: string;
    authorid: number;
}

const all = () => Query<TBlogs[]>(`SELECT blogs.* FROM Blogs JOIN Authors ON Authors.id = Blogs.authorid`);

const one = (id: any) => Query<TBlogs[]>(`SELECT blogs.* FROM Blogs JOIN Authors ON Authors.id = Blogs.authorid WHERE Blogs.id = ${id}`);

const post = (title: string, content: string, authorid: number) => Query<TBlogs[]>(`INSERT INTO Blogs (title, content, authorid) VALUE (?, ?, ?);`, [title, content, Number(authorid)]);

const put = (content: string, id: number) => Query(`UPDATE blogs SET content = ? WHERE id = ?;`, [content, id]);

const destroy = (id: number) => Query("DELETE FROM `blogs`.`Blogs` WHERE (`id` = '?');", [id]);

export default {
    all,
    one,
    post,
    put,
    destroy
}
