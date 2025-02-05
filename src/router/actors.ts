import { Router } from "express";
import { Actor } from "..";

export const actorsRouter = Router();

actorsRouter.post('/', async (req, res) => {
  const actors = await Actor.create({
    name: req.body.data.name,
    prenom: req.body.data.prenom,
  });
  res.status(201).json(Actor);
})

actorsRouter.get("/:id", async (req, res) => {
  const myActors = await Actor.findByPk(parseInt(req.params.id));
 // if ("http://localhost:1337/api/actors?filters[name][$eq]=Willis") {
  //  req.query
  //} else {
    if(!myActors) {
        res.status(404).json({ message: "Actor not found" });
        return;
      }
      else {
        res.json(myActors)
      }
  }
  
//}
),

actorsRouter.put("/:id", async (req, res) => {
  const myActors: any = await Actor.findByPk(parseInt(req.params.id));
  if(!myActors) {
    res.status(404).json({ message: "Actor not found" });
    return;
  }
  else {
    myActors.name = req.body.data.name;
    myActors.prenom = req.body.data.prenom;
    await myActors.save();
    res.json(myActors);
  }
})

actorsRouter.get("/", async (req, res) => {
  const Actors = await Actor.findAll();
  res.json(Actors);
})

actorsRouter.delete("/:id", async (req, res) => {
  const myActors: any = await Actor.findByPk(parseInt(req.params.id));
   if(!myActors) {
    res.status(404).json({ message: "Actor not found" });
    return;
  }
  else {
    await myActors.destroy();
    res.json({ message: "Actor deleted" });
  }
})