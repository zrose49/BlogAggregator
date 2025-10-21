import { fetchFeed } from "src/lib/rss";

export async function handlerAgg() {
    let data = await fetchFeed("https://www.wagslane.dev/index.xml");
    let itemString = JSON.stringify(data,null,2);

    console.log(itemString);

}