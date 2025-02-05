import cors from "cors";
import "dotenv/config";
import express from "express";
import { Sequelize } from "sequelize";

import { MovieModel } from "./model/Movie";
import { movieRouter } from "./router/movies";

import { ActorModel } from "./model/Actor";
import { actorsRouter } from "./router/actors";

import { UserModel } from "./model/User";
import { usersRouter } from "./router/users";
import { checkBasic } from "./middlewares/checkBasic";

export const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: 'db/database.sqlite'
});

export const Movie = MovieModel(sequelize);
export const Actor = ActorModel(sequelize);
export const User = UserModel(sequelize);


// sequelize.sync({ force: true });
sequelize.sync();

const app = express();

app.use(cors());
app.use(express.json());

const apiRouter = express.Router();
apiRouter.use("/movies", movieRouter)
apiRouter.use("/actors", actorsRouter)
apiRouter.use("/users", usersRouter)

apiRouter.post('/auth/register', (req, res) => {
  res.json({status: "ok"})
})

app.use("/api", checkBasic, apiRouter);


app.listen(process.env.PORT, () => {
  console.log(`Example app listening on port ${process.env.PORT}!`)
});
