create table games (
	id int4 unsigned primary key auto_increment,
    title varchar(256) not null,
    locationId int4 unsigned not null unique,
    price float8 unsigned not null,
    description varchar(256) not null,
	category varchar(32) not null,
	gameCondition varchar(32) not null,
    createAt timestamp default current_timestamp,
    updateAt timestamp default current_timestamp on update current_timestamp,
    FOREIGN KEY (locationId) REFERENCES locations(id)
);