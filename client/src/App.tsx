import { useState, useEffect } from 'react'
import './App.css'
import ScrapeResult from './ScrapeResult';

function App() {
  const [url, setUrl] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [scrapeResult, setScrapeResult] = useState<ScrapeResult>();
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  async function handleScrapeClick(){
    setIsLoading(true);
    
    const body = {
      "url": url,
      "word": searchTerm
    };

    let response: Response = await fetch("http://localhost:8080/api/scrape", { 
      method: "POST", 
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(body),
    });  
    
    let jsonText = await response.text();

    if(response.status == 200){
      let scrape: ScrapeResult =  ScrapeResult.fromJSON(jsonText);
      setError("");
      setScrapeResult(scrape);
    }
    else if(response.status == 400){
      setScrapeResult(undefined);
      setError(JSON.parse(jsonText).error);
    }

    setIsLoading(false);
  }

  return (
    <div className="App">
     <div className='search-container'>
      <input required type='text' placeholder='Enter url to search' onChange={(e) => setUrl(e.currentTarget.value)} />
      <input required type='text' placeholder='Enter term to find' onChange={(e) => setSearchTerm(e.currentTarget.value)} />
      <button disabled={url == "" || searchTerm == ""} onClick={handleScrapeClick}>Scrape</button>
     </div>
     <div className='result-container'>
        {isLoading ? (
          <div>Scraping...</div>
          ) : scrapeResult ? (
            <div className='results'>
              <div className='result-area'>
                <strong>URL: </strong>
                <p>{scrapeResult?.url}</p>
              </div>
              <div className='result-area'>
                <strong>Term: </strong>
                <p>{scrapeResult?.searchTerm}</p>
              </div>
              <div className='result-area'>
                <strong>Occurence: </strong>
                <p>{scrapeResult?.occurrence}</p>
              </div>
              <div className="result-area">
                <strong>Date: </strong>
                <p>{`${new Date(scrapeResult?.date)}`}</p>
              </div>
           </div>
          ) : (
            <div>{error}</div>
          )}
     </div>
    </div>
  )
}

export default App
