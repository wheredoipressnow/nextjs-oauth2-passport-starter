import passport from 'passport'
import nextConnect from 'next-connect'
import { NextApiRequest, NextApiResponse } from 'next'
import OAuth2Strategy, { VerifyCallback } from "passport-oauth2";
import { setUserSession } from '@/lib/session';


const authenticate = (method: any, req: NextApiRequest, res: NextApiResponse) =>
  new Promise((resolve, reject) => {
    passport.authenticate(method, { session: false }, (error, token) => {
      if (error) {
        reject(error);
      } else {
        resolve(token);
      }
    })(req, res)
  })

passport.use(new OAuth2Strategy({
  authorizationURL: process.env.OAUTH_AUTHORIZE_ENDPOINT as string,
  tokenURL: process.env.OAUTH_TOKEN_ENDPOINT as string,
  clientID: process.env.CLIENT_ID as string,
  clientSecret: process.env.CLIENT_SECRET as string,
  callbackURL: process.env.CLIENT_REDIRECT_URI as string,
  scope: process.env.CLIENT_SCOPE
},
  function (accessToken: string, refreshToken: string, profile: any, verified: VerifyCallback) {
    // Do token introspection here.
    return verified(null, accessToken);
  }
));


export default nextConnect()
  .use(passport.initialize())
  .get(async (req: NextApiRequest, res: NextApiResponse) => {
    try {
      const jwt = await authenticate('oauth2', req, res);
      await setUserSession(res, jwt);
      res.writeHead(302, { Location: '/' });
      res.end();
    } catch (error) {
      console.error(error);
      res.status(401).send(error.message);
    }
  })