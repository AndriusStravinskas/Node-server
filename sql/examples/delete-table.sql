create table users (
	id int1 unsigned primary key auto_increment,
    email varchar(64),
    password varchar(32), 
    firstName varchar(64),
    lastName varchar(64),
    createAt timestamp default current_timestamp,
    updateAt timestamp default current_timestamp on update current_timestamp
);