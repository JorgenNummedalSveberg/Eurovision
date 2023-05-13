import { db } from '@vercel/postgres';

export default async function handler(req, res) {
    const client = await db.connect();
    if (req.method === 'POST') {
        try {
            await client.sql`INSERT INTO config (setting, value) VALUES (${req.body["setting"]}, ${req.body["value"]})`;
            res.status(200).send(JSON.stringify('config added'));
        } catch (e) {
            await client.sql`UPDATE scores SET value = ${req.body["value"]} WHERE setting = ${req.body["setting"]}`;
            res.status(500).send(JSON.stringify(e));
        }
    } else if (req.method === 'GET') {
        const bool = await client.sql`SELECT * FROM config WHERE setting = ${req.body["setting"]};`;
        return res.status(200).json(bool);
    }
}
