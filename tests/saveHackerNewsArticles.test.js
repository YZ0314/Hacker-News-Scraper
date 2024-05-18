const { test, expect } = require("playwright/test");
const fs = require('fs');
const path = require('path');
const { saveHackerNewsArticles } = require("..");

test.describe('Hacker News Scraper', () => {
    test.beforeAll(() => {
        //Clear previous CSV file
        const csvFilePath = path.join(__dirname, '../hacker-news-top10.csv');
        if (fs.existsSync(csvFilePath)) {
            fs.unlinkSync(csvFilePath);
        }
    });

    test('should scrape top 10 title and url of articles and save to CSV', async () => {
        await saveHackerNewsArticles();

        //Verify that the CSV file is generated
        const csvFilePath = path.join(__dirname, '../hacker-news-top10.csv');
        expect(fs.existsSync(csvFilePath)).toBe(true);

        //Verify CSV file content
        const csvContent = fs.readFileSync(csvFilePath, 'utf8');
        const lines = csvContent.trim().split('\n');
        expect(lines.length).toBe(11); // 1 header + 10 rows

    })
});



