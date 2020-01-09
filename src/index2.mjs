import { Consono } from "consono/es";
import { omit, required } from "./vicis.mjs";

const consono = Consono.factory(null, "light");

const data = {
  id: "1234",
  ok: undefined,
  hidden: "",
  domain: "main",
  date: "2017-10-15",
};
let res = null;
res = omit(data, ["ok"]);
res = required(data, ["id"]);

consono(res);
