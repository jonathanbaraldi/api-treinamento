drop table books.book;
CREATE TABLE books.book (
      id MEDIUMINT NOT NULL AUTO_INCREMENT,
     BookName VARCHAR(100),
	AuthorName VARCHAR(100),
	Price VARCHAR(10),
	PRIMARY KEY (id)
) 

SELECT * FROM books.book;

INSERT INTO books.book VALUES (1,"JONJONES","LASVEGAS","12")