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
    
3. **Use the following SQL schema
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
**.
   
5. **Place the backend\OnlineBookStore in your XMAPP\htdocs**.
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
