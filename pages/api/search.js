import { searchTweets } from "../../lib/redis";

export default async function handler(req, res) {
    const q = req.query.q
    const tweets = await searchTweets(q);
    res.status(200).json({tweets})
}