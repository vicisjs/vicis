const { Consono } = require("consono");
const Vicis = require("./vicis.js").default;
const consono = Consono.factory(null, "light");
const data = {
  id: "1234",
  ok: undefined,
  hidden: "",
  domain: "main",
  date: "2017-10-15",
};
const config = {};
try {
  const response = Vicis.factory()
    .config(config)
    .cast({ id: "integer" })
    .default({ ok: true })
    .defined(["id"])
    .omit(["hidden"])
    .pick(["id", "ok"])
    .rename({ id: "ID" })
    .replace({ domain: "secondary" })
    .required(["id"])
    .transform({
      date: (value) => new Date(value),
    })
    .data(data)
    .data(data);
  consono(response.toJSON());
} catch (error) {
  console.log(error.message);
}
