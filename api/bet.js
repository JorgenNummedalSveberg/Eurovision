import { db } from '@vercel/postgres';

export default async function handler(req, res) {
    const client = await db.connect();
    if (req.method === "POST") {
        const key = req.body["username"];
        const value = req.body["country_order"];
        await client.sql`INSERT INTO bets (username, country_order) VALUES (${key}, ${value})`;
        res.status(200).send(JSON.stringify('bet added'));
    } else if (req.method === "GET") {
        const bet = await client.sql`SELECT * FROM bets WHERE key = ${req.body["username"]};`;
        return res.status(200).json({ bet });
    }

}
