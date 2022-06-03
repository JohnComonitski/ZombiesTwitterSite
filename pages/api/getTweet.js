import { getTweet } from "../../lib/redis";

export default async function handler(req, res) {
    const tweet = await getTweet();
    res.status(200).json({tweet})
}