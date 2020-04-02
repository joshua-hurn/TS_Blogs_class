create database blogs;

use blogs;

USE chirpr;
SET FOREIGN_KEY_CHECKS = 0; 
drop table if exists Blogs;
drop table if exists BlogTags;
SET FOREIGN_KEY_CHECKS = 1;

create user 'usr'@'localhost' identified with mysql_native_password by 'usrpassword';
grant select, insert, update, delete on blogs.* to 'usr'@'localhost';
flush privileges;
show grants for 'usr'@'localhost';

create table Authors (
	id int auto_increment,
    name varchar(40) not null,
    email varchar(60) not null,
	created_at timestamp default NOW(),
    primary key (id)
);

create table Blogs (
	id INT AUTO_INCREMENT,
    title VARCHAR(60) NOT NULL,
    content VARCHAR(600) NOT NULL,
    authorid INT NOT NULL,
    created_at TIMESTAMP DEFAULT NOW(),
    PRIMARY KEY (id),
    FOREIGN KEY (authorid) REFERENCES Authors(id)
    ON DELETE CASCADE
);

create table Tags (
	id int auto_increment,
    name varchar(40) not null,
	created_at timestamp default NOW(),
    primary key (id)
);

create table Blogtags (
	blogid int not null,
    tagid int not null,
	primary key (blogid, tagid),
    foreign key (blogid) references Blogs(id),
	foreign key (tagid) references Tags(id)
    ON DELETE CASCADE
);

DELIMITER //
CREATE PROCEDURE spBlogTags(blogid int)
 BEGIN
 SELECT *
FROM BlogTags
JOIN Tags ON Tags.id = BlogTags.tagid
WHERE BlogTags.blogid = blogid;
END //
DELIMITER ;

insert into Authors (name, email) value ('Josh', 'test@test.com');
insert into Blogs (title, content, authorid) value ('test title', 'test content', '1');
insert into Tags (name) values 
	('politics'),
	('healthcare'),
	('science'),
	('code'),
	('history'),
	('religion');

insert into BlogTags (blogid, tagid) value (1, 1);

-- SELECT * FROM Tags;

select * from Blogs;