import { useEffect } from 'react'
import Router from 'next/router'
import useSWR from 'swr'

type Props = {
    redirectTo?: string,
    redirectIfFound?: boolean
}

export type User = {
    claims: Claims;
}

// todo: Generic claims. Update.
export interface Claims {
    sub: string;
    name: string;
    updated_at: any;
}


const fetcher = (url: string): any => fetch(url)
    .then(r => r.json())
    .then(data => {
        return {
            user: data?.user || null
        }
    });

export function useUser({ redirectTo, redirectIfFound } = {} as Props) {
    const { data, error } = useSWR('/api/user', fetcher);
    const user = data?.user;
    const finished = Boolean(data);
    const hasUser = Boolean(user);

    useEffect(() => {
        if (!redirectTo || !finished) {
            return;
        }

        if (
            (redirectTo && !redirectIfFound && !hasUser) ||
            (redirectIfFound && hasUser)
        ) {
            Router.push(redirectTo);
        }
    }, [redirectTo, redirectIfFound, finished, hasUser]);
    return error ? null : user;
}


async function retrieveUserClaims(token: string): Promise<Claims | null> {
    try {
        const res = await fetch(
            process.env.OAUTH_USERINFO_ENDPOINT as string,
            {
                headers: {
                    "Content-type": "application/x-www-form-urlencoded; charset=utf-8",
                    Authorization: `Bearer ${token}`,
                },
                method: "GET",
            }
        );

        if (res.status === 200) {
            return (await res.json()) as Claims;
        }
    } catch (e) {
        console.error(e);
    }
    return null;
}


export async function findUser(accessToken: string): Promise<User | null> {    
    const claims = await retrieveUserClaims(accessToken);
    return (claims) ? { claims } : null;
}