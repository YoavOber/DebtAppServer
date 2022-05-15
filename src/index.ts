import e from "express";
import { authRouter } from "./routers/auth.router";
import { debtRouter } from "./routers/debts.router";
import { init as mongoInit } from "./services/mongoose.service";

const initApp = (app: e.Express) => {
  require("dotenv").config();
  mongoInit();
  app.use(e.json());
  app.use("/auth", authRouter);
  app.use("/debt", debtRouter);
};

const app: e.Express = e();
initApp(app);

app.listen(3000, () => {
  return console.log(`Express is listening at http://localhost:${3000}`);
});
