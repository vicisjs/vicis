const { Vicis, cast, defaults } = require("../dist/vicis.cjs");

describe("calling and printing", () => {
  it("should not crash on call", () => {
    const log = jest.spyOn(console, "log").mockImplementation((any) => any);
    const vicis = new Vicis({});
    expect(vicis.getConfig().sort).toBe(false);
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
});
