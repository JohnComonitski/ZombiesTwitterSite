import { getStats } from "../../lib/redis";

export default async function handler(req, res) {
    const stats = await getStats();
    res.status(200).json(stats)
}