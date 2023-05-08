import { db } from '@vercel/postgres';

export default async function handler(req, res) {
    const client = await db.connect();
    const {rows} = await client.sql`SELECT * FROM bets;`;
    return res.status(200).json({ rows });
}

function sortBets(bets) {

}
