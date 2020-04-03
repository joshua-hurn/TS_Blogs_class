import { Query } from '..';

interface TTags {
    id: number;
    name: string;
}

const all = () => Query<TTags[]>(`SELECT * FROM Tags`);

const some = (blogid: number) => Query<TTags[]>(`spBlogTags(${blogid})`);

const post = (blogid: string, tagid: string) => Query<TTags[]>(`INSERT INTO BlogTags (blogid, tagid) value (?, ?);`, [blogid, tagid]);

export default {
    all,
    some,
    post
}