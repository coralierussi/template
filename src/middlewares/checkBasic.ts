import { NextFunction, Request, Response } from "express";
import { User } from "..";

export const checkBasic = async (req: Request, res: Response, next: NextFunction) => {
    if (!req.headers.authorization) {
        res.status(401).json({message:"Unauthorization"});
        return;
    }
    console.log("authorization",req.headers.authorization)
    const b64auth = (req.headers.authorization || '').split(' ')[1] || ''
    const [pseudo, mdp] = Buffer.from(b64auth, 'base64').toString().split(':')
    console.log(pseudo, mdp)

    const user = await User.findOne({
        where:{
            pseudo,
            mdp
        }
    })
    if (!user) {
        res.status(403).json({message:'Forbidden'})
    }
    else {
        next()
    }
}