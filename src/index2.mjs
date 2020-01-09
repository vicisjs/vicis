import { Consono } from "consono/es";
import { omit } from "./vicis.mjs";

const consono = Consono.factory(null, "light");

const res = omit({ ok: 1, not: 2 }, ["ok"]);

consono(res);
