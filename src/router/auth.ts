import { Router } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { PrismaClient } from "@prisma/client";

export const authRouter = Router();
const prisma = new PrismaClient();

authRouter.post("/local/register", async (req, res) => {

    const { name, mdp, email } = req.body;
    const userWithEmail = await prisma.user.findUnique({ where: { email, name, mdp } });
    if (userWithEmail) {
        res.status(400).json("Email already exists");
    }
    else {
        const hashMdp = await bcrypt.hash(mdp, parseInt(process.env.SALT_ROUNDS!));
        const newUser = await prisma.user.create({ 
            data: {
                email: name + "@gmail.com",
                name: name,
                mdp : hashMdp
            }
        });
        res.json(newUser);
    }
});
authRouter.post("/local", async (req, res) => {
    const { name, mdp } = req.body;
    const userWithEmail = await prisma.user.findUnique({ where: { email: name } });
    if (!userWithEmail) {
        res.status(400).json("Email or mdp is incorrect");
    }
    else {
        const isMdpCorrect = await bcrypt.compare(mdp, userWithEmail.mdp);
        if (isMdpCorrect) {
            const token = jwt.sign(userWithEmail, process.env.JWT_SECRET!);
            res.json({
                token,
                ...userWithEmail
            });
        }
        else {
            res.status(400).json("Email or mdp is incorrect");
        }
    }
})