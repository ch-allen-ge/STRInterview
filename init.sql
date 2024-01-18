create table posts (
    post_id serial primary key,
    post_date date,
    source varchar,
    content varchar,
    topic varchar,
    num_followers integer,
    num_following integer,
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