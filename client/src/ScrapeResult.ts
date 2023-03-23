class ScrapeResult {
    public url: string = "";
    public searchTerm: string = "";
    public occurrence: number = 0;
    public date: Date = new Date();

    constructor(data: Partial<ScrapeResult>) {
        Object.assign(this, data);
    }

    public static fromJSON = (json: string): ScrapeResult => {
        const jsonObject = JSON.parse(json);
        return new ScrapeResult(jsonObject);
    };  
}

export default ScrapeResult;