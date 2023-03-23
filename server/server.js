import express from 'express';
import * as cheerio from "cheerio";
import cors from 'cors';

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.raw());
app.use(express.urlencoded({ extended: true}));

// fetches the html of the requested url
async function requestUrlHtml(url) {
    let result = null;

    try{
        result = await fetch(url, {
            method: "GET",
            headers: {
                "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/108.0.0.0 Safari/537.36"
            },
        });
    }
    catch(err){
        console.log(err);
        return;
    }
   
    return result.text();
}

app.post("/api/scrape", async (req, res) => {
    // get the url requested to scrape from the user
    const requestUrl = req.body.url;
    
    // get the search term that the user requests
    const searchTerm = req.body.word;
    
    // get the html data from the requested url
    const htmlData = await requestUrlHtml(requestUrl);
    
    if(htmlData){
        // parse the html page for the search term and return the occurrences
        const $ = cheerio.load(htmlData);
        const htmlBodyText = $('html').text().toLowerCase();
        const searchTermOccurence = htmlBodyText.split(searchTerm.toLowerCase()).length - 1;

        // return a OK status and an object that includes the request data : url/term/occurence/date
        res.status(200).send({
            "url": requestUrl,
            "searchTerm": searchTerm,
            "occurrence": searchTermOccurence,
            "date": Date.now()
        });
    }else{
        // the url status that the user provided is invalid
        res.status(400).send({
            "error": "There was an issue while trying to fetch the url"
        });
    }
});

app.listen(8080, () => console.log(`Server listening on 8080`));