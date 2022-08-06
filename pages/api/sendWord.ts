// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import words from "../../data/words.json";

type Data = {
  hasWord: boolean;
}

export default function handler(
    req: NextApiRequest,
    res: NextApiResponse<Data>
) {
    const requestWord = JSON.parse(req.body);
    const hasWord = words.some(word => word.toLocaleLowerCase() === requestWord.toLocaleLowerCase());
    if (hasWord) {
        return res.status(200).json({ hasWord: true });
    }
    
    return res.status(404).json({ hasWord: false });
}
