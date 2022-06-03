import { createTweet } from "../../lib/redis";

export default async function handler(req, res) {
    const id = await createTweet(req.body);
    console.log(req.body)
    res.status(200).send('Tweet Added')
}