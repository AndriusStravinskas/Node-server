alter table users 
add mobile varchar(64);

update users
set mobile = '+yyy xxx xxxx';

alter table users 
modify mobile varchar(64) not null;

INSERT INTO users (email, password, name, surname, mobile) VALUES
('temp@gmail.com', '$2b$05$P4BCcWhEvq8l1OhOF0qftuYsX58i2iMccF3lafgyrtALeuKMLchDm', 'temp', 'temp', '+yyy xxx xxxx');

SET @temp_user_id = LAST_INSERT_ID();

alter table games 
add ownerId int4 unsigned,
add foreign key (ownerId) references users(id);

update games
set ownerId = @temp_user_id;

alter table games
modify ownerId int4 unsigned not null;

ALTER TABLE games DROP FOREIGN KEY games_ibfk_1;
DROP INDEX locationId ON games;
ALTER TABLE games ADD FOREIGN KEY (locationId) references locations(id);