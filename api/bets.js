import { db } from '@vercel/postgres';

export default async function handler(request, response) {
    const client = await db.connect();
    const bets = await client.sql`SELECT * FROM Bets;`;
    return response.status(200).json({ bets });
}
