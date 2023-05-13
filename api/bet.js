import { db } from '@vercel/postgres';

export default async function handler(req, res) {
    const client = await db.connect();
    if (req.method === "POST") {
        const key = req.body["username"].trim();
        const value = req.body["country_order"];
        client.sql`SELECT * FROM config WHERE setting = 'closed';`.then(closed => {
            if (closed.rows.find(x => x.setting === 'closed')["value"]) return res.status(403).json("betting has closed");
                client.sql`INSERT INTO bets (username, country_order)
  VALUES (${key}, ${value})
  ON CONFLICT (username)
  DO UPDATE SET country_order = ${value}`.then(() => {
                    res.status(200).send(JSON.stringify('bet added'));
                });
        })
    } else if (req.method === "GET") {
        const bet = await client.sql`SELECT * FROM bets WHERE key = ${req.body["username"]};`;
        return res.status(200).json({ bet });
    }

}
