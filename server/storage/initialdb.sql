--
-- File generated with SQLiteStudio v3.3.3 on mar mar 8 21:44:50 2022
--
-- Text encoding used: System
--
PRAGMA foreign_keys = off;
BEGIN TRANSACTION;

-- Table: exam
DROP TABLE IF EXISTS page;
CREATE TABLE page (id INTEGER UNIQUE, username VARCHAR (15), creationDate DATE NOT NULL, publicationDate DATE, status VARCHAR (15), title TEXT, content TEXT, PRIMARY KEY (id));

-- user:bob
INSERT INTO page (id, username, creationDate, publicationDate, status, title, content) VALUES (1, "Bob78",'2023-05-10', '2023-05-10', "published", "14 things I wish I knew at 25 (now that I’m 38)" ,"Juneteenth is our newest American holiday; declared as a national holiday to mark, honor and celebrate Black history and our liberation from slavery. But I’m here to tell you… it’s not that. It’s not just Black history. If you’re an American, it’s your history. It’s… our history. It’s important that we speak of Juneteenth in terms of how it began — a great moment in American history and a day of freedom.");
INSERT INTO page (id, username, creationDate, publicationDate, status, title, content) VALUES (2, "Bob78",'2023-04-10', '', "draft", "System Design Blueprint: The Ultimate Guide",  "Juneteenth is a tradition that began down in the great state of Texas. It was first celebrated as a feast day. A time for joyous families to gather and celebrate that they had come through slavery. They’d defied death and oppression, the master’s cruelty, the overseer’s whip, the periods of starvation and sickness, the inescapable heartbreak and sorrow, all the family disruption and lives spent on hard labor, the profits of which were stolen from them — they had made it through all of that, to the other side. Coming through slavery was akin to something you’d read about in the Bible.");

--user:allen has no page
--user:sam
INSERT INTO page (id, username, creationDate, publicationDate, status, title, content) VALUES (3, "Sam77",'2023-04-10', '2023-04-10', "published", "How to Reduce Engineering Scope", "Own printer took a galley of type and scrambled it to make a It has survived not only five centuries, but also the leap into electronic typesetting, remaining essewith the release of Letraset sheets containing Lorem Ipsum passages, and more");
INSERT INTO page (id, username, creationDate, publicationDate, status, title, content) VALUES (4, "Sam77",'2023-02-10', '', "draft", "Don’t Just LeetCode; Follow the Coding Patterns Instead", "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.");
INSERT INTO page (id, username, creationDate, publicationDate, status, title, content) VALUES (5, "Sam77",'2023-09-10', '2023-09-10', "scheduled", "The Difference Between The Clever Developer & The Wise Developer", "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.");

-- CREATE TABLE user (code VARCHAR (10) NOT NULL UNIQUE, name VARCHAR (100) NOT NULL, cfu INTEGER NOT NULL, date DATE, score NUMERIC, PRIMARY KEY (code));
DROP TABLE IF EXISTS user;

CREATE TABLE user (authorID INTEGER UNIQUE, email VARCHAR (10) NOT NULL UNIQUE, password VARCHAR (150) NOT NULL, salt VARCHAR (150), username VARCHAR (150) NOT NULL, role VARCHAR (150) NOT NULL, PRIMARY KEY (username));

INSERT INTO user (authorID, email, password, salt, username, role) VALUES (1, "s297978@studenti.polito.it", "71060990c366dfbaee42ac189e014c6088abe75e445c211bec79bb47cbdf8273", '56e6db32f34a49bb', "Bob78", "user");
INSERT INTO user (authorID, email, password, salt, username, role) VALUES (2, "s297977@studenti.polito.it", "d7058621c9c9e538da3aaf567c6cfeec32fc3e2236d1f27fc959c15c2de8585a", '7b6afac1d19aabed', "Sam77", "user");
INSERT INTO user (authorID, email, password, salt, username, role) VALUES (3, "s297976@studenti.polito.it", "b8b0652d147985abe84413432df4f884e22db9c28f9e443e8487483e0b88cdd5", 'a90336f14c2aef5a', "Allen76", "user");
INSERT INTO user (authorID, email, password, salt, username, role) VALUES (4, "s297975@studenti.polito.it", "dd3da41f2260b3a487c0520fe345480ee1e8203dfc766ad8833c966f489ffe96", 'c0c226a5ed262ece', "Kyle75", "admin");


DROP TABLE IF EXISTS website;

CREATE TABLE website (name VARCHAR (10));

INSERT INTO website (name ) VALUES ("");


COMMIT TRANSACTION;
PRAGMA foreign_keys = on;