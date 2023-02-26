create table locations (
	id int4 unsigned primary key auto_increment,
    country varchar(256) not null,
    city varchar(256) not null,
    createAt timestamp default current_timestamp,
    updateAt timestamp default current_timestamp on update current_timestamp
);