// EDIT THIS FILE TO COMPLETE ASSIGNMENT QUESTION 1
const { chromium } = require("playwright");
const { createObjectCsvWriter } = require('csv-writer');

async function saveHackerNewsArticles() {
  // launch browser
  const browser = await chromium.launch({ headless: false });
  const context = await browser.newContext();
  const page = await context.newPage();

  // Add random waiting time to simulate user behavior（In order to pass the test case,
  // we need to simulate the request interval sent by real users to Hacker News. 
  // Otherwise, when running the test case,
  // Hacker News will temporarily restrict access because the same IP address sends too many requests at the same time.）
  await page.waitForTimeout(Math.random() * 5000 + 5000); // Wait 5-10 seconds

  // go to Hacker News
  await page.goto("https://news.ycombinator.com");
 
  
  //get the top 10 articles
  //Only select links in .titleline and exclude content in sitebit comhead
  const articles = await page.$$eval('td .title .titleline > a', links => {
    return links.slice(0, 10).map(link => ({
      title: link.innerText,
      url: link.href
    }))

  })

  //Close browser
  await browser.close();

  //Save to CSV file
  const csvWirter = createObjectCsvWriter({
    path: 'hacker-news-top10.csv',
    header: [
      { id: 'title', title: 'Title' },
      { id: 'url', title: 'URL' }
    ]
  });

  //Add error handling mechanism
  try {
    await csvWirter.writeRecords(articles);
    console.log("The CSV file was written successfully");
  } catch (error) {
    console.error('Error occurred:', error);
  }

}

(async () => {
  await saveHackerNewsArticles();
})();

//Export method, used to run test cases
module.exports = { saveHackerNewsArticles };
