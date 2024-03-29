create table admin_user (
	id serial primary key,
	username varchar(155),
	password text
);

create table books (
    id bigserial primary key,
    title varchar(255) not null,
    author varchar(255),
    rating real not null,
    date_read date,
    olid text,
    description text
);

create table notes (
    id bigserial primary key,
    book_id bigint not null references books(id),
    note text
);