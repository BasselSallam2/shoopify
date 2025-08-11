import type { Express } from "express";
import cors from "cors";
import helmet from "helmet";
import express from "express";

import appRoutes from "@utils/routes.js";
import logger  from "@utils/logger.js";

 function Appuse(app: Express) {

  app.use(cors());
  app.use(helmet());
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  app.use(logger);

  app.use("/api", appRoutes);

  app.get('/error', (req, res) => {
  res.status(500).send('Server error!');
});

}


export default Appuse ;

