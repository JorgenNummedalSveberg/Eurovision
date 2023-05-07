import { get } from '@vercel/edge-config';

export default async function handler(req, res) {
    const greeting = await get('greeting');
    res.status(200).send(JSON.stringify(greeting));
    console.log("dicks");
}

//export default function handler(req, res) {
//     res.status(200).send("ping");
//     console.log(greeting);
// }
