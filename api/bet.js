import { get, set} from '@vercel/edge-config';

export default async function handler(req, res) {
    if (req.method === "POST") {
        const bets = await get('bets');
        bets[req.body["username"]] = req.body["country_order"];
        await set('bets', bets);
        res.status(200).send(JSON.stringify('bet added'));
    } else if (req.method === "GET") {
        const bets = await get('bets');
        if (bets[req.body["username"]]) {
            res.status(200).send(JSON.stringify(bets[req.body["username"]]));
        } else {
            res.status(404).send(JSON.stringify("no bet under usename"))
        }
    }
}
