const {
  Vicis,
  cast,
  defaults,
  defined,
  exclude,
  nullish,
  omit,
  order,
  pick,
  rename,
  replace,
  required,
  transform,
} = require("../dist/index.cjs");

describe("calling and printing", () => {
  it("should not crash on call", () => {
    const vicis = new Vicis({});
    expect(vicis.getConfig().sort).toBe("asc");
  });
  it("cast()", () => {
    expect(cast({ registered: null }, { registered: "boolean" }).registered).toEqual(false);
    expect(cast({ check: null }, { check: Vicis.FLAG }).check).toEqual(false);
    expect(cast({ id: "12345" }, { id: Vicis.INTEGER }).id).toEqual(12345);
    expect(cast({ active: true }, { active: Vicis.STRING }).active).toEqual("true");
  });
  it("defaults()", () => {
    expect(defaults({ login: "guest", active: undefined }, { active: true })).toEqual({
      login: "guest",
      active: true,
    });
  });
  it("defined()", () => {
    expect(defined({ id: 12345 }, ["id"])).toEqual({ id: 12345 });
  });
  it("exclude()", () => {
    expect(
      exclude(
        {
          login: "guest",
          Password: "secret",
          active: true,
          __v: 5,
        },
        [/(?:password)/gi, /^(?:_)(?:_)?/, "active"],
      ),
    ).toEqual({
      login: "guest",
    });
  });
  it("nullish()", () => {
    expect(nullish({ login: "guest", active: null, done: undefined }, { active: true, done: "yes" })).toEqual({
      login: "guest",
      active: true,
      done: "yes",
    });
  });
  it("omit()", () => {
    expect(omit({ login: "guest", password: "secret" }, ["password"])).toEqual({ login: "guest" });
  });
  it("order()", () => {
    expect(Object.keys(order({ active: true, id: 1, login: "guest" }, ["id", "login"]))).toEqual([
      "id",
      "login",
      "active",
    ]);
  });
  it("pick()", () => {
    expect(pick({ id: 12345, login: "guest", active: true }, ["id", "login"])).toEqual({ id: 12345, login: "guest" });
  });
  it("rename()", () => {
    expect(rename({ _id: 12345 }, { _id: "ID" })).toEqual({ ID: 12345 });
  });
  it("replace()", () => {
    expect(replace({ domain: "primary" }, { domain: "secondary" })).toEqual({ domain: "secondary" });
  });
  it("required()", () => {
    expect(required({ id: 12345, username: "Vicis" }, ["id", "username"])).toEqual({ id: 12345, username: "Vicis" });
  });
  it("transform()", () => {
    expect(transform({ date: "12345" }, { date: (value) => +value })).toEqual({ date: 12345 });
  });
});
