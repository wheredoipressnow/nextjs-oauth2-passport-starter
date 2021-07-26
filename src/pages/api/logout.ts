import { removeTokenCookie } from '@/lib/cookies';
import type { NextApiRequest, NextApiResponse } from 'next'

export default function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    // todo: Revoke token.
    
    removeTokenCookie(res);    
    res.writeHead(302, { Location: '/' });
    res.end();
}
