import { PrismaClient } from "@prisma/client";
import jwt from "jsonwebtoken";
import { NextFunction, Request, Response } from "express";

const prisma = new PrismaClient()

export async function checkToken (req: Request, res: Response, next: NextFunction) {
    const fullToken = req.headers.authorization;
    if (!fullToken) {
        res.status(401).send("No token provided");
    }
    else {

        const [typeToken, token] = fullToken.split(" ");
        if(typeToken !== "Bearer"){
            res.status(401).send("Invalid token type");
        }
        else {
            const token = (req.headers.authorization || '').split(' ')[1] || ''
            try {
                console.log('token', token)
                const mdp = jwt.verify(token, process.env.JWT_SECRET!)
                console.log('decoded', mdp);
            }
            catch(e){
                console.log('invalid token on verify', e)
                res.status(401).send("Invalid token on verify");
            }
        }
    }
    //console.log("authorization",req.headers.authorization)
    //const b64auth = (req.headers.authorization || '').split(' ')[1] || ''
//
    //const user :any  = await prisma.user.findUnique({
    //    where: { 
    //        name
    //    }
    //  });
    //  if (user && await bcrypt.compare(mdp, user.mdp)) {
    //    console.log('Connexion réussie');
    //  } else {
    //  next()
    //}
}