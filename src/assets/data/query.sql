CREATE TABLE users (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  first_name VARCHAR(50),
  last_name VARCHAR(50),
  username VARCHAR(50),
  email VARCHAR(50),
  phone VARCHAR(50),
  address_line_1 VARCHAR(50),
  address_line_2 VARCHAR(50),
  city VARCHAR(50),
  postcode VARCHAR(50),
  latitude FLOAT,
  longitude FLOAT
);

CREATE TABLE users (
  id BIGSERIAL PRIMARY KEY NOT NULL,
  username VARCHAR(50) NOT NULL,
  email VARCHAR(100) NOT NULL,
  password VARCHAR(50) NOT NULL,
  phone VARCHAR(50) NOT NULL,
  address_line1 VARCHAR(100) NOT NULL,
  address_line2 VARCHAR(100) NOT NULL,
  city VARCHAR(50) NOT NULL,
  postcode VARCHAR(20) NOT NULL,
  latitude FLOAT,
  longitude FLOAT,
  UNIQUE (email)
);

INSERT INTO users (id, first_name, last_name, username, email, phone, address_line_1, address_line_2, city, postcode, latitude, longitude)
VALUES



CREATE TABLE books (
  isbn VARCHAR(13) PRIMARY KEY,
  cover_img VARCHAR(100),
  title VARCHAR(100),
  author VARCHAR(100),
  publisher VARCHAR(100),
  publishedDate DATE,
  genre VARCHAR(50)
);

INSERT INTO books (isbn, cover_img, title, author, publisher, publishedDate, genre)
VALUES
("9780143127550", "/books/to-kill-a-mockingbird.png", "To Kill a Mockingbird", "Harper Lee", "J. B. Lippincott & Co.", "1960-06-11", "Classic"),
("9780061120084", "/books/1984.png", "1984", "George Orwell", "Secker & Warburg", "1949-06-08", "Dystopian"),
("9798404767230", "/books/pride-and-predjudice.png", "Pride and Prejudice", "Jane Austen", "T. Egerton, Whitehall", "1813-01-28", "Romance"),
("9780316769174", "/books/catcher-in-the-rye.png", "The Catcher in the Rye", "J.D. Salinger", "Little, Brown and Company", "1951-07-16", "Coming-of-age"),
("9780544273443", "/books/the-lord-of-the-rings.png", "The Lord of the Rings", "J.R.R. Tolkien", "Allen & Unwin", "1954-07-29", "Fantasy"),
("9780547928227", "/books/the-hobbit.png", "The Hobbit", "J.R.R. Tolkien", "George Allen & Unwin", "1937-09-21", "Fantasy"),
("9781408855652", "/books/harry-potter-philosophers-stone.png", "Harry Potter and the Philosopher's Stone", "J.K. Rowling", "Bloomsbury Publishing", "1997-06-26", "Fantasy"),
("9798351145013", "/books/the-great-gatsby.png", "The Great Gatsby", "F. Scott Fitzgerald", "Charles Scribner's Sons", "1925-04-10", "Historical fiction"),
("9780143105954", "/books/moby-dick-or-the-whale.png", "Moby-Dick; or, The Whale", "Herman Melville", "Richard Bentley (UK)", "1851-10-18", "Adventure"),
("9780060850524", "/books/brave_new_world.png", "Brave New World", "Aldous Huxley", "Chatto & Windus", "1932-02-17", "Dystopian"),
("9780486280615", "/books/adventures-of-huckleberry-finn.png", "The Adventures of Huckleberry Finn", "Mark Twain", "Chatto & Windus", "1884-12-10", "Adventure"),
("9780064471046", "/books/the-lion-the-witch-and-the-wardrobe.png", "The Lion, the Witch & the Wardrobe", "C.S. Lewis", "Geoffrey Bles", "1950-10-16", "Fantasy"),
("9780062315007", "/books/the-alchemist.png", "The Alchemist", "Paulo Coelho", "HarperCollins", "1988-01-01", "Fable"),
("9798374008258", "/books/the-picture-of-dorian-gray.png", "The Picture of Dorian Gray", "Oscar Wilde", "Lippincott's Monthly Magazine", "1890-06-20", "Gothic"),
("9781512308051", "/books/frankenstein.png", "Frankenstein", "Mary Shelley", "Lackington, Hughes, Harding, Mavor & Jones", "1818-01-01", "Gothic"),
("9780439023528", "/books/the-hunger-games.png", "The Hunger Games", "Suzanne Collins", "Scholastic Corporation", "2008-09-14", "Dystopian"),
("9780307588371", "/books/gone-girl.png", "Gone Girl", "Gillian Flynn", "Crown Publishing Group", "2012-06-05", "Psychological thriller"),
("9780698185395", "/books/the-girl-on-the-train.png", "The Girl on the Train", "Paula Hawkins", "Riverhead Books", "2015-01-13", "Psychological thriller"),
("9780375842207", "/books/the-book-thief.png", "The Book Thief", "Markus Zusak", "Picador", "2005-03-14", "Historical fiction"),
("9781594631931", "/books/the-kite-runner.png", "The Kite Runner", "Khaled Hosseini", "Riverhead Books", "2003-05-29", "Historical fiction"),
("9780274808328", "/books/the-da-vinci-code.png", "The Da Vinci Code", "Dan Brown", "Doubleday", "2003-03-18", "Mystery"),
("9780142424179", "/books/the-fault-in-our-stars.png", "The Fault in Our Stars", "John Green", "Dutton Books", "2012-01-10", "Young adult"),
("9780425232200", "/books/the-help.png", "The Help", "Kathryn Stockett", "Putnam", "2009-02-10", "Historical fiction"),
("9780385737951", "/books/maze-runner.png", "The Maze Runner", "James Dashner", "Delacorte Press", "2009-10-06", "Dystopian"),
("9780307949486", "/books/the-girl-with-the-dragon-tattoo.png", "The Girl with the Dragon Tattoo", "Stieg Larsson", "Norstedts Förlag", "2005-08-01", "Crime"),
("9780544336261", "/books/the-giver.png", "The Giver", "Lois Lowry", "Houghton Mifflin", "1993-04-26", "Dystopian"),
("9780345806789", "/books/the-shining.png", "The Shining", "Stephen King", "Doubleday", "1977-01-28", "Horror"),
("9780452282155", "/books/girl-with-a-pearl-earring.png", "The Girl with the Pearl Earring", "Tracy Chevalier", "HarperCollins", "1999-01-01", "Historical fiction"),
("9780316168816", "/books/the-lovely-bones.png", "The Lovely Bones", "Alice Sebold", "Little, Brown and Company", "2002-07-03", "Mystery"),
("9780307387899", "/books/the-road.png", "The Road", "Cormac McCarthy", "Alfred A. Knopf", "2006-09-26", "Post-apocalyptic"),
("9780385490818", "/books/the-handmaids-tale.png", "The Handmaid's Tale", "Margaret Atwood", "McClelland and Stewart", "1985-01-01", "Dystopian"),
("9780274992379", "/books/use-of-weapons.png", "Use of Weapons", "Iain M. Banks", "Orbit", "1990-09-13", "Science Fiction"),
("9798374735512", "/books/great-expectations.png", "Great Expectations", "Charles Dickens", "Chapman & Hall", "1861-08-01", "Historical Fiction"),
("9780441172719", "/books/dune.png", "Dune", "Frank Herbert", "Chilton Books", "1965-08-01", "Science Fiction"),
("9780553418026", "/books/the-martian.png", "The Martian", "Andy Weir", "Crown Publishing", "2011-11-01", "Science Fiction"),
("9780241991435", "/books/a-promised-land.png", "A Promised Land", "Barack Obama", "Crown Publishing", "2020-11-17", "Autobiography"),
("9780241448786", "/books/open-water.png", "Open Water", "Caleb Azumah Nelson", "Viking Press", "2021-02-04", "Fiction"),
("9780374104092", "/books/annihilation.png", "Annihilation", "Jeff VanderMeer", "Farrar, Straus and Giroux", "2014-02-04", "Science Fiction"),
("9798215872796", "/books/welcome-to-the-jungle.png", "Welcome to the Jungle", "Lauren Billups", "Torrid Books", "2015-03-01", "Fiction"),
("9780753553916", "/books/think-again.png", "Think Again", "Adam Grant", "WH Allen", "2021-02-02", "Non-fiction"),
("9780358469988", "/books/a-thousand-steps-into-night.png", "A Thousand Steps into Night", "Ben Pastor", "HarperCollins", "2022-03-01", "Fiction"),
("9780008532819", "/books/yellowface.webp", "Yellowface", "Rebecca F. Kuang", "HarperCollins", "2023-05-25", "Fiction");


