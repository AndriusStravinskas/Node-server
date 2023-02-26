create table images (
	id int4 unsigned primary key auto_increment,
    src varchar(512) not null,
    gameId int4 unsigned not null,
    createAt timestamp default current_timestamp,
    updateAt timestamp default current_timestamp on update current_timestamp,
    FOREIGN KEY (gameId) REFERENCES games(id)
);