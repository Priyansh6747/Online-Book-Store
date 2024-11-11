## Installation

To run this project locally, follow these steps:

1. **Clone the repository**:
    ```sh
    git clone https://github.com/yourusername/Online-Book-Store.git
    ```

2. **Navigate to the project directory**:
    ```sh
    cd Online-Book-Store
    ```
    
3. Use the following SQL schema
   ```sh
        CREATE TABLE Book (
        B_id INT AUTO_INCREMENT PRIMARY KEY,
        Name VARCHAR(255) NOT NULL,
        URL VARCHAR(255),
        Price DECIMAL(10, 2) DEFAULT 0.00,
        Rating DECIMAL(3, 1) DEFAULT 0.0
    );
    
    CREATE TABLE Author (
        B_id INT,
        Author_Name VARCHAR(255) NOT NULL,
        Author_Bio TEXT,
        Image VARCHAR(255) NOT NULL,
        PRIMARY KEY (B_id),
        FOREIGN KEY (B_id) REFERENCES Book(B_id) ON DELETE CASCADE
    );
    
    CREATE TABLE Customer (
        UID INT AUTO_INCREMENT PRIMARY KEY,
        Name VARCHAR(255) NOT NULL,
        Username VARCHAR(255) NOT NULL UNIQUE,
        Password VARCHAR(255) NOT NULL,
        Email VARCHAR(255) UNIQUE
    );
    
    CREATE TABLE Cart (
        UID INT,
        B_id INT,
        Quantity INT DEFAULT 1,
        PRIMARY KEY (UID, B_id),
        FOREIGN KEY (UID) REFERENCES Customer(UID) ON DELETE CASCADE,
        FOREIGN KEY (B_id) REFERENCES Book(B_id) ON DELETE CASCADE
    );
   INSERT INTO `book` (`B_id`, `Name`, `URL`, `Price`, `Rating`) VALUES
   (1, 'When We Cease to Understand the World', 'https://static01.nyt.com/images/2024/06/30/books/best-books-jjksd01sj-flat-slide-OQPJ/best-books-jjksd01sj-flat-slide-OQPJ-articleLarge.png', 32.22, 4.5),
   (2, 'How to Be Both', 'https://static01.nyt.com/images/2024/06/30/books/best-books-jjksd01sj-flat-slide-N0L6/best-books-jjksd01sj-flat-slide-N0L6-articleLarge.png', 29.24, 3.6),
   (3, 'Station Eleven', 'https://static01.nyt.com/images/2024/06/30/books/best-books-jjksd01sj-flat-slide-52GM/best-books-jjksd01sj-flat-slide-52GM-articleLarge.png', 40.44, 5.0),
   (4, 'The Collected Stories of Lydia Davis', 'https://static01.nyt.com/images/2024/06/30/books/best-books-jjksd01sj-flat-slide-R7P7/best-books-jjksd01sj-flat-slide-R7P7-articleLarge.png', 22.70, 3.0),
   (10, 'Fourth Wing', 'https://img1.od-cdn.com/ImageType-400/1694-1/%7B9A02D69C-6055-454B-93F2-74DC9B361AAF%7DIMG400.JPG', 18.00, 4.5),
   (11, 'Happy Place', 'https://th.bing.com/th/id/OIP.A_c8bCthT-pOcL22lmaY2QHaLZ?rs=1&pid=ImgDetMain', 14.00, 4.0),
   (12, 'Yellowface', 'https://th.bing.com/th/id/OIP.-8MZUu5ZVTdCohMfEwjw6wHaLR?rs=1&pid=ImgDetMain', 17.00, 3.8),
   (13, 'The Berry Pickers', 'https://m.media-amazon.com/images/I/913M9KQ+H0L._AC_UF350,350_QL50_.jpg', 13.00, 3.5),
   (14, 'Holly', 'https://d28hgpri8am2if.cloudfront.net/book_images/onix/cvr9781668016138/holly-9781668016138_hr.jpg', 18.00, 3.3),
   (16, 'The Fraud', 'https://th.bing.com/th/id/OIP.b4pQqomYwmBpvBd1JftJCgAAAA?rs=1&pid=ImgDetMain', 20.00, 3.0),
   (17, 'The Covenant of Water', 'https://www.easterneye.biz/wp-content/uploads/2023/05/Book-Review-The-Covenant-of-Water-11884.jpg', 19.00, 2.8),
   (18, 'The Bee Sting', 'https://cdn2.penguin.com.au/covers/original/9780241984406.jpg', 22.00, 1.0);

   INSERT INTO `author` (`B_id`, `Author_Name`, `Author_Bio`, `Image`) VALUES
   (1, 'Benjamín Labatut', ' A Chilean author, Labatut blends fact with fiction, often exploring themes of scientific discovery, madness, and existential crisis. His style uniquely merges historical facts with imagination, adding philosophical depth to his storytelling.', 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d8/Benjamin_Labatut_%28cropped%29.jpg/220px-Benjamin_Labatut_%28cropped%29.jpg'),
   (2, 'Ali Smith', 'A Scottish writer known for her innovative prose, Smith challenges traditional storytelling, often exploring themes of time, art, and identity. She has won multiple awards and is celebrated for her thought-provoking, experimental style.', 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a5/AliSmith2011_%28cropped%29.png/220px-AliSmith2011_%28cropped%29.png'),
   (3, 'Emily St. John Mandel', 'A Canadian novelist, Mandel is known for blending literary fiction with speculative themes, often examining resilience and memory. Station Eleven, her acclaimed novel, explores a world reshaped by catastrophe.', 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/07/Emily_St_John_Mandel_-_2017.jpg/220px-Emily_St_John_Mandel_-_2017.jpg'),
   (4, 'Lydia Davis', 'An American writer and translator, Davis is celebrated for her concise, often flash-fiction-style works that distill modern life’s nuances. She has received major accolades, including a MacArthur Fellowship, for her impact on American literature.', 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e1/Lydia_Davis_at_Kelly_Writers_House_%28cropped%29.jpg/220px-Lydia_Davis_at_Kelly_Writers_House_%28cropped%29.jpg'),
   (10, 'Rebecca Yarros', 'Yarros crafts bestsellers blending romance with fantasy and military life, drawing from her experience as a military wife. She’s a BookTok favorite with immersive, heartfelt stories of courage and love.', 'https://th.bing.com/th/id/OIP.6yS3tWV1eQHmcz9vpJUoAAHaLH?rs=1&pid=ImgDetMain'),
   (11, 'Emily Henry', 'Known for her bestselling romantic comedies, Henry captures relatable modern relationships with wit and sincerity, often exploring growth and self-discovery amid heartfelt romance in vibrant, memorable settings.', 'https://th.bing.com/th/id/OIP.2au9oLKHBbBbbNyNDvhbcQHaHO?rs=1&pid=ImgDetMain'),
   (12, 'R.F. Kuang', 'An acclaimed author and scholar, Kuang uses satire and speculative fiction to confront issues of race, identity, and ethics within the publishing industry, drawing on her unique multicultural background.', 'https://res.cloudinary.com/bizzaboprod/image/upload/c_crop,g_custom,f_auto/v1634779547/k1bo5zkw3wikrhpqcdbb.jpg'),
   (13, 'Amanda Peters', 'A Canadian author of indigenous heritage, Peters crafts character-driven stories exploring family dynamics, cultural identity, and resilience, bringing new perspectives to contemporary literary fiction.', 'https://th.bing.com/th/id/OIP.U8YIH1PIt_TKw1MkKponJQHaIR?rs=1&pid=ImgDetMain'),
   (14, 'Stephen King', 'Prolific for over five decades, King’s horror, suspense, and supernatural works have captivated millions, with unforgettable characters and psychological insight. He remains a monumental influence in contemporary literature.', 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e3/Stephen_King%2C_Comicon.jpg/800px-Stephen_King%2C_Comicon.jpg'),
   (16, 'Zadie Smith', 'British author Smith is renowned for witty, complex narratives exploring multiculturalism, identity, and class, creating a dynamic blend of humor and social critique in novels, essays, and short stories.', 'https://th.bing.com/th/id/OIP.zBmcU8AszqLM4Wjn4FagGgHaHW?rs=1&pid=ImgDetMain'),
   (17, 'Abraham Verghese', 'Physician and author, Verghese combines medical knowledge with deeply humanistic storytelling, shedding light on cultural heritage, health, and healing in meticulously researched and acclaimed historical novels.', 'https://th.bing.com/th/id/OIP.U13rrjU9fW6Czhea3QMhDgHaLG?rs=1&pid=ImgDetMain'),
   (18, 'Paul Murray', 'Irish author Murray’s darkly humorous novels explore complex family relationships, societal pressures, and personal failures, offering readers a distinctive voice with a balance of satire and empathy.', 'https://media.gettyimages.com/id/1712255712/photo/cheltenham-england-paul-murray-irish-author-of-the-bee-sting-and-shortlisted-for-the-booker.jpg?s=612x612&w=0&k=20&c=KcNSwbPWCovaa9xSXiukbWeIze0fnJwDkwh54ntdtWw=');
   ```
      
4. **Paste the `OnlineBookStore` folder from the backend repo in your `XMAPP/htdocs`**

6. **Open `HomePage.html` in your preferred web browser**

## Usage

After opening `HomePage.html`, you can start browsing the collection of available books. Use the search bar to find specific titles or authors. For a full experience, ensure to complete the user account setup and utilize the shopping cart feature.

## Contributing

Contributions are welcome! Please follow these guidelines to contribute:

1. Fork the project.
2. Create a new branch (`git checkout -b feature/YourFeature`).
3. Commit your changes (`git commit -m 'Add some feature'`).
4. Push to the branch (`git push origin feature/YourFeature`).
5. Open a pull request.



Thank you for exploring the Online Book Store! Happy reading!
