// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import words from "../../data/words.json";

type Data = {
  word: string
}

export default function handler(
    req: NextApiRequest,
    res: NextApiResponse<Data>
) {
    const randomWordIndex = Math.floor(Math.random() * words.length);
    const word = words[randomWordIndex];
    res.status(200).json({ word });
}
