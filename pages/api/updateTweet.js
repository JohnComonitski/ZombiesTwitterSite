import { updateTweet } from "../../lib/redis";

export default async function handler(req, res) {
    const sentiment = req.query.sentiment
    const newSentiment = req.query.newsentiment
    const id = req.query.id
    await updateTweet(newSentiment,sentiment, id);
    res.status(200).send("ok")
}