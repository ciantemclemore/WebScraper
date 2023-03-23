# WebScraper

- Open the project in the root directory
- Open your command prompt or terminal
- Run the ‘npm install’ command in the root directory
- Change directories (cd command) into the ‘client’ subfolder and run ‘npm install’
- Change directories (cd command) into the ‘server’ subfolder and run ‘npm install’
- Change directories (cd command) back to the root directory and run the command ‘npm run start’. This will start the node API as well as the client application. There should be a link for the generated ‘URL’ in your terminal/command prompt, which you can click to run the react application. If you do not see the link, you can go to ‘http://localhost:5173’, as this is the default URL and port for the application.

# About

For this coding challenge, I wanted to approach the problem with a simple solution. I wanted to make a simple request to an API and return the necessary results. I decided to go with a node API (express), as I have some common knowledge in this area.

  I decided to scrape the html contents of the requested website using a light npm package called cheerio. First, I requested the HTML contents of the page using JavaScript’s fetch API and then I used cheerio to parse the webpage. 
  
  One of the issues I had while addressing this problem was that the requested search term could appear in areas other than what is displayed to the user. For example, the user’s search term could be found in HTML comments and even reserved words in the JavaScript language (ex. ‘this’ keyword). 
  
  I think this problem could be addressed by not extracting the entire HTML content. If I had more time, I’d likely only pull specific html elements that contain text such as div’s, p’s etc. In addition, there are edge cases where the request may not pick up every occurrence of the word because certain sections of the website have yet to be loaded. One way to address this issue would be to use a tool that interacts with the website as a user to execute the JavaScript code and get the dynamic content.
  
  In all, I spent about 3 hours working on this coding challenge and if given more time, I’d update my node API to check for additional edge cases to get a closer exact count on the occurrence of a word depending on if the webpage is static or dynamic and exclude unneeded data such as word matches found in comments or JavaScript code. I’d also do some additional styling and design to the react application to better its look and feel.
