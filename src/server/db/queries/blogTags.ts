import { Query } from '..';

interface TBlogTags {
    blogid: number;
    tagid: number
}

const all = () => Query<TBlogTags[]>(`SELECT blogs.* FROM Blogs JOIN Authors ON Authors.id = Blogs.authorid`);

const post = (blogid: number, tagid: number) => Query<TBlogTags[]>(`INSERT INTO BlogTags (blogid, tagid) VALUE (?, ?);`, [blogid, tagid]);

export default {
    all,
    post
}