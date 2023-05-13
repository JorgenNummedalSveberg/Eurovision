import { db } from '@vercel/postgres';

export default async function handler(req, res) {
    const client = await db.connect();
    if (req.method === "POST") {
        const key = req.body["code"];
        const value = req.body["details"];
        try {
            await client.sql`INSERT INTO scores (code, details) VALUES (${key}, ${value})`;
        } catch {
            await client.sql`UPDATE scores SET details = ${value} WHERE code = ${key}`;
        }
        res.status(200).send(JSON.stringify('scores added'));
    } else if (req.method === "PUT") {
        const key = req.body["code"];
        const value = req.body["details"];
        await client.sql`UPDATE scores SET details = ${value} WHERE code = ${key}`;
        res.status(200).send(JSON.stringify('scores added'));
    } else if (req.method === "GET") {
        const {rows} = await client.sql`SELECT * FROM scores ORDER BY (details->>'judScore')::numeric + (details->>'audScore')::numeric DESC;`;
        return res.status(200).json({ rows });
    } else if (req.method === 'DELETE') {
        const code = req.body["code"];
        await client.sql`DELETE FROM scores WHERE code = ${code};`;
        return res.status(200).json("deleted");
    }

}
