create table posts (
    post_id serial primary key,
    post_date date with time zone,
    source varchar,
    content varchar,
    topic varchar,
    edited boolean,
    username varchar
);

create table users (
    user_id serial primary key,
    username varchar unique,
    password varchar
);

create table profiles (
    profile_id serial primary key,
    username varchar,
    followers integer,
    following integer,
    constraint fk_username
            foreign key(username)
            references users(username)
);