INSERT INTO locations (country, city) VALUES
('Kaunas', 'Lietuva'),
('Kaunas', 'Lietuva'),
('Kaunas', 'Lietuva'),
('Kaunas', 'Lietuva'),
('Skuodas', 'Lietuva'),
('Prienai', 'Lietuva'),
('Vilnius', 'Lietuva'),
('Vilnius', 'Lietuva'),
('London', 'United Kingdom'),
('Klaipėda', 'Lietuva'),
('Klaipėda', 'Lietuva'),
('Kaunas', 'Lietuva'),
('Valhala', 'Israelis');

INSERT INTO games (title, price, description, category, gameCondition, locationId) VALUES
('Spyder-man: Miles Morales', 23, 'Apsivilkite patobulintą Spider Man kostiumą ir pasiruoškite apsaugoti Niujorką.', 'Veiksmo', 'Labai gera',  1),
('God of War Ragnarök', 46, 'Tiek kritikų, tiek įvairių žaidėjų bendruomenių liaupsių sulaukęs God of War Ragnarök giriamas ne be priežasties!', 'Nuotykių', 'Labai gera',  2),
("Assassin's Creed Valhalla", 18, 'Ubisoft pristato Assassin‘s Creed kūrinį, kurio siužetas grįstas IX a. Anglijos istorija, tad išvysime vikingus!', 'Veiksmo', 'Labai gera',  3),
('Days Gone', 12, 'Ubisoft pristato Assassin‘s Creed kūrinį, kurio siužetas grįstas IX a. Anglijos istorija, tad išvysime vikingus!', 'Atviras pasaulis', 'Labai gera',  4),
('The Last Of Us', 18, 'Pasinerkite į mirtinos pandemijos sugniuždytą pasaulį su šia patobulinta originalo versija – kuri iš pradžių buvo paleista PS3 konsolei – The Last of Us Remastered PS4 CD!', 'Nuotykių', 'Truputį ibrėžtas diskas',  5),
('Grand Theft Auto V', 13, 'Rockstar Games savo atviro pasaulio šedevrą Grand Theft Auto V pirmą kartą išleido 2013-siais, tačiau jau po metų nuo originaliosios išleidimo datos GTA V buvo pristatytas ir aštuntosios kartos konsolėms.', 'Veiksmo', 'Gera',  6),
('Call of Duty: WWII', 9, 'Norite išbandyti modernų žaidimą realistiškai atkuriantį Antrojo pasaulinio karo atmosferą? Įsigykite Call of Duty: World War 2 PS4 CD!', 'Šaudyklės', 'Gera',  7),
('Far Cry 6', 25, 'Ubisoft Toronto ir Ubisoft Entertainment žaidimų kūrėjų ir leidėjų komandos pristato vaizdo žaidimą, kuriame puikiai atskleidžiamas FPS žanras ir visas jo žavesys.', 'Veiksmo', 'Labai gera',  8),
('Uncharted 4: A Thief’s End', 30, "Įsigydami Uncharted 4: A Thief's End PS4 CD gausite progą išmėginti labiausiai atidirbtą ilgametės, išskirtinai PlayStation platformai leidžiamos studijos Noughty Dog sukurtos serijos žaidimą.", 'Nuotykių', 'Labai gera',  9),
("Assassin's Creed Odyssey", 15, 'Assassin‘s Creed: Odyssey – vienuolikta dalis žymiojoje Ubisoft kompanijos sukurtoje Assassin‘s Creed žaidimų serijoje.', 'Veiksmo', 'Gera',  10),
('Detroit: Become Human', 12, 'Detroit: Become Human ir kino filmų įspūdį sudarantis nuotykių žaidimas su interaktyvia istorijos eiga ir kiberpanko tematikos pasauliu.', 'Veiksmo', 'Gera',  11),
('NBA 2k23', 55, 'Pasiruošk įtampai ir džiaugsmui žaidžiant krepšinio aikštelėje!', 'Sportas', 'Labai gera',  12),
('God of War III', 6, 'SONY Interactive Entertainment pristato vienos populiariausios PlayStation 4 platformos God of War 3 kūrinio moderniai perdirbtą versiją – God of War III: Remastered.', 'Veiksmo', 'Gera',  13);

INSERT INTO images (src, gameId) VALUES
('http://localhost:5007/Spyder-man-Miles-Morales.webp', 1),
('http://localhost:5007/Spyder-man-Miles-Morales-images.jpg', 1),
('http://localhost:5007/spyder-man-miles-morales-350x200.jpg', 1),
('http://localhost:5007/God-of-War-Ragnarök.webp', 2),
('http://localhost:5007/God-of-War-Ragnarök-mobile.webp', 2),
('http://localhost:5007/God-of-War-Ragnarök-350x200.jpg', 2),
('http://localhost:5007/Assassins-Creed-Valhalla.webp', 3),
('http://localhost:5007/Assassins-Creed-Valhalla-mobile.webp', 3),
('http://localhost:5007/Assassins-Creed-Valhalla-350x200.jpg', 3),
('http://localhost:5007/Days-Gone.webp', 4),
('http://localhost:5007/Days-Gone-mobile.webp', 4),
('http://localhost:5007/Days-Gone-350x200.jpg', 4),
('http://localhost:5007/TheLastOfUs-350x200.webp', 5),
('http://localhost:5007/TheLastOfUs-images-350x200.jpeg', 5),
('http://localhost:5007/TheLastOfUs-images2-350x200.jpeg', 5),
('http://localhost:5007/GTAV-350x200.webp', 6),
('http://localhost:5007/GTAV-images-350x200.jpg', 6),
('http://localhost:5007/GTAV-images2-350x200.jpg', 6),
('http://localhost:5007/WWII-350x200.webp', 7),
('http://localhost:5007/WWII-images-350x200.jpg', 7),
('http://localhost:5007/WWII-images2-350x200.jpg', 7),
('http://localhost:5007/Far-Cry-6-350x200.webp', 8),
('http://localhost:5007/Far-Cry-6-images-350x200.jpg', 8),
('http://localhost:5007/Far-Cry-6-images2-350x200.jpg', 8),
('http://localhost:5007/Uncharted-350x200.webp', 9),
('http://localhost:5007/Uncharted-images-350x200.jpg', 9),
('http://localhost:5007/Uncharted-images2-350x200.jpg', 9),
('http://localhost:5007/Odyssey-350x200.webp', 10),
('http://localhost:5007/Odyssey-images-350x200.jpg', 10),
('http://localhost:5007/Detroit-350x200.webp', 11),
('http://localhost:5007/Detroit-images-350x200.jpg', 11),
('http://localhost:5007/Detroit-images2-350x200.jpg', 11),
('http://localhost:5007/NBA2K23_350x200.webp', 12),
('http://localhost:5007/NBA2K23-images-350x200.jpg', 12),
('http://localhost:5007/NBA2K23-images2-350x200.jpg', 12);