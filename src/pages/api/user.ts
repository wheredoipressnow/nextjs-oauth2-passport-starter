import { getUserSession } from "@/lib/session";
import { findUser, User } from "@/lib/user";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {

    try {
        const session = await getUserSession(req);        
        const user = (session && (await findUser(session.jwt))) ?? null;
        res.status(200).json({ user });
    } catch (e) {
        console.error(e);
        res.status(500).end('Authentication invalid. Please login in.');
    }
}
