import {XMLParser} from 'fast-xml-parser';

type RSSFeed = {
  channel: {
    title: string;
    link: string;
    description: string;
    item: RSSItem[];
  };
};

type RSSItem = {
  title: string;
  link: string;
  description: string;
  pubDate: string;
};

export async function fetchFeed(feedURL: string): Promise<RSSFeed> {

    const response = await fetch(feedURL, 
    {
        method: 'GET',
        headers: {
            'User-Agent': 'gator',
            accept: "application/rss+xml"
        }
    }
);

if(!response.ok) {
    throw new Error(`There was an error fetching the data: ${response.status} ${response.statusText}`);
}

const data = await response.text();

//Convert the XML data into an object with the parser
const parser = new XMLParser()
let parsedData = parser.parse(data);

const channel = parsedData.rss?.channel;
if(!channel) {
    throw new Error("There was an error parsing the data, no channel field is present");
}

const items: any[] = Array.isArray(channel.item) ? channel.item : [channel.item];
const RSSitems: RSSItem[] = [];

//Verify title, link, description fields exist in data
if(!items[0].title || !items[0].link || !items[0].description || !items[0].pubDate) {
    throw new Error("Check data, there are missing fields from the parsed object");
}

//console.log(items);
for(let item of items) {
    if(item.title && item.link && item.description && item.pubDate) {
    let rssObj: RSSItem = {
        title: item.title,
        link: item.link,
        description: item.description,
        pubDate: item.pubDate
    }
    //console.log(rssObj);
    RSSitems.push(rssObj);
}
}
//console.log(RSSitems);

const RSSFeed: RSSFeed = {
    channel: {
        title: parsedData.rss.channel.title,
        link: parsedData.rss.channel.link,
        description: parsedData.rss.channel.description,
        item: RSSitems
    }
} 

return RSSFeed;
}

