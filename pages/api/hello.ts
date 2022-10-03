// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { getToken } from 'next-auth/jwt'

type Data = {
  name: string
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const secret = "3yiQG0mWoQc5BkS3Um/ZZGAfOBBQzN4NyNvK04cis7Y=";
  const token = await getToken({ req, secret })
  res.status(200).json({ name: 'John Doe' })
}