CREATE TABLE listings (
  listing_id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID,
  isbn VARCHAR(13),
  cover_img VARCHAR(100),
  title VARCHAR(100),
  author VARCHAR(100),
  genre VARCHAR(50),
  publishedDate DATE,
  publisher VARCHAR(100),
  condition VARCHAR(50),
  notes VARCHAR(150),
  FOREIGN KEY (user_id) REFERENCES users (id)
);


INSERT INTO listings (user_id, isbn, cover_img, title, author, condition, notes)
VALUES
("9780441172719", "/books/dune.png", "Dune", "Frank Herbert", "Good", "Some wear on the cover"),
("9780553418026", "/books/the-martian.png", "The Martian", "Andy Weir", "Like New", "Pristine condition"),
("9780241991435", "/books/a-promised-land.png", "A Promised Land", "Barack Obama", "Poor", "Cover is torn"),
("9780241448786", "/books/open-water.png", "Open Water", "Caleb Azumah Nelson", "Like New", "Great condition"),
("9780374104092", "/books/annihilation.png", "Annihilation", "Jeff VanderMeer", "Acceptable", "Some pages are dog-eared"),
("9798215872796", "/books/welcome-to-the-jungle.png", "Welcome to the Jungle", "Lauren Billups", "Good", "Some wear on the cover"),
("9780753553916", "/books/think-again.png", "Think Again", "Adam Grant", "Like New", "Pristine condition"),
("9780358469988", "/books/a-thousand-steps-into-night.png", "A Thousand Steps into Night", "Ben Pastor", "Poor", "Some pages missing");