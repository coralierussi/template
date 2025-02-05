import cors from "cors";
import "dotenv/config";
import express from "express";

import { usersRouter } from "./router/users";
import { checkBasic } from "./middlewares/checkBasic";

const app = express();

app.use(cors());
app.use(express.json());

const apiRouter = express.Router();
apiRouter.use("/users", usersRouter)

apiRouter.post('/auth/register', (req, res) => {
  res.json({status: "ok"})
})

app.use("/api", checkBasic, apiRouter);


app.listen(process.env.PORT, () => {
  console.log(`Example app listening on port ${process.env.PORT}!`)
});
