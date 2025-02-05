//import { PrismaClient } from "@prisma/client";
//import { NextFunction, Request, Response } from "express";
//
//const prisma = new PrismaClient()
//
//export const checkBasic = async (req: Request, res: Response, next: NextFunction) => {
//    if (!req.headers.authorization) {
//        res.status(401).json({message:"Unauthorization"});
//        return;
//    }
//    console.log("authorization",req.headers.authorization)
//    const b64auth = (req.headers.authorization || '').split(' ')[1] || ''
//    const [pseudo, mdp] = Buffer.from(b64auth, 'base64').toString().split(':')
//    console.log(pseudo, mdp)
//
    //const user = await prisma.user.findUnique({
    //    where:{
    //        name ,
    //        mdp,
    //    }
    //})
    //if (!user) {
    //    res.status(403).json({message:'Forbidden'})
    //}
    //else {
    //    next()
    //}
//}