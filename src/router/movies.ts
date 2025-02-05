import { Router } from "express";
import { Movie } from "..";

export const movieRouter = Router();

movieRouter.post('/', async (req, res) => {
  const movie = await Movie.create({
    title: req.body.data.title,
    description: req.body.data.description,
    releaseDate : req.body.data.releaseDate
  });
  res.status(201).json(Movie);
})

movieRouter.get("/:id", async (req, res) => {
  const myMovies = await Movie.findByPk(parseInt(req.params.id));
  if(!myMovies) {
    res.status(404).json({ message: "Movie not found" });
    return;
  }
  else {
    res.json(myMovies)
  }
})

movieRouter.put("/:id", async (req, res) => {
  const myMovies: any = await Movie.findByPk(parseInt(req.params.id));
  if(!myMovies) {
    res.status(404).json({ message: "Movie not found" });
    return;
  }
  else {
    myMovies.title = req.body.data.title;
    myMovies.description = req.body.data.description;
    await myMovies.save();
    res.json(myMovies);
  }
})

movieRouter.get("/", async (req, res) => {
  const Movies = await Movie.findAll();
  res.json(Movies);
})

movieRouter.delete("/:id", async (req, res) => {
  const myMovies: any = await Movie.findByPk(parseInt(req.params.id));
   if(!myMovies) {
    res.status(404).json({ message: "Movie not found" });
    return;
  }
  else {
    await myMovies.destroy();
    res.json({ message: "Movie deleted" });
  }
})