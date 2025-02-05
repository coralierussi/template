import { Router } from "express";
import { User } from "..";

export const usersRouter = Router();

usersRouter.post('/', async (req, res) => {
  const users = await User.create({
    pseudo: req.body.data.pseudo,
    email: req.body.data.email,
    mdp : req.body.data.mdp
  });
  res.status(201).json(User);
})

usersRouter.get("/:id", async (req, res) => {
  const myUsers = await User.findByPk(parseInt(req.params.id));
  if(!myUsers) {
    res.status(404).json({ message: "User not found" });
    return;
  }
  else {
    res.json(myUsers)
  }
})

usersRouter.put("/:id", async (req, res) => {
  const myUsers: any = await User.findByPk(parseInt(req.params.id));
  if(!myUsers) {
    res.status(404).json({ message: "User not found" });
    return;
  }
  else {
    myUsers.title = req.body.data.pseudo;
    myUsers.email = req.body.data.email;
    myUsers.mdp = req.body.data.mdp;
    await myUsers.save();
    res.json(myUsers);
  }
})

usersRouter.get("/", async (req, res) => {
    let users = await User.findAll();
    const pagination = req.query.pagination as { limit?: string, start?: string};
    if (pagination && pagination.limit) {
      let start = 0;
      let end = parseInt (pagination.limit)
    }

    res.json(users)
})


usersRouter.delete("/:id", async (req, res) => {
  const myUsers: any = await User.findByPk(parseInt(req.params.id));
   if(!myUsers) {
    res.status(404).json({ message: "User not found" });
    return;
  }
  else {
    await myUsers.destroy();
    res.json({ message: "User deleted" });
  }
})