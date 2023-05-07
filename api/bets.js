import { get } from '@vercel/edge-config';

export default async function handler(req, res) {
    const bets = await get('bets');
    res.status(200).send(JSON.stringify(bets));
}
