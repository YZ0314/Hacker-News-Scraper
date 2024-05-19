# 🐺 QA Wolf Take Home Assignment

This project is a web scraper for extracting the top 10 articles from Hacker News and saving them to a CSV file.


## Features

- Extracts the title and URL of the top 10 articles
- Saves data to a CSV file
- Automated test cases to test script usability


## Usage

1. Install dependencies:
    ```sh
    npm install
    npm install playwright
    npm install csv-writer
    ```

2. Run the scraper:
    ```sh
    node index.js
    ```

3. Check the output CSV file:
    - `hacker-news-top10.csv` will be generated in the project directory

4. Run test case
      ```sh
    npm test
    ```

## Project Structure

- `index.js`: Main script for scraping and saving data
- `hacker-news-top-10.csv`: Output CSV file with the top 10 articles
- `tests/saveHackerNewsArticles.test.js`: Test case

