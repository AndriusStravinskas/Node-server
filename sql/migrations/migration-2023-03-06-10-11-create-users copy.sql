create table users (
	id int4 unsigned primary key auto_increment,
	email varchar(64) not null unique,
	password varchar(64) not null,
	name varchar(64) not null,
	surname varchar(64) not null,
	role enum('ADMIN', 'USER') default('USER'),
	createAt timestamp default current_timestamp,
	updateAt timestamp default current_timestamp on update current_timestamp
);