import Iron from '@hapi/iron';
import { NextApiRequest, NextApiResponse } from 'next';
import { MAX_AGE, setTokenCookie, getTokenCookie } from './cookies';

const SESSION_PASSWORD = process.env.SESSION_PASSWORD;

export type UserSession = {
    jwt: any,
    createdAt: number,
    maxAge: number
}

export async function setUserSession(response: NextApiResponse, details: any): Promise<void> {
    const createdAt = Date.now();
    const session: UserSession = {
        jwt: details,
        createdAt,
        maxAge: MAX_AGE
    };
    const sealedToken = await Iron.seal(session, SESSION_PASSWORD as string, Iron.defaults);
    setTokenCookie(response, sealedToken);
}

export async function getUserSession(request: NextApiRequest): Promise<UserSession | undefined> {
    const sealedToken = getTokenCookie(request);    
    if (!sealedToken) {
        return;
    }
    const session: UserSession = await Iron.unseal(sealedToken, SESSION_PASSWORD as string, Iron.defaults);
    const expiresAt = session.createdAt + session.maxAge * 1000;
    if (Date.now() > expiresAt) {
        throw new Error('Session is expired');
    }
    return session;
}