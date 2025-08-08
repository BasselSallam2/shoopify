import type { Express } from "express";
import cors from "cors";
import helmet from "helmet";
import express from "express";

import userRouter from "../modules/user.route.js";
import logger  from "./logger.js";

 function Appuse(app: Express) {

  app.use(cors());
  app.use(helmet());
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  app.use(logger);

  app.use("/api/user", userRouter);

  app.get('/error', (req, res) => {
  res.status(500).send('Server error!');
});

}


export default Appuse ;

