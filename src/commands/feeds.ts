import { channel } from 'diagnostics_channel';
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

let parser = new XMLParser()

export async function fetchFeed(feedURL: string): Promise<RSSFeed> {
const response = await fetch(feedURL, 
    {
        method: 'GET',
        headers: {
            'User-Agent': 'gator',
            'Content-Type': 'application/xml'
        }
    }
);

const data = await response.text();

let parsedData = parser.parse(data);

//console.log(parsedData);

let RSSitems: RSSItem[] = [];
let items = [...parsedData.rss.channel.item];
for(let item of items) {
    let rssObj: RSSItem = {
        title: item.title,
        link: item.link,
        description: item.description,
        pubDate: item.pubDate
    }
    //console.log(rssObj);
    RSSitems.push(rssObj);
}
//console.log(RSSitems);

let RSSFeed: RSSFeed = {
    channel: {
        title: parsedData.rss.channel.title,
        link: parsedData.rss.channel.link,
        description: parsedData.rss.channel.description,
        item: RSSitems
    }
} 

return RSSFeed;
}

export async function handlerAgg() {
    let data = await fetchFeed("https://www.wagslane.dev/index.xml");
    let itemString = JSON.stringify(data,null,2);

    console.log(itemString);

}