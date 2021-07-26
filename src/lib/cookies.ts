import { serialize, parse } from 'cookie';
import { NextApiRequest, NextApiResponse } from 'next';


export type Cookies = {
    [key: string]: string;
};

const TOKEN_COOKIE_NAME = 'token';

export const MAX_AGE = 60 * 60;

export function setTokenCookie(response: NextApiResponse, token: string): void {
    const cookie = serialize(TOKEN_COOKIE_NAME,
        token, {
        maxAge: MAX_AGE,
        expires: new Date(Date.now() + MAX_AGE * 1000),
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        path: '/',
        sameSite: 'lax',
    });
    response.setHeader('Set-Cookie', cookie);
}

export function removeTokenCookie(response: NextApiResponse): void {
    const cookie = serialize(TOKEN_COOKIE_NAME,
        '', {
        maxAge: -1,
        path: '/'
    });
    response.setHeader('Set-Cookie', cookie);
}

export function parseCookies(request: NextApiRequest): Cookies {
    if (request.cookies) {
        return request.cookies;
    }
    const cookie = request.headers?.cookie;
    return parse(cookie || '');
}

export function getTokenCookie(request: NextApiRequest): string {
    const cookies = parseCookies(request);    
    return cookies[TOKEN_COOKIE_NAME];
}