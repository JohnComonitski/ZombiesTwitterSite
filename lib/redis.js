import { Client, Entity, Schema } from "redis-om"

async function connect(){
    const client = new Client();
    await client.open(process.env.REDIS_URL)
    return client
    /*
    try{
        if(!client.isOpen()){
            await client.open(process.env.REDIS_URL)
        }
    }
    catch(e){
        await client.open(process.env.REDIS_URL)
    }
    */
}

class Tweet extends Entity{}
let schema = new Schema(
    Tweet,
    {
        tweet: {type: 'text', textSearch:true},
        username: {type: 'string', textSearch:true},
        at: {type: 'string'},
        img: {type: 'string'},
        id: {type: 'string', textSearch:true},
        positive: {type: 'string'},
        incorrect: {type: 'string', textSearch:true}
    },
    {
        dataStructure: 'JSON',
    }
);

export async function createTweet(data){
    const client = await connect();
    const repository = client.fetchRepository(schema)
    const tweet = repository.createEntity(data)

    const id = await repository.save(tweet)
    await client.close();
    return id
} 

export async function createIndex(){
    const client = await connect();

    const repository = client.fetchRepository(schema)    
    await repository.createIndex()

    await client.close();
}

export async function searchTweets(q){
    const client = await connect();
    const repository = client.fetchRepository(schema)    
    const tweets = await repository.search()
        .where('tweet').matches(q)
        .or("username").eq(q)
        .return.all();
    await client.close();

    if(tweets.length === 0){
        console.log("Nothing Found")
        return []
    }
    else{
        if(tweets.length > 10){
            return tweets.slice(0, 10)
        }
        return tweets
    }
}

export async function updateTweet(newSentiment, sentiment, id){
    const client = await connect();
    var incorrect = ""
    if(sentiment === newSentiment){
        incorrect = "false"
    }
    else{
        incorrect = newSentiment
    }
    
    const repository = client.fetchRepository(schema)    
    const tweet = await repository.search()
        .where('id').eq(id)
        .return.all();

    var key= `Tweet:${tweet[0].entityId}`
    var newTweet = {
        tweet: tweet[0]["entityFields"]["tweet"]["_value"],
        username: tweet[0]["entityFields"]["username"]["_value"],
        at: tweet[0]["entityFields"]["at"]["_value"],
        img: tweet[0]["entityFields"]["img"]["_value"],
        id: tweet[0]["entityFields"]["id"]["_value"],
        positive: tweet[0]["entityFields"]["positive"]["_value"],
        incorrect: incorrect
    }
    
    await client.jsonset(key, newTweet)
    
    await client.close();
    return ""
}

export async function getTweet(){
    const client = await connect();
    const repository = client.fetchRepository(schema)    
    const tweets = await repository.search()
        .where('incorrect').eq('null')
        .return.all();
    await client.close();

    if(tweets.length === 0){
        return {}
    }
    else{
        return tweets[0]
    }
}

export async function getStats(){
    const client = await connect();
    const stats = await client.jsonget('stats')
    await client.close();
    return stats
}