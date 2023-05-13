import { db } from '@vercel/postgres';

export default async function handler(req, res) {
    const client = await db.connect();
    if (req.method === "POST") {
        const values = JSON.parse(req.query.json)
        let sqlScript = `INSERT INTO scores (code, details) \n VALUES \n `;
        for (let i = 0; i < values.length; i++){
            let x = values[i];
            let code = x.code;
            delete x.code;
            if (i !== values.length-1) {
                sqlScript += "  ('"+code+"', '"+JSON.stringify(x)+"'),"
            } else {
                sqlScript += "('"+code+"', '"+JSON.stringify(x)+"');"
            }
        }
        console.log(sqlScript)
        await client.sql`${sqlScript}`;
        return res.status(200).json("uploaded");
    }

}
