import e from "express";
import { authRouter } from "./routers/auth.router";
import { debtsRouter } from "./routers/debts.router";
import { init } from "./services/mongoose.service";

const app: e.Express = e();
require("dotenv").config();
init();
app.use(e.json());
app.use(authRouter);
app.use(debtsRouter);
app.listen(3000, () => {
  return console.log(`Express is listening at http://localhost:${3000}`);
});
